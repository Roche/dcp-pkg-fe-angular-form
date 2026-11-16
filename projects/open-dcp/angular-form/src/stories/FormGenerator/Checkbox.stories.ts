import { Meta } from '@storybook/angular';
import { FormGeneratorComponent } from '../../lib/form-generator/form-generator/form-generator.component';
import { FieldTypeEnum } from '../../lib/form-generator/form-generator.model';
import {
  createField,
  defaultFieldStoryArgs,
  FieldStory,
  FieldStoryArgs,
  formGeneratorFieldDecorators,
  renderWithExternalForm
} from './field-story-helpers';

const meta: Meta<FormGeneratorComponent & FieldStoryArgs> = {
  title: 'Form Generator/Checkbox',
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
        Name: 'confirm_release',
        Label: 'Confirm Release',
        FieldType: FieldTypeEnum.Checkbox,
        FieldSettings: {
          DefaultValue: true,
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        }
      })
    ]
  }
};

