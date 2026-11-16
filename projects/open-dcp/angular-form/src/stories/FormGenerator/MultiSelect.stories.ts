import { Meta } from '@storybook/angular';
import { FormGeneratorComponent } from '../../lib/form-generator/form-generator/form-generator.component';
import {
  ActionType,
  ConditionOperator,
  FieldTypeEnum,
  LogicalOperator
} from '../../lib/form-generator/form-generator.model';
import {
  createField,
  defaultFieldStoryArgs,
  FieldStory,
  FieldStoryArgs,
  formGeneratorFieldDecorators,
  option,
  renderWithExternalForm
} from './field-story-helpers';
import {
  groupedSiteOptions,
  OBJECT_SITES_URL,
  objectFieldSettings,
  objectValueMswParameters,
  preselectedAtezolizumabSc,
  preselectedBasel,
  preselectedMannheim,
  productOptions,
  siteOptions
} from './object-value-story-data';

const meta: Meta<FormGeneratorComponent & FieldStoryArgs> = {
  title: 'Form Generator/MultiSelectDropdown',
  component: FormGeneratorComponent,
  tags: ['autodocs'],
  decorators: formGeneratorFieldDecorators,
  args: defaultFieldStoryArgs
};

export default meta;

export const Basic: FieldStory = {
  render: renderWithExternalForm,
  args: {
    allowMultiSelect: true,
    formGeneratorSettings: [
      createField({
        Name: 'capabilities',
        Label: 'Capabilities',
        FieldType: FieldTypeEnum.MultiSelectDropdown,
        FieldOptions: [
          option('Reporting', 'reporting'),
          option('Visualization', 'visualization'),
          option('Workflow', 'workflow')
        ]
      })
    ]
  }
};

export const Preselected: FieldStory = {
  render: renderWithExternalForm,
  args: {
    allowMultiSelect: true,
    formGeneratorSettings: [
      createField({
        Name: 'departments',
        Label: 'Departments',
        FieldType: FieldTypeEnum.MultiSelectDropdown,
        FieldOptions: [
          option('Quality', 'quality'),
          option('Manufacturing', 'manufacturing'),
          option('Regulatory', 'regulatory')
        ],
        FieldSettings: {
          DefaultValue: ['quality', 'regulatory'],
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        }
      })
    ]
  }
};

export const ObjectValues: FieldStory = {
  name: 'Object values - basic preselection',
  render: renderWithExternalForm,
  args: {
    allowMultiSelect: true,
    formGeneratorSettings: [
      createField({
        Name: 'sites',
        Label: 'Sites',
        FieldType: FieldTypeEnum.MultiSelectDropdown,
        FieldOptions: [
          option('Basel', { id: 1, code: 'BSL' }),
          option('Penzberg', { id: 2, code: 'PZB' }),
          option('Mannheim', { id: 3, code: 'MHM' })
        ],
        FieldSettings: {
          DefaultValue: [{ id: 1, code: 'BSL' }],
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: false
        }
      })
    ]
  }
};

/* ------------------------------------------------------------------------------------------------
 * Object values
 * Option values are plain objects bound directly to `mat-select` (no JSON string conversion).
 * Preselected values are new object instances with a different key order - matching is done by
 * content (`compareWith` + deep equality).
 * ---------------------------------------------------------------------------------------------- */

export const ObjectValuesSelection: FieldStory = {
  name: 'Object values - selection',
  render: renderWithExternalForm,
  parameters: {
    docs: {
      description: {
        story: 'No preselection. Selected objects are written to the form value as objects; chips show the option labels.'
      }
    }
  },
  args: {
    allowMultiSelect: false,
    formGeneratorSettings: [
      createField({
        Name: 'sites',
        Label: 'Manufacturing Sites',
        FieldType: FieldTypeEnum.MultiSelectDropdown,
        FieldOptions: siteOptions
      })
    ]
  }
};

export const ObjectValuesPreselected: FieldStory = {
  name: 'Object values - preselected (different key order)',
  render: renderWithExternalForm,
  parameters: {
    docs: {
      description: {
        story: '`DefaultValue` contains new object instances with a different key order than the option values.'
      }
    }
  },
  args: {
    allowMultiSelect: false,
    formGeneratorSettings: [
      createField({
        Name: 'sites',
        Label: 'Manufacturing Sites',
        FieldType: FieldTypeEnum.MultiSelectDropdown,
        FieldOptions: siteOptions,
        FieldSettings: objectFieldSettings([preselectedBasel, preselectedMannheim])
      })
    ]
  }
};

