import { Meta } from '@storybook/angular';
import { FormGeneratorComponent } from '../../lib/form-generator/form-generator/form-generator.component';
import { formGeneratorConfigurations } from './mockData';
import {
  createDynamicDataParameters,
  defaultFieldStoryArgs,
  FieldStory,
  FieldStoryArgs,
  formGeneratorFieldDecorators,
  renderWithExternalForm
} from './field-story-helpers';

const meta: Meta<FormGeneratorComponent & FieldStoryArgs> = {
  title: 'Form Generator/Examples/DynamicData',
  component: FormGeneratorComponent,
  tags: ['autodocs'],
  decorators: formGeneratorFieldDecorators,
  parameters: createDynamicDataParameters(),
  args: defaultFieldStoryArgs
};

export default meta;

export const DropDowns: FieldStory = {
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: formGeneratorConfigurations.dynamicData
  }
};

