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
  title: 'Form Generator/Description',
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
        Name: 'description_basic',
        Label: 'Description',
        FieldType: FieldTypeEnum.Description,
        FieldSettings: {
          DefaultValue: 'This field type renders read-only helper content inside the generated form.',
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: true
        }
      })
    ]
  }
};

export const WithHtml: FieldStory = {
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'description_html',
        Label: 'Description with HTML',
        FieldType: FieldTypeEnum.Description,
        FieldSettings: {
          DefaultValue: '<strong>HTML content</strong><br/>This variant shows formatted description text.',
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: true
        }
      })
    ]
  }
};

