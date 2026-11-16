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
  title: 'Form Generator/Number',
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
        Name: 'batch_size',
        Label: 'Batch Size',
        FieldType: FieldTypeEnum.Number,
        FieldValidations: [requiredValidation()],
        FieldSettings: {
          DefaultValue: 100,
          StepSize: 1,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        }
      })
    ]
  }
};

export const ValidationRules: FieldStory = {
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'sample_count',
        Label: 'Sample Count',
        FieldType: FieldTypeEnum.Number,
        FieldValidations: [
          requiredValidation(),
          validation(FormGeneratorValidationEnum.Min, '1'),
          validation(FormGeneratorValidationEnum.Max, '20')
        ],
        FieldSettings: {
          DefaultValue: 5,
          StepSize: 1,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        }
      })
    ]
  }
};

