import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {AbstractControl, ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import {Meta, moduleMetadata} from '@storybook/angular';
import {FormGeneratorComponent} from '../../lib/form-generator/form-generator/form-generator.component';
import {FieldTypeEnum, FormGeneratorElModel, FormGeneratorValidationEnum} from '../../lib/form-generator/form-generator.model';
import {FormGeneratorFieldComponentConfig} from '../../lib/form-generator/form-generator.tokens';
import {
  createField,
  defaultFieldStoryArgs,
  FieldStory,
  FieldStoryArgs,
  formGeneratorFieldDecorators,
  renderWithExternalForm,
  requiredValidation,
  validation
} from './field-story-helpers';

enum DemoFieldTypeEnum {
  ModuleComment = 100
}

@Component({
  selector: 'demo-module-comment-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [hidden]="!parentIsVisible" style="border: 1px dashed #7f56d9; border-radius: 8px; padding: 12px;">
      <label style="display:block; font-weight:600; margin-bottom:6px;">{{ formEl.Label }} (module field)</label>
      <textarea [formControl]="formControl" rows="4" style="width:100%; padding:8px;"></textarea>
      <small style="display:block; margin-top:6px; color:#6b7280;">Rendered by app-provided field type 100</small>
    </div>
  `
})
class DemoModuleCommentFieldComponent {
  @Input({required: true}) formEl!: FormGeneratorElModel;
  @Input({required: true}) control!: UntypedFormControl | AbstractControl;
  @Input() parentIsVisible: boolean = true;
  @Input() fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = [];

  get formControl(): UntypedFormControl {
    return this.control as UntypedFormControl;
  }
}

@Component({
  selector: 'demo-overridden-string-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [hidden]="!parentIsVisible" style="border-left: 4px solid #10b981; padding-left: 10px;">
      <label style="display:block; font-weight:600; margin-bottom:6px;">{{ formEl.Label }} (override)</label>
      <input [formControl]="formControl" style="width:100%; padding:8px; text-transform:uppercase;" />
      <small style="display:block; margin-top:6px; color:#6b7280;">Overrides built-in string renderer</small>
    </div>
  `
})
class DemoOverriddenStringFieldComponent {
  @Input({required: true}) formEl!: FormGeneratorElModel;
  @Input({required: true}) control!: UntypedFormControl | AbstractControl;
  @Input() parentIsVisible: boolean = true;
  @Input() fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = [];

  get formControl(): UntypedFormControl {
    return this.control as UntypedFormControl;
  }
}

const meta: Meta<FormGeneratorComponent & FieldStoryArgs> = {
  title: 'Form Generator/Field Component Overrides',
  component: FormGeneratorComponent,
  tags: ['autodocs'],
  decorators: [
    ...formGeneratorFieldDecorators,
    moduleMetadata({
      imports: [DemoModuleCommentFieldComponent, DemoOverriddenStringFieldComponent]
    })
  ],
  args: defaultFieldStoryArgs
};

export default meta;

export const AddCustomFieldType: FieldStory = {
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'module_comment',
        Label: 'Module Comment',
        FieldType: DemoFieldTypeEnum.ModuleComment,
        FieldValidations: [requiredValidation()],
        FieldSettings: {
          DefaultValue: 'Provided by custom type 100',
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        }
      })
    ],
    fieldComponentOverrides: [
      {type: DemoFieldTypeEnum.ModuleComment, component: DemoModuleCommentFieldComponent}
    ]
  }
};

export const OverrideBuiltInString: FieldStory = {
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'study_name',
        Label: 'Study Name',
        FieldType: FieldTypeEnum.String,
        FieldValidations: [requiredValidation(), validation(FormGeneratorValidationEnum.StringLength, 30)],
        FieldSettings: {
          DefaultValue: 'custom rendering active',
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        }
      })
    ],
    fieldComponentOverrides: [
      {type: FieldTypeEnum.String, component: DemoOverriddenStringFieldComponent}
    ]
  }
};


