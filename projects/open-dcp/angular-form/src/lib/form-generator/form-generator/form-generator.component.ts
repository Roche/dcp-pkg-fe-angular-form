import {CommonModule, NgClass} from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {AbstractControl, ReactiveFormsModule, UntypedFormArray, UntypedFormGroup} from "@angular/forms";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";
import * as _ from 'underscore';
import {ODCPFormGeneratorService} from "../dc-form-generator.service";
import {FieldTypeEnum, FormGeneratorElModel} from "../form-generator.model";
import {RemoveHost} from "@open-dcp/angular-services";
import {FormGeneratorFieldComponentConfig} from "../form-generator.tokens";

export * from "../form-generator.model";

/**
 * Renders a dynamic form based on `FormGeneratorElModel[]` configuration.
 *
 * The component internally keeps a mirrored form (`formCopy`) to render controls,
 * then synchronizes value and validators back to `form`.
 *
 * Disabled state is kept on the internal render form so the external consumer form
 * can continue exposing all generated fields through `form.value`.
 *
 * Notes:
 * - `formGeneratorSettings` is mutated to inject description pseudo-fields.
 * - `onFormValueChange` emits raw values from the internal copy form.
 * - `emitInitialForm` controls whether `form.patchValue` emits Angular form events.
 *
 * @example
 * Basic usage with generated internal form:
 * ```html
 * <odcp-form-generator
 *   [formGeneratorSettings]="settings"
 *   [defaultValues]="{ platform: 'biologics' }"
 *   (onFormValueChange)="onGeneratorChange($event)">
 * </odcp-form-generator>
 * ```
 *
 * @example
 * Usage with an external form group and silent synchronization:
 * ```typescript
 * form = new UntypedFormGroup({});
 * ```
 * ```html
 * <odcp-form-generator
 *   [form]="form"
 *   [formGeneratorSettings]="settings"
 *   [emitInitialForm]="false"
 *   [allowMultiSelect]="true">
 * </odcp-form-generator>
 * ```
 *
 * @example
 * Override or extend field rendering from app code:
 * ```typescript
 * enum AppFieldTypeEnum {
 *   RichText = 100
 * }
 *
 * const fieldComponentOverrides = [
 *   { type: AppFieldTypeEnum.RichText, component: AppRichTextFieldComponent },
 *   { type: FieldTypeEnum.String, component: AppStringFieldComponent }
 * ];
 * ```
 * ```html
 * <odcp-form-generator
 *   [form]="form"
 *   [formGeneratorSettings]="settings"
 *   [fieldComponentOverrides]="fieldComponentOverrides">
 * </odcp-form-generator>
 * ```
 *
 * Component will show only form elements and not the HOST tag.
 */
@Component({
  selector: 'odcp-form-generator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgClass,
    TranslateModule
  ],
  providers: [TranslateService],
  templateUrl: './form-generator.component.html',
  styleUrls: []
})
export class FormGeneratorComponent extends RemoveHost implements OnChanges, AfterViewInit, OnDestroy {

  /**
   * Target form that receives generated controls and synchronized values.
   *
   * Pass an external `UntypedFormGroup` to integrate the generator into a parent form.
   */
  @Input() form: UntypedFormGroup | AbstractControl = new UntypedFormGroup({});

  /**
   * Dynamic form definition used to create controls and render components.
   */
  @Input() formGeneratorSettings: FormGeneratorElModel[] = [];

  /**
   * CSS class applied to each rendered field wrapper container.
   */
  @Input() elementsClass = '';

  /**
   * Initial values keyed by field `Name`.
   *
   * Values from this object override `FieldSettings.DefaultValue` when provided.
   */
  @Input() defaultValues: any = {};

  /**
   * Disables all generated controls while preserving the previous enabled-state value snapshot.
   */
  @Input() disabled: boolean = false;

  /**
   * Enables multi-select behavior for supported dropdown field types.
   */
  @Input() allowMultiSelect: boolean = false;

  /**
   * Optional per-instance field component overrides.
   *
   * These mappings take precedence over library defaults and app-level provider registrations.
   */
  @Input() fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = [];

  /**
   * Controls the `emitEvent` flag used when patching synchronized values into `form`.
   *
   * - `true` (default): parent `form.valueChanges` can fire during synchronization.
   * - `false`: synchronization still happens, but `form.patchValue` is silent.
   *
   * Example: set `[emitInitialForm]="false"` when the parent reacts to `form.valueChanges`
   * and should ignore initialization/sync emissions.
   */
  @Input() emitInitialForm: boolean = true;

  formCopy: UntypedFormGroup = new UntypedFormGroup({});

  formSubscription: Subscription = new Subscription();

  disableValue: any;

  lastEmitedValue: any;

  readonly formGeneratorService = inject(ODCPFormGeneratorService);

