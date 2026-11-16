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
  title: 'Form Generator/DateTime',
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
        Name: 'review_date',
        Label: 'Review Date',
        FieldType: FieldTypeEnum.DateTime,
        FieldSettings: {
          DefaultValue: '2026-07-20T08:30:00.000Z',
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        }
      })
    ]
  }
};

export const WithMinContext: FieldStory = {
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'submission_date',
        Label: 'Submission Date',
        FieldType: FieldTypeEnum.DateTime,
        Description: 'Use the date/time picker generated from the schema definition.'
      })
    ]
  }
};

