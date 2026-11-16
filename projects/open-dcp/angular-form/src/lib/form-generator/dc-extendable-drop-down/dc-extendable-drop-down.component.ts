import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  FieldOptionModel,
  FormGeneratorElModel,
  FormGeneratorValidationEnum,
  GroupResult
} from "../form-generator.model";
import {AbstractControl, ReactiveFormsModule, UntypedFormControl, ValidatorFn} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {DataLoaderClass} from "../helpers/DataLoader.class";
import {DataLoadingWatcherService} from "../helpers/DataLoadingWatcher.service";
import {TranslateModule} from "@ngx-translate/core";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatAutocomplete, MatAutocompleteTrigger, MatOptgroup} from "@angular/material/autocomplete";
import {MatOption} from "@angular/material/core";
import {DcFormGeneratorErrorComponent} from "../dc-form-generator-error/dc-form-generator-error.component";
import {DcHttp} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-fg-extendable-drop-down',
  standalone: true,
  templateUrl: './dc-extendable-drop-down.component.html',
  imports: [
    TranslateModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatAutocomplete,
    MatOption,
    MatError,
    DcFormGeneratorErrorComponent,
    MatAutocompleteTrigger,
    ReactiveFormsModule,
    MatOptgroup
  ],
  styleUrls: []
})
export class DcExtendableDropDownComponent extends DataLoaderClass implements OnInit, OnDestroy {

  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({ required: true }) override control!: UntypedFormControl | AbstractControl;

  @Input() override parentIsVisible: boolean = true;

  comboBoxControl!: UntypedFormControl;

  constructor(
    _http: DcHttp,
    _dataLoadingWatcher: DataLoadingWatcherService
  ) {
    super(_http, _dataLoadingWatcher);
    // The autocomplete input works with free text, so object option values are still
    // serialized to JSON strings and parsed back before being written to the form control.
    this.stringifyOptionValues = true;
  }


  get isRequired(): boolean {
    return (this.formEl.FieldValidations || []).some(el => el.Type === FormGeneratorValidationEnum.Required);
  }
  override ngOnInit() {
    super.ngOnInit();

    this.comboBoxControl = new UntypedFormControl(
      null,
      [...(this.control as UntypedFormControl & {_rawValidators: ValidatorFn[]})?._rawValidators]
    );

    this.populateValue();

    this.comboBoxControl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        const parsedValue = this.formGeneratorService.parseDropdownValue(value);
        this.control.patchValue(parsedValue);
      });

    this.control.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        const formattedValue = this.formGeneratorService.convertObjectDropdownValue(value);
        if (formattedValue !== this.comboBoxControl.value) {
          this.comboBoxControl.patchValue(formattedValue);
        }
      });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override handleFilter(string: string) {
    super.handleFilter(string);
  }

  deselect($event: MouseEvent) {
    $event.stopPropagation();
    this.comboBoxControl.patchValue(null);
  }

  private populateValue() {
    if (this.control.value) {
      const formattedValue = this.formGeneratorService.convertObjectDropdownValue(this.control.value);
      if (
        (this.formEl?.FieldOptions || []).every(el =>
          this.formGeneratorService.convertObjectDropdownValue(el.Value) !== formattedValue
        )
      ) {
        this.control.patchValue(null);
        this.comboBoxControl.patchValue(null);
        return;
      }

      this.comboBoxControl.patchValue(formattedValue);
      return;
    }

    if (this.isRequired && (this.formEl?.FieldOptions || [])[0]) {
      setTimeout(() => {
        this.comboBoxControl.patchValue(
          this.formGeneratorService.convertObjectDropdownValue((this.formEl.FieldOptions || [])[0].Value)
        );
      }, 50);
    }
  }

  groupOption(group: GroupResult | FieldOptionModel) {
    return group as GroupResult;
  }

  fieldOption(fieldOption: GroupResult | FieldOptionModel) {
    return fieldOption as FieldOptionModel;
  }
}
