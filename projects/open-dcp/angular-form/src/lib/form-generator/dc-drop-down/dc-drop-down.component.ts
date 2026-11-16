import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {
  FieldOptionModel,
  FormGeneratorElModel,
  FormGeneratorValidationEnum,
  GroupResult
} from "../form-generator.model";
import {AbstractControl, ReactiveFormsModule, UntypedFormControl, ValidatorFn} from "@angular/forms";
import {debounceTime, takeUntil, distinctUntilChanged} from "rxjs/operators";
import {DataLoaderClass} from "../helpers/DataLoader.class";
import {DcFormGeneratorErrorComponent} from "../dc-form-generator-error/dc-form-generator-error.component";
import {MatIcon} from "@angular/material/icon";
import {MatOptgroup, MatOption} from "@angular/material/autocomplete";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {TranslateModule} from "@ngx-translate/core";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {CommonModule, NgIf} from "@angular/common";
import {DataLoadingWatcherService} from "../helpers/DataLoadingWatcher.service";
import {DcHttp} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-fg-drop-down',
  standalone: true,
  templateUrl: './dc-drop-down.component.html',
  styleUrls: [],
  imports: [
    CommonModule,
    DcFormGeneratorErrorComponent,
    MatIcon,
    MatOption,
    MatFormField,
    MatSelect,
    TranslateModule,
    ReactiveFormsModule,
    MatInput,
    MatIconButton,
    MatOptgroup,
    MatLabel,
    MatError,
    NgIf
  ],
  encapsulation: ViewEncapsulation.None
})
export class DcDropDownComponent extends DataLoaderClass implements OnInit, OnDestroy, OnChanges {

  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({ required: true }) override control!: UntypedFormControl | AbstractControl;

  @Input() override parentIsVisible: boolean = true;

  filterInput = new UntypedFormControl('');

  dropDownControl: UntypedFormControl = new UntypedFormControl('');

  constructor(
    _http: DcHttp,
    _dataLoadingWatcher: DataLoadingWatcherService
  ) {
    super(_http, _dataLoadingWatcher);
  }

  get isRequired(): boolean {
    return (this.formEl.FieldValidations || []).some(el => el.Type === FormGeneratorValidationEnum.Required);
  }

  get isReadOnly(): boolean {
    return this.formEl.FieldSettings?.IsReadOnly === true;
  }

  override ngOnInit() {
    super.ngOnInit();

    this.dropDownControl = new UntypedFormControl(
      {value: null, disabled: this.shouldDisableDropDown()},
      [...(this.control as UntypedFormControl & {_rawValidators: ValidatorFn[]})._rawValidators ?? []]
    );
    this.syncDisableFields();

    // Listen to filter input changes with debounce for performance
    this.filterInput.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe(searchTerm => {
        this.handleFilter(searchTerm || '');
      });

    this.populateValue();

    this.dropDownControl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        if (!this.compareOptionValues(value, this.control.value)) {
          this.control.patchValue(value);
        }
      });

    this.control.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        if (!this.compareOptionValues(value, this.dropDownControl.value)) {
          this.dropDownControl.patchValue(value);
        }
        const shouldDisable = this.shouldDisableDropDown();
        if (shouldDisable !== this.dropDownControl.disabled) {
          if (shouldDisable) {
            this.dropDownControl.disable({ emitEvent: false });
          } else {
            this.dropDownControl.enable({ emitEvent: false });
          }
        }
      });

    this.control.statusChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        setTimeout(() => {
          this.syncDisableFields();
        });
      });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this.syncDisableFields();
  }

  onOpenedChange(opened: boolean): void {
    if (!opened) {
      this.filterInput.setValue('');
    }
  }

  override handleFilter(string: string) {
    super.handleFilter(string);
  }

  deselect($event: MouseEvent) {
    $event.stopPropagation();
    this.dropDownControl.patchValue(null);
  }

  private populateValue() {
    if (this.control.value) {
      const value = this.control.value;
      if (
        !this.formEl.FieldSettings?.DataUrl && (this.formEl.FieldOptions || []).every(el =>
          !this.compareOptionValues(el.Value, value)
        )
      ) {
        this.control.patchValue(null);
        this.dropDownControl.patchValue(null);
        return;
      }

      this.dropDownControl.patchValue(value);
      return;
    }

    if (this.isRequired && (this.formEl.FieldOptions || []).length === 1) {
      setTimeout(() => {
        this.dropDownControl.patchValue((this.formEl.FieldOptions || [])[0].Value);
      });
    }
  }

  groupOption(group: GroupResult | FieldOptionModel) {
    return group as GroupResult;
  }

  fieldOption(fieldOption: GroupResult | FieldOptionModel) {
    return fieldOption as FieldOptionModel;
  }

  private syncDisableFields() {
    const shouldDisable = this.shouldDisableDropDown();
    if (shouldDisable !== this.dropDownControl.disabled) {
      if (shouldDisable) {
        this.dropDownControl.disable({ emitEvent: false });
      } else {
        this.dropDownControl.enable({ emitEvent: false });
      }
    }
  }

  private shouldDisableDropDown() {
    return this.control.disabled || this.control.root.disabled || this.isReadOnly;
  }
}
