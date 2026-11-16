import { Meta } from '@storybook/angular';
import { FormGeneratorComponent } from '../../lib/form-generator/form-generator/form-generator.component';
import { FieldTypeEnum } from '../../lib/form-generator/form-generator.model';
import {
  defaultFieldStoryArgs,
  FieldStory,
  FieldStoryArgs,
  formGeneratorFieldDecorators,
  renderWithExternalForm,
  simpleTextField
} from './field-story-helpers';

const meta: Meta<FormGeneratorComponent & FieldStoryArgs> = {
  title: 'Form Generator/String',
  component: FormGeneratorComponent,
  tags: ['autodocs'],
  decorators: formGeneratorFieldDecorators,
  args: defaultFieldStoryArgs
};

export default meta;

export const Basic: FieldStory = {
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: [simpleTextField('study_name', 'Study Name', 'Stability Program A')]
  }
};

export const EmptyInitialValue: FieldStory = {
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: [
      simpleTextField('assignee', 'Assignee'),
      {
        ...simpleTextField('comment', 'Comment'),
        Name: 'comment',
        Label: 'Comment',
        FieldType: FieldTypeEnum.String,
        FieldSettings: {
          DefaultValue: null,
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        }
      }
    ]
  }
};

