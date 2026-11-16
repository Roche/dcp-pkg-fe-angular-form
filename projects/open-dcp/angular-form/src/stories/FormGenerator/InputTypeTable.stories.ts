import { STORYBOOK_MOCK_API } from '../mocks/storybook-mock-api.data';
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
  title: 'Form Generator/InputTypeTable',
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
        Label: null,
        Name: "kpi_variability_table_functional|76",
        Description: null,
        FieldType: FieldTypeEnum.Table,
        FieldValidations: [],
        FieldOptions: [],
        FieldSettings: {
          DefaultValue: null,
          StepSize: 0,
          DataUrl: STORYBOOK_MOCK_API + "/tph/assessment/form/options/table?metricName=kpi_variability",
          IsRepeatable: false, 
          IsReadOnly: true
        },
        Children: [], 
        ConditionGroups: []
      })
    ]
  }
};