  constructor(
    private readonly translate: TranslateService,
    _elRef: ElementRef,
    _renderer: Renderer2
  ) {
    super(_elRef, _renderer);
    this.translate.setTranslation('en', {
      "FORM_GENERATOR": {
        "VALIDATIONS": {
          "required": "This field can't be empty",
          "max": "Max value can be {{max.max}}",
          "min": "Min value can be {{min.min}}",
          "maxlength": "Max length can be {{maxlength.requiredLength}}",
          "minlength": "Min length can be {{minlength.requiredLength}}",
          "remainder": "Value needs to be a multiple of {{remainder}}",
          "minPrecision": "Value precision should be minimum {{minPrecision}}",
          "maxPrecision": "Value precision should be maximum {{maxPrecision}}",
          "whitespace": "Can't use spaces at the beginning or at the end of the field value.",
          "siblingMax": "Max value can be {{siblingMax.max}}",
          "siblingMin": "Min value can be {{siblingMax.min}}",
        },
        "META_INFORMATION": "Meta Information",
        "SELECT_ALL": "Select ALL",
        "NO_DATA_AVAILABLE": "No data available"
      }
    }, true);

    this.translate.setTranslation('de', {
      "FORM_GENERATOR": {
        "VALIDATIONS": {
          "required": "Dieses Feld darf nicht leer sein",
          "max": "Maximalwert: {{max.max}}",
          "min": "Minimalwert: {{min.min}}",
          "maxlength": "Max length can be {{maxlength.requiredLength}}",
          "minlength": "Min length can be {{minlength.requiredLength}}",
          "remainder": "Value needs to be a multiple of {{remainder}}",
          "minPrecision": "Value precision should be minimum {{minPrecision}}",
          "maxPrecision": "Value precision should be maximum {{maxPrecision}}",
          "whitespace": "Die Eingabe darf keine Leerzeichen am Anfang oder Ende haben.",
          "siblingMax": "Max value can be {{siblingMax.max}}",
          "siblingMin": "Min value can be {{siblingMax.min}}",
        },
        "META_INFORMATION": "Metainformationen",
        "SELECT_ALL": "Select ALL",
        "NO_DATA_AVAILABLE": "Keine Daten vorhanden"
      }
    }, true);
  }
  /**
   * Emits each synchronized raw value payload from the generator copy form.
   */
  @Output() onFormValueChange: EventEmitter<any> = new EventEmitter();

  showForm = false;
  fieldTypeEnum = FieldTypeEnum;