export const ObjectValuesNestedPreselected: FieldStory = {
  name: 'Object values - nested objects preselected',
  render: renderWithExternalForm,
  args: {
    allowMultiSelect: false,
    formGeneratorSettings: [
      createField({
        Name: 'product_presentations',
        Label: 'Product Presentations',
        FieldType: FieldTypeEnum.MultiSelectDropdown,
        FieldOptions: productOptions,
        FieldSettings: objectFieldSettings([preselectedAtezolizumabSc])
      })
    ]
  }
};

export const ObjectValuesGroupedPreselected: FieldStory = {
  name: 'Object values - grouped options preselected',
  render: renderWithExternalForm,
  args: {
    allowMultiSelect: false,
    formGeneratorSettings: [
      createField({
        Name: 'sites',
        Label: 'Manufacturing Sites',
        FieldType: FieldTypeEnum.MultiSelectDropdown,
        FieldOptions: groupedSiteOptions,
        FieldSettings: objectFieldSettings([preselectedBasel, preselectedMannheim])
      })
    ]
  }
};

export const ObjectValuesSelectAll: FieldStory = {
  name: 'Object values - "Select all" with everything preselected',
  render: renderWithExternalForm,
  parameters: {
    docs: {
      description: {
        story: 'With `allowMultiSelect` the "Select all" option is available. All objects are preselected, so "Select all" is checked.'
      }
    }
  },
  args: {
    allowMultiSelect: true,
    formGeneratorSettings: [
      createField({
        Name: 'sites',
        Label: 'Manufacturing Sites',
        FieldType: FieldTypeEnum.MultiSelectDropdown,
        FieldOptions: siteOptions,
        FieldSettings: objectFieldSettings(siteOptions.map(el => JSON.parse(JSON.stringify(el.Value))))
      })
    ]
  }
};

export const PrimitiveNonStringValuesPreselected: FieldStory = {
  name: 'Number values - preselected',
  render: renderWithExternalForm,
  parameters: {
    docs: {
      description: {
        story: 'Number values keep their type in the form value (e.g. `"123"`-like strings are no longer parsed to numbers and vice versa).'
      }
    }
  },
  args: {
    allowMultiSelect: false,
    formGeneratorSettings: [
      createField({
        Name: 'batch_sizes',
        Label: 'Batch Sizes (L)',
        FieldType: FieldTypeEnum.MultiSelectDropdown,
        FieldOptions: [option('500 L', 500), option('2000 L', 2000), option('12000 L', 12000), option('Code "123"', '123')],
        FieldSettings: objectFieldSettings([2000, '123'])
      })
    ]
  }
};

export const ObjectValuesFromDataUrl: FieldStory = {
  name: 'Object values - DataUrl with preselection',
  render: renderWithExternalForm,
  parameters: {
    ...objectValueMswParameters,
    docs: {
      description: {
        story: 'Options are loaded from `DataUrl` (fresh objects on every response). Preselected objects that exist in the response stay selected, ' +
          'values that do not exist (id 99) are removed.'
      }
    }
  },
  args: {
    allowMultiSelect: false,
    formGeneratorSettings: [
      createField({
        Name: 'sites',
        Label: 'Manufacturing Sites',
        FieldType: FieldTypeEnum.MultiSelectDropdown,
        FieldSettings: objectFieldSettings(
          [preselectedBasel, preselectedMannheim, { id: 99, code: 'XXX', country: 'N/A' }],
          { DataUrl: OBJECT_SITES_URL }
        )
      })
    ]
  }
};

export const ObjectValuesWithConditions: FieldStory = {
  name: 'Object values - conditions',
  render: renderWithExternalForm,
  parameters: {
    docs: {
      description: {
        story: 'The "US site justification" field is shown only when the selected sites contain (by content) South San Francisco.'
      }
    }
  },
  args: {
    allowMultiSelect: false,
    formGeneratorSettings: [
      createField({
        Name: 'sites',
        Label: 'Manufacturing Sites',
        FieldType: FieldTypeEnum.MultiSelectDropdown,
        FieldOptions: siteOptions,
        FieldSettings: objectFieldSettings([preselectedBasel])
      }),
      createField({
        Name: 'us_site_justification',
        Label: 'US site justification',
        FieldType: FieldTypeEnum.String,
        ConditionGroups: [
          {
            Operator: LogicalOperator.and,
            Action: ActionType.Show,
            LoadUrl: null,
            LoadOnce: false,
            Conditions: [
              {
                DependentOn: 'sites',
                Operator: ConditionOperator.equal,
                Values: [{ country: 'US', code: 'SSF', id: 5 }]
              }
            ]
          }
        ]
      })
    ]
  }
};

