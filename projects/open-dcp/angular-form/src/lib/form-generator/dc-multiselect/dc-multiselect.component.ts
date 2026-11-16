import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {FieldOptionModel, FormGeneratorElModel, GroupResult} from "../form-generator.model";
import {AbstractControl, ReactiveFormsModule, UntypedFormControl} from "@angular/forms";
import {DataLoaderClass} from "../helpers/DataLoader.class";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatChipListbox, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {MatOptgroup, MatOption, MatSelect, MatSelectTrigger} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {DcFormGeneratorErrorComponent} from "../dc-form-generator-error/dc-form-generator-error.component";
import {debounceTime, distinctUntilChanged, takeUntil} from "rxjs/operators";
import {JsonPipe, NgIf} from "@angular/common";
import {DataLoadingWatcherService} from "../helpers/DataLoadingWatcher.service";
import { TranslateModule } from '@ngx-translate/core';
import {DcHttp} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-fg-multiselect',
  standalone: true,
  templateUrl: './dc-multiselect.component.html',
  imports: [
    MatFormField,
    MatChipRow,
    MatIcon,
    MatSelect,
    MatOption,
    MatInput,
    ReactiveFormsModule,
    DcFormGeneratorErrorComponent,
    MatLabel,
    MatOptgroup,
    MatError,
    MatSelectTrigger,
    MatChipListbox,
    MatChipRemove,
    NgIf,
    JsonPipe,
    TranslateModule
  ],
  encapsulation: ViewEncapsulation.None
})
export class DcMultiselectComponent extends DataLoaderClass implements OnInit, OnDestroy, OnChanges {
  selectAllFields = 'SELECT_ALL';
  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({ required: true }) override control!: UntypedFormControl | AbstractControl;

  copyFormControl = new UntypedFormControl([]);

  @Input() override parentIsVisible: boolean = true;

  filterInput = new UntypedFormControl('');

  get formControl() {
    return this.control as UntypedFormControl;
  }

  constructor(
    _http: DcHttp,
    _dataLoadingWatcher: DataLoadingWatcherService
  ) {
    super(_http, _dataLoadingWatcher);
  }

  override ngOnInit() {
    super.ngOnInit();

    this.filterInput.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe(searchTerm => {
        this.handleFilter(searchTerm || '');
      });

    this.subscribeToFormChanges();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (changes['control']?.currentValue?.status === 'DISABLED') {
      this.copyFormControl.disable();
    } else if (changes['control']?.currentValue?.status !== 'DISABLED') {
      this.copyFormControl.enable();
    }
  }

  onValueChange($event: any[]) {

  }

  onOpenedChange(opened: boolean): void {
    if (!opened) {
      this.filterInput.setValue('');
    }
  }

  override handleFilter(value: string) {
    super.handleFilter(value);
  }

  onRemoveTag($event: any) {
    const values: any[] = Array.isArray(this.control.value) ? this.control.value : [];
    const index = values.findIndex((value: any) => this.compareOptionValues(value, $event));

    if (index < 0) {
      return;
    }
    this.control.patchValue(values.filter((_value, i) => i !== index));
  }

  getLabelForValue(value: any) {
    const options = (this.formEl?.FieldOptions?.length ? this.formEl.FieldOptions
    : this.fieldOptionsFromServer?.length ? this.fieldOptionsFromServer
    : []);
    return options.find(el => this.compareOptionValues(el.Value, value))?.Label || '';
  }

  groupOption(group: GroupResult | FieldOptionModel) {
    return group as GroupResult;
  }

  fieldOption(fieldOption: GroupResult | FieldOptionModel) {
    return fieldOption as FieldOptionModel;
  }

  onOptionSelected() {
    const selected = this.copyFormControl.value || [];
    const allValues = this.getAllOptionValues();
    if (selected.includes(this.selectAllFields)) {
      if (selected.length <= allValues.length) {
        this.copyFormControl.setValue(selected.filter((value: any) => value !== this.selectAllFields));
      }
    } else if (selected.length === allValues.length) {
      this.copyFormControl.setValue([this.selectAllFields, ...selected]);
    }
  }

  toggleSelectAll() {
    const selected = this.copyFormControl.value || [];
    const allValues = this.getAllOptionValues();
    if (selected.includes(this.selectAllFields)) {
      this.copyFormControl.setValue([this.selectAllFields, ...allValues]);
    } else {
      this.copyFormControl.setValue([]);
    }
  }

  subscribeToFormChanges() {

    this.populateValueToCopyControl(this.formControl.value);

    this.formControl.valueChanges.subscribe((actualValues: any[]) => {
      this.populateValueToCopyControl(actualValues);
    });

    this.copyFormControl.valueChanges.subscribe((uiValues: any[]) => {
      if (!Array.isArray(uiValues)) {
        this.formControl.setValue([], { emitEvent: false });
        return;
      }
      const allValues = this.getAllOptionValues();

      if (uiValues.length === 1 && uiValues.includes(this.selectAllFields)) {
        return;
      }

      if (this.formEl.allowMultiSelect && uiValues.length === allValues.length) {
        return;
      }

      this.formControl.setValue(uiValues.filter(value => value !== this.selectAllFields), { emitEvent: true });
    });
  }

  private populateValueToCopyControl(values: any[]) {
    if (this.control.disabled !== this.copyFormControl.disabled) {
      if (this.control.disabled) {
        this.copyFormControl.disable();
      } else {
        this.copyFormControl.enable();
      }
    }

    if (!Array.isArray(values)) {
      this.copyFormControl.setValue([], { emitEvent: false });
      return;
    }

    let uiValues = [...values];

    const allValues = this.getAllOptionValues();
    if (uiValues.length == allValues.length) {
      uiValues = [this.selectAllFields, ...uiValues];
    }
    this.copyFormControl.setValue(uiValues, { emitEvent: false });
  }



  private getAllOptionValues(): any[] {
    const result: any[] = [];

    for (const element of this.groupedOptions) {
      const group = this.groupOption(element);

      if (group?.options?.length) {
        for (const opt of group.options) {
          result.push(opt.Value);
        }
      } else {
        const field = this.fieldOption(element);
        if (field?.Value !== undefined) {
          result.push(field.Value);
        }
      }
    }

    return result;
  }

  getSelectedOptions() {
    return this.copyFormControl.value?.filter((value: any) => value !== this.selectAllFields);
  }
}
