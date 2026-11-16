import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {FieldTypeEnum, FormGeneratorElModel} from "../form-generator.model";
import {AbstractControl, ReactiveFormsModule, UntypedFormGroup} from "@angular/forms";
import {NgClass, NgComponentOutlet, NgForOf, NgIf} from "@angular/common";
import {ConditionsClass} from "../helpers/Conditions.class";
import {SectionPaperTitleComponent} from "@open-dcp/angular-basic-components";
import {DcHttp} from "@open-dcp/angular-services";
import {FormGeneratorFieldComponentConfig} from "../form-generator.tokens";

@Component({
  selector: 'odcp-fg-group',
  standalone: true,
  templateUrl: './dc-group.component.html',
  imports: [
    ReactiveFormsModule,
    SectionPaperTitleComponent,
    NgClass,
    NgIf,
    NgForOf,
    NgComponentOutlet
  ],
  encapsulation: ViewEncapsulation.None
})
export class DcGroupComponent extends ConditionsClass implements OnInit, OnDestroy, OnChanges {

  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({required: true}) override control!: UntypedFormGroup | AbstractControl;

  @Input() override parentIsVisible: boolean = true;

  @Input() override fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = [];

  fieldTypeEnum = FieldTypeEnum;

  get formGroup() {
    return this.control as UntypedFormGroup;
  }

  constructor(
    _http: DcHttp
  ) {
    super(_http);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.addControls();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

  private addControls() {
    const defaultValues = this.getDefaultValues();
    (this.formEl.Children || []).forEach(
      el => {
        if (this.formGroup === null) {
          return;
        }
        this.formGeneratorService.addGroupEl(el, this.formGroup, defaultValues)
      }
    );
  }

  private getDefaultValues() {
    return (this.formEl.Children || []).reduce((acc, el) => {
      return {
        ...acc,
        [el.Name]: this.formGeneratorService.generateValue(el, el.FieldSettings?.DefaultValue)
      }
    }, {})
  }
}