  override ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['disabled']?.currentValue || changes['disabled']?.previousValue) {
      if (changes['disabled'].currentValue) {
        this.disableValue = this.formCopy.getRawValue();
        this.disableForm();
      } else {
        this.formCopy.enable();
        if (this.disableValue) {
          const newValue = this.formCopy.getRawValue();
          const updatedValue = {
            ...this.disableValue,
            ...newValue
          };
          this.formCopy.patchValue(updatedValue, {emitEvent: false});
          this.disableValue = undefined;
        }
      }
    }

    if (this.defaultValueChangeCheck(changes)) {
      return;
    }

    if (changes['form'] || changes['formGeneratorSettings'] || changes['defaultValues']) {
      this.disableValue = undefined;
      this.generateForm();
    }
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  private generateForm() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
      this.lastEmitedValue = undefined;
    }
    if (this.formGeneratorSettings && this.formGeneratorSettings.length > 0) {
      this.formCopy.enable();
      this.removeOldControls();
      this.addNewControls();
      if (this.disabled) {
        this.disableForm();
      }
      this.createDescriptions();
      this.showForm = true;
    } else {
      this.removeOldControls();
      this.showForm = false;
      return;
    }

    const mainForm = this.form as UntypedFormGroup;
    this.formSubscription = new Subscription();

    const updateForm = (orginated: string) => {
      if (this.disabled) {
        return;
      }
      const statusChanged = orginated === 'statusChanges' && this.form.status !== this.formCopy.status
      this.syncValidators(this.formCopy, mainForm);
      const copyValue = this.formCopy.getRawValue();
      if (!statusChanged && this.lastEmitedValue && _.isEqual(this.lastEmitedValue, copyValue)) {
        this.form.patchValue(copyValue, {emitEvent: false});
        return;
      }
      this.syncControlsDeep(this.formCopy, mainForm);


      this.form.patchValue(copyValue, {emitEvent: this.emitInitialForm});
      this.onFormValueChange.emit(copyValue);
      this.lastEmitedValue = JSON.parse(JSON.stringify(copyValue));
    }

    this.formSubscription.add(
      this.formCopy.statusChanges.subscribe(() => {
        updateForm('statusChanges');
      })
    )

    this.formSubscription.add(
      this.formCopy.valueChanges.subscribe(() => {
        updateForm('valueChanges');
      })
    );

    this.formSubscription.add(
      this.form.valueChanges.subscribe(() => {
        const copyValue = this.formCopy.getRawValue();
        const formValue = this.form.getRawValue();
        if (_.isEqual(formValue, copyValue)) {
          return;
        }
        this.formCopy.enable({emitEvent: false});
        this.lastEmitedValue = formValue;
        this.formCopy.patchValue(formValue, {emitEvent: true});
        if (this.disabled) {
          this.disableForm();
        }
      })
    );
  }

  private disableForm() {
    this.formCopy.disable({emitEvent: false});
  }

  private removeOldControls() {
    Object.keys((this.form as UntypedFormGroup).controls).forEach(key => {
      if (this.form.get(key)?.pending) {
        return;
      }
      (this.form as UntypedFormGroup).removeControl(key);
    });
    Object.keys((this.formCopy as UntypedFormGroup).controls).forEach(key => {
      if (this.formCopy.get(key)?.pending) {
        return;
      }
      (this.formCopy as UntypedFormGroup).removeControl(key);
    });
  }

  private addNewControls() {
    this.formGeneratorSettings.forEach(
      el => {
        el.allowMultiSelect = this.allowMultiSelect;
        this.formGeneratorService.addGroupEl(el, this.form as UntypedFormGroup, this.defaultValues);
        this.formGeneratorService.addGroupEl(el, this.formCopy as UntypedFormGroup, this.defaultValues);
      }
    );
  }

  /**
   * Return true if OnChange changes have only defaultValues, this is not the first change and values are same
   * @param changes
   * @private
   */
  private defaultValueChangeCheck(changes: SimpleChanges) {
    return Object.keys(changes).length === 1
      && Object.keys(changes)[0] === 'defaultValues'
      && !changes['defaultValues'].firstChange
      && _.isEqual(changes['defaultValues'].previousValue, changes['defaultValues'].currentValue)
  }

  private createDescriptionForField(elements: FormGeneratorElModel[]) {
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      if (el.Description && el.FieldType !== FieldTypeEnum.Description && (i === 0 || elements[i - 1].Name !== el.Name)) {
        elements.splice(i, 0, {...el, FieldType: FieldTypeEnum.Description});
        i++;
      }
      if (el.Children && el.Children.length > 0) {
        this.createDescriptionForField(el.Children);
      }
    }
  }

  private createDescriptions() {
    if (this.formGeneratorSettings.length > 0) {
      // Check if description is present in child components and create control for description in child
      this.createDescriptionForField(this.formGeneratorSettings);
    }
  }

  /**
   * Check if control is present in form and formcopy,
   * if control is not present then create the control to avoid infinite looping due to emit
   */
  private syncControlsDeep(source: UntypedFormGroup, target: UntypedFormGroup) {
    Object.keys(source.controls).forEach(key => {
      const sourceCtrl = source.get(key);
      const targetCtrl = target.get(key);

      // If control is not present in target then add it
      if (!targetCtrl) {
        target.addControl(key, this.formGeneratorService.cloneControl(sourceCtrl!), {emitEvent: false});
        return;
      }

      // Check if the type of control is group then check for all controls inside the group
      if (sourceCtrl instanceof UntypedFormGroup && targetCtrl instanceof UntypedFormGroup) {
        this.syncControlsDeep(sourceCtrl, targetCtrl);
      }

      // Check if type of control is array then iterate through thechild control and sync for the child controls
      if (sourceCtrl instanceof UntypedFormArray && targetCtrl instanceof UntypedFormArray) {
        targetCtrl.clear({emitEvent: false});
        while (targetCtrl.length < sourceCtrl.length) {
          const newChild = this.formGeneratorService.cloneControl(sourceCtrl.at(targetCtrl.length));
          targetCtrl.push(newChild, {emitEvent: false});
        }
        sourceCtrl.controls.forEach((srcChild, i) => {
          const tgtChild = targetCtrl.at(i);
          if (srcChild instanceof UntypedFormGroup && tgtChild instanceof UntypedFormGroup) {
            this.syncControlsDeep(srcChild, tgtChild);
          }
        });
      }
    });
  }

  private syncValidators(source: UntypedFormGroup, target: UntypedFormGroup) {
    Object.keys(source.controls).forEach(key => {
      const sourceCtrl = source.get(key);
      const targetCtrl = target.get(key);
      if (!targetCtrl || !sourceCtrl) {
        return;
      }
      if (sourceCtrl instanceof UntypedFormGroup && targetCtrl instanceof UntypedFormGroup) {
        this.syncValidators(sourceCtrl, targetCtrl);
        return;
      }
      if (sourceCtrl instanceof UntypedFormArray && targetCtrl instanceof UntypedFormArray) {
        sourceCtrl.controls.forEach((srcChild, i) => {
          const tgtChild = targetCtrl.at(i);
          if (srcChild instanceof UntypedFormGroup && tgtChild instanceof UntypedFormGroup) {
            this.syncValidators(srcChild, tgtChild);
          }
        })
      }
      targetCtrl.validator = sourceCtrl.validator;
    });
    target.validator = source.validator;
  }
}
