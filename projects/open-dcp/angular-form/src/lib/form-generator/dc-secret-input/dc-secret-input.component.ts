import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { FormGeneratorElModel} from "../form-generator.model";
import {AbstractControl, ReactiveFormsModule, UntypedFormControl} from "@angular/forms";
import {ConditionsClass} from "../helpers/Conditions.class";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {TranslateModule} from "@ngx-translate/core";
import {MatInput} from "@angular/material/input";
import {DcFormGeneratorErrorComponent} from "../dc-form-generator-error/dc-form-generator-error.component";
import {NgIf} from "@angular/common";
import {DcHttp} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-secret-input',
  standalone: true,
  templateUrl: './dc-secret-input.component.html',
  styleUrls: [],
  imports: [
    MatFormField,
    MatLabel,
    TranslateModule,
    MatInput,
    ReactiveFormsModule,
    MatError,
    DcFormGeneratorErrorComponent,
    NgIf
  ]
})
export class DcSecretInputComponent extends ConditionsClass implements OnInit, OnDestroy, OnChanges {

  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({ required: true }) override control!: UntypedFormControl | AbstractControl;

  @Input() override parentIsVisible: boolean = true;

  get formControl(): UntypedFormControl {
    return this.control as UntypedFormControl;
  }

  autocompleteLabel = '';

  constructor(
    _http: DcHttp
  ) {
    super(_http);
  }
  override ngOnInit() {
    super.ngOnInit();
    this.generateAutocomplete();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

  private generateAutocomplete() {
    this.autocompleteLabel = this.formGeneratorService.generateAutocomplete(this.formEl?.Label || '');
  }
}
