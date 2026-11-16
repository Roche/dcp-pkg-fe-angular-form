import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {FormGeneratorElModel, FormGeneratorValidationEnum} from "../form-generator.model";
import {AbstractControl, ReactiveFormsModule, UntypedFormControl, Validators} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {TranslateModule} from "@ngx-translate/core";
import {MatInput} from "@angular/material/input";
import {DcFormGeneratorErrorComponent} from "../dc-form-generator-error/dc-form-generator-error.component";
import {NgIf} from "@angular/common";
import {NumericInputValidation} from "../../directives/numeric-input-validation.directive";
import {
  NumericStartingDotValidator,
  NumericTrailingDotValidator
} from "../../validators/numeric-trailing-dot.validator";
import {DataLoaderClass} from "../helpers/DataLoader.class";
import {DataLoadingWatcherService} from "../helpers/DataLoadingWatcher.service";
import {DcHttp} from "@open-dcp/angular-services";

interface PrecisionNumber {
  RawValue: string,
  Precision: number
}
@Component({
  selector: 'odcp-fg-precision-number',
  standalone: true,
  templateUrl: './dc-precision-number.component.html',
  imports: [
    MatFormField,
    MatLabel,
    TranslateModule,
    MatInput,
    DcFormGeneratorErrorComponent,
    ReactiveFormsModule,
    NumericInputValidation,
    MatError,
    NgIf
  ],
  encapsulation: ViewEncapsulation.None
})
export class DcPrecisionNumberComponent extends DataLoaderClass implements OnInit, OnDestroy, OnChanges {
  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({ required: true }) override control!: UntypedFormControl | AbstractControl;

  @Input() override parentIsVisible: boolean = true;

  precisionControl: UntypedFormControl = new UntypedFormControl('');

  constructor(
    _http: DcHttp,
    _dataLoadingWatcher: DataLoadingWatcherService
  ) {
    super(_http, _dataLoadingWatcher);
  }

  override ngOnInit() {
    super.ngOnInit();

    const initialValue = this.resolveInitialValue();

    this.precisionControl = new UntypedFormControl(
      initialValue,
      this.getValidators()
    );

    this.precisionControl.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(value => {
      // While user is mid-typing a decimal (e.g. "36."), hold off — don't null the outer value
      if (this.precisionControl.errors?.['trailingDot'] || this.precisionControl.errors?.['startingDot']) {
        return;
      }

      if (this.precisionControl.invalid) {
        this.control.patchValue(null);
        return;
      }

      if (value === '' || value === null) {
        this.control.patchValue(null);
        return;
      }

      const precisionValue: PrecisionNumber = {
        RawValue: this.precisionControl.value,
        Precision: this.getPrecision()
      };
      this.control.patchValue(precisionValue);
    });

    // Seed back from outer control when it changes (e.g. form reset)
    this.control.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(value => {
      const raw = this.extractRawValue(value);
      if (raw !== null && raw !== this.precisionControl.value) {
        this.precisionControl.setValue(raw, { emitEvent: false });
      }
    });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

  get isRequired(): boolean {
    return (this.formEl.FieldValidations || []).some(el => el.Type === FormGeneratorValidationEnum.Required);
  }

  private resolveInitialValue(): string {
    // Prefer the outer control's value (set from DefaultValue by the form generator service)
    const controlValue = this.control.value;
    const raw = this.extractRawValue(controlValue);
    if (raw !== null) {
      return String(raw);
    }
    // Fall back to FieldSettings.DefaultValue
    const defaultValue = this.formEl?.FieldSettings?.DefaultValue;
    return defaultValue !== null && defaultValue !== undefined ? String(defaultValue) : '';
  }

  private extractRawValue(value: any): string | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    // Value is already a PrecisionNumber object
    if (typeof value === 'object' && 'RawValue' in value) {
      return value.RawValue !== null && value.RawValue !== undefined ? String(value.RawValue) : null;
    }
    // Value is a plain number or string
    return String(value);
  }

  private getPrecision() {
    const value = this.precisionControl.value;
    if (!value) {
      return 0;
    }

    const [number, float] = value.split('.');

    if (!float) {
      return 0;
    }

    return float.length;
  }

  private getValidators() {
    const validators = [NumericStartingDotValidator, NumericTrailingDotValidator];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    return validators;
  }
}
