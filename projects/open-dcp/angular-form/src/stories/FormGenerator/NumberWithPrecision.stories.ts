import { Meta } from '@storybook/angular';
import { FormGeneratorComponent } from '../../lib/form-generator/form-generator/form-generator.component';
import { FieldTypeEnum, FormGeneratorValidationEnum } from '../../lib/form-generator/form-generator.model';
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

const meta: Meta<FormGeneratorComponent & FieldStoryArgs> = {
  title: 'Form Generator/NumberWithPrecision',
  component: FormGeneratorComponent,
  tags: ['autodocs'],
  decorators: formGeneratorFieldDecorators,
  args: defaultFieldStoryArgs
};

export default meta;

export const Basic: FieldStory = {
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'ph_value',
        Label: 'pH Value',
        FieldType: FieldTypeEnum.NumberWithPrecision,
        FieldValidations: [
          requiredValidation(),
          validation(FormGeneratorValidationEnum.MinPrecision, '2'),
          validation(FormGeneratorValidationEnum.MaxPrecision, '2')
        ],
        FieldSettings: {
          DefaultValue: { RawValue: '7.00', Precision: 2 },
          StepSize: 0.01,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        }
      })
    ]
  }
};

