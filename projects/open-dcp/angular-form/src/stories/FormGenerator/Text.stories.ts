import { Meta } from '@storybook/angular';
import { FormGeneratorComponent } from '../../lib/form-generator/form-generator/form-generator.component';
import {
  createField,
  defaultFieldStoryArgs,
  FieldStory,
  FieldStoryArgs,
  formGeneratorFieldDecorators,
  renderWithExternalForm,
} from './field-story-helpers';

const meta: Meta<FormGeneratorComponent & FieldStoryArgs> = {
  title: 'Form Generator/Text',
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
        Label: "This section calculates the variability solely for the overall yield data (Note for Biologics DS: Titer variability is also included).",
        Name: "kpi_variability_description|234",
        Description: null,
        FieldType: 16,
        FieldValidations: [],
        FieldOptions: [],
        FieldSettings: null,
        Children: null,
        ConditionGroups: []
      })
    ]
  }
};

