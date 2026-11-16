import { Meta } from '@storybook/angular';
import { FormGeneratorComponent } from '../../lib/form-generator/form-generator/form-generator.component';
import { FieldTypeEnum } from '../../lib/form-generator/form-generator.model';
import {
  createField,
  defaultFieldStoryArgs,
  FieldStory,
  FieldStoryArgs,
  formGeneratorFieldDecorators,
  renderWithExternalForm,
  requiredValidation
} from './field-story-helpers';

const meta: Meta<FormGeneratorComponent & FieldStoryArgs> = {
  title: 'Form Generator/Secret',
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
        Name: 'api_token',
        Label: 'API Token',
        FieldType: FieldTypeEnum.Secret,
        FieldValidations: [requiredValidation()],
        FieldSettings: {
          DefaultValue: 'token-12345',
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        }
      })
    ]
  }
};

