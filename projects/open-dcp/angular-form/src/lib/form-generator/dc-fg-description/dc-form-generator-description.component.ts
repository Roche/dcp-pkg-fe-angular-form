import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {FormGeneratorElModel} from "../form-generator.model";
import {AbstractControl, UntypedFormControl} from "@angular/forms";
import {DcFormGeneratorHintComponent} from "../dc-form-generator-hint/dc-form-generator-hint.component";
import {ConditionsClass} from "../helpers/Conditions.class";
import {NgIf} from "@angular/common";
import {DcHttp} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-fg-description',
  standalone: true,
  template: `
    <h5 *ngIf="showElement" class="odcp-title">
      {{formEl.Label}}{{ fieldRequired ? ' *' : '' }}
    </h5>
    <p *ngIf="showElement"  class="odcp-hint-container">
      <odcp-form-generator-hint [description]="formEl.Description"></odcp-form-generator-hint>
    </p>
  `,
  styleUrls: [],
  imports: [
    DcFormGeneratorHintComponent,
    NgIf
  ],
  encapsulation: ViewEncapsulation.None
})
export class DcFormGeneratorDescriptionComponent extends ConditionsClass implements OnInit, OnDestroy, OnChanges {
  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({ required: true }) override control!: UntypedFormControl | AbstractControl;

  @Input() override parentIsVisible: boolean = true;

  fieldRequired: boolean = false;

  constructor(
    _http: DcHttp
  ) {
    super(_http);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.fieldRequired = this.formEl?.FieldValidations?.some(fieldValidation => fieldValidation.Type === 'Required');
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }
}
