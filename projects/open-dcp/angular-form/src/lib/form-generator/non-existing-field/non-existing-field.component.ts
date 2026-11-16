import {Component, Input} from '@angular/core';
import {FormGeneratorElModel} from "../form-generator.model";
import {AbstractControl, UntypedFormControl} from "@angular/forms";
import {FormGeneratorFieldComponentConfig} from "../form-generator.tokens";

@Component({
  selector: 'odcp-fg-non-existing-field',
  standalone: true,
  imports: [],
  templateUrl: './non-existing-field.component.html',
  styleUrl: './non-existing-field.component.scss'
})
export class NonExistingFieldComponent {
  // Inputs are added so there is no error on generating inputs
  @Input({ required: true }) formEl!: FormGeneratorElModel;
  @Input({ required: true }) control!: UntypedFormControl | AbstractControl;
  @Input() parentIsVisible: boolean = true;
  @Input() fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = [];
}
