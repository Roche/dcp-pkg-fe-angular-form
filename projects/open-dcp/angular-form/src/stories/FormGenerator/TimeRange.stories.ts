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
  title: 'Form Generator/TimeRange',
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
        Name: 'maintenance_window',
        Label: 'Maintenance Window',
        FieldType: FieldTypeEnum.TimeRange,
        FieldSettings: {
          DefaultValue: {
            StartTime: '2026-07-20T08:00:00.000Z',
            EndTime: '2026-07-20T10:00:00.000Z'
          },
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        }
      })
    ]
  }
};

