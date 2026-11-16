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
  requiredValidation,
  simpleTextField
} from './field-story-helpers';

const meta: Meta<FormGeneratorComponent & FieldStoryArgs> = {
  title: 'Form Generator/Array',
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
        Name: 'actions',
        Label: 'Actions',
        FieldType: FieldTypeEnum.Array,
        FieldValidations: [requiredValidation()],
        FieldSettings: {
          DefaultValue: null,
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: true,
          IsReadOnly: false
        },
        Children: [
          simpleTextField('action_name', 'Action Name'),
          createField({
            Name: 'action_owner',
            Label: 'Owner',
            FieldType: FieldTypeEnum.String,
            FieldValidations: [requiredValidation()]
          })
        ]
      })
    ]
  }
};

