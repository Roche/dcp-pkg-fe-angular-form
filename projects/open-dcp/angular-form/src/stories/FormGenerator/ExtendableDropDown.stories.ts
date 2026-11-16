import { Meta } from '@storybook/angular';
import { FormGeneratorComponent } from '../../lib/form-generator/form-generator/form-generator.component';
import { FieldTypeEnum } from '../../lib/form-generator/form-generator.model';
import {
  createField,
  defaultFieldStoryArgs,
  FieldStory,
  FieldStoryArgs,
  formGeneratorFieldDecorators,
  option,
  renderWithExternalForm
} from './field-story-helpers';
import { objectFieldSettings, siteOptions } from './object-value-story-data';

const meta: Meta<FormGeneratorComponent & FieldStoryArgs> = {
  title: 'Form Generator/ExtendableDropDown',
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
        Name: 'workflow_template',
        Label: 'Workflow Template',
        FieldType: FieldTypeEnum.ExtendableDropDown,
        FieldOptions: [
          option('Standard', 'standard'),
          option('Accelerated', 'accelerated'),
          option('Exploratory', 'exploratory')
        ]
      })
    ]
  }
};

export const Preselected: FieldStory = {
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'workflow_template',
        Label: 'Workflow Template',
        FieldType: FieldTypeEnum.ExtendableDropDown,
        FieldOptions: [
          option('Standard', 'standard'),
          option('Accelerated', 'accelerated'),
          option('Exploratory', 'exploratory')
        ],
        FieldSettings: objectFieldSettings('accelerated')
      })
    ]
  }
};

export const ObjectValuesPreselected: FieldStory = {
  name: 'Object values - preselected (serialized)',
  render: renderWithExternalForm,
  parameters: {
    docs: {
      description: {
        story: 'The extendable dropdown is a free-text autocomplete, so it still works with strings: object option values are ' +
          'serialized to JSON for the input and parsed back to objects in the form value. Unlike `DropDown` / `MultiSelectDropdown`, ' +
          'matching the preselected value depends on the JSON representation (same key order as the option value).'
      }
    }
  },
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'site',
        Label: 'Manufacturing Site',
        FieldType: FieldTypeEnum.ExtendableDropDown,
        FieldOptions: siteOptions,
        FieldSettings: objectFieldSettings({ id: 3, code: 'PZB', country: 'DE' })
      })
    ]
  }
};

