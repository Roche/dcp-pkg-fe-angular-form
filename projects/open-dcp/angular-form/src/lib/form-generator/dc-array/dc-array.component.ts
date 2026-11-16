import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {FieldTypeEnum, FormGeneratorElModel} from "../form-generator.model";
import {AbstractControl, FormGroup, ReactiveFormsModule, UntypedFormArray, UntypedFormGroup} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {CommonModule, NgClass, NgIf} from "@angular/common";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatError} from "@angular/material/form-field";
import {DcFormGeneratorErrorComponent} from "../dc-form-generator-error/dc-form-generator-error.component";
import {FlatButtonComponent, SectionPaperTitleComponent} from "@open-dcp/angular-basic-components";
import {MatIcon} from "@angular/material/icon";
import {DataLoaderClass} from "../helpers/DataLoader.class";
import {DataLoadingWatcherService} from "../helpers/DataLoadingWatcher.service";
import {DcHttp} from "@open-dcp/angular-services";
import {FormGeneratorFieldComponentConfig} from "../form-generator.tokens";

@Component({
  selector: 'odcp-fg-array',
  standalone: true,
  templateUrl: './dc-array.component.html',
  imports: [
    CommonModule,
    SectionPaperTitleComponent,
    MatButton,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatError,
    DcFormGeneratorErrorComponent,
    FlatButtonComponent,
    MatIcon
  ],
  encapsulation: ViewEncapsulation.None
})
export class DcArrayComponent extends DataLoaderClass implements OnInit, OnDestroy, OnChanges {

  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({ required: true }) override  control!: UntypedFormArray | AbstractControl;

  @Input() override parentIsVisible: boolean = true;

  @Input() override fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = [];

  fieldTypeEnum = FieldTypeEnum;

  expandedElements: {[key: number]: boolean} = {};

  get parent(): FormGroup {
    return this.control.parent as FormGroup;
  }

  get formArray() {
    return this.control as UntypedFormArray;
  }

  constructor(
    _http: DcHttp,
    _dataLoadingWatcher: DataLoadingWatcherService
  ) {
    super(_http, _dataLoadingWatcher);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.generateFormArrayEl();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

  private generateFormArrayEl() {
    let length = 1;
    if (this.formEl.FieldSettings?.DefaultValue) {
      length = this.formEl.FieldSettings?.DefaultValue.length;
    }

    for (let i = 0; i < length; i++) {
      const defaultValue = this.formEl.FieldSettings?.DefaultValue ? this.formEl.FieldSettings?.DefaultValue[i] : {};
      this.addNewArrayGroup(defaultValue);
    }
  }

  generateFormGroup(defaultValue: any): UntypedFormGroup {
    const group = new UntypedFormGroup({});
    (this.formEl.Children || []).forEach(
      el => this.formGeneratorService.addGroupEl(el, group, defaultValue)
    );
    const formArrayElementIdSettings: FormGeneratorElModel = {
      FieldSettings: {},
      Label: 'FormArrayElementId',
      FieldValidations:[],
      ConditionGroups: [],
      FieldType: 3,
      Children: [],
      Name: 'FormArrayElementId'
    };
    this.formGeneratorService.addGroupEl(formArrayElementIdSettings, group, defaultValue);
    return group;
  }

  addNewArrayGroup(defaultValue = {}) {
    const newGroup = this.generateFormGroup(defaultValue);
    this.formArray.push(newGroup);
    this.expandedElements = {...this.expandedElements, [this.formArray.length - 1]: true};
  }

  removeArrayGroup(i: number) {
    this.formArray.removeAt(i, {emitEvent: true});
  }

  getSubFieldInputs(subEl: FormGeneratorElModel, groupControl: AbstractControl) {
    const group = groupControl as UntypedFormGroup;
    const rowValue = group.getRawValue()?.[subEl.Name];
    const scopedSubEl = rowValue === undefined ? subEl : {
      ...subEl,
      FieldSettings: {
        ...(subEl.FieldSettings || {}),
        DefaultValue: rowValue
      }
    };

    return this.formGeneratorService.getFieldInputs(
      scopedSubEl,
      group,
      this.showElement,
      this.parentIsVisible,
      this.fieldComponentOverrides as FormGeneratorFieldComponentConfig[]
    );
  }
}
