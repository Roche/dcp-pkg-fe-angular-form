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
  renderWithExternalForm,
  requiredValidation
} from './field-story-helpers';
import {
  groupedSiteOptions,
  OBJECT_LINES_URL,
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
  title: 'Form Generator/DropDown',
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
        Name: 'release_type',
        Label: 'Release Type',
        FieldType: FieldTypeEnum.DropDown,
        FieldValidations: [requiredValidation()],
        FieldOptions: [
          option('Clinical', 'clinical'),
          option('Commercial', 'commercial'),
          option('Stability', 'stability')
        ]
      })
    ]
  }
};

export const GroupedOptions: FieldStory = {
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'market_region',
        Label: 'Market Region',
        FieldType: FieldTypeEnum.DropDown,
        FieldOptions: [
          option('Germany', 'de', 'Europe'),
          option('Switzerland', 'ch', 'Europe'),
          option('Japan', 'jp', 'Asia Pacific')
        ]
      })
    ]
  }
};

export const ReadOnlyExternalSitesHealth: FieldStory = {
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: [
      createField({
        Label: 'If there are external manufacturing sites with data not in DCP: Provide Product Steward assessment of Aborted / Rejected batches health for external sites:',
        Name: 'aborted_rejected_batches_external_sites_health_e2e|228',
        Description: null,
        FieldType: FieldTypeEnum.DropDown,
        FieldValidations: [],
        FieldOptions: [
          option('Good', 'good'),
          option('Medium', 'medium'),
          option('Poor', 'poor'),
          option('N.A', 'n_a'),
          option('No Data Available', 'no_data_available')
        ],
        FieldSettings: {
          DefaultValue: null,
          StepSize: 0,
          DataUrl: null,
          IsRepeatable: false,
          IsReadOnly: true
        },
        Children: [],
        ConditionGroups: []
      })
    ]
  }
};

/* ------------------------------------------------------------------------------------------------
 * Object values
 * Option values are plain objects which are bound directly to `mat-select` (no JSON string
 * conversion). Preselected values are new object instances, often with a different key order,
 * to show that matching is done by content (`compareWith` + deep equality).
 * ---------------------------------------------------------------------------------------------- */

export const ObjectValues: FieldStory = {
  name: 'Object values - selection',
  render: renderWithExternalForm,
  parameters: {
    docs: {
      description: {
        story: 'Options have object values. Selecting an option writes the object itself to the form value.'
      }
    }
  },
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'site',
        Label: 'Manufacturing Site',
        FieldType: FieldTypeEnum.DropDown,
        FieldOptions: siteOptions
      })
    ]
  }
};

export const ObjectValuesPreselected: FieldStory = {
  name: 'Object values - preselected',
  render: renderWithExternalForm,
  parameters: {
    docs: {
      description: {
        story: '`DefaultValue` is a different object instance with a different key order than the option value - it is still preselected.'
      }
    }
  },
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'site',
        Label: 'Manufacturing Site',
        FieldType: FieldTypeEnum.DropDown,
        FieldOptions: siteOptions,
        FieldSettings: objectFieldSettings(preselectedMannheim)
      })
    ]
  }
};

export const ObjectValuesNestedPreselected: FieldStory = {
  name: 'Object values - nested objects preselected',
  render: renderWithExternalForm,
  parameters: {
    docs: {
      description: {
        story: 'Deep equality also works for nested objects and arrays inside the option value.'
      }
    }
  },
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'product_presentation',
        Label: 'Product Presentation',
        FieldType: FieldTypeEnum.DropDown,
        FieldOptions: productOptions,
        FieldSettings: objectFieldSettings(preselectedAtezolizumabSc)
      })
    ]
  }
};

export const ObjectValuesGroupedPreselected: FieldStory = {
  name: 'Object values - grouped options preselected',
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'site',
        Label: 'Manufacturing Site',
        FieldType: FieldTypeEnum.DropDown,
        FieldOptions: groupedSiteOptions,
        FieldSettings: objectFieldSettings(preselectedBasel)
      })
    ]
  }
};

export const ObjectValuesRequiredSingleOption: FieldStory = {
  name: 'Object values - required with single option (auto select)',
  render: renderWithExternalForm,
  parameters: {
    docs: {
      description: {
        story: 'A required dropdown with exactly one option selects it automatically - also for object values.'
      }
    }
  },
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'site',
        Label: 'Manufacturing Site',
        FieldType: FieldTypeEnum.DropDown,
        FieldValidations: [requiredValidation()],
        FieldOptions: [siteOptions[2]]
      })
    ]
  }
};

export const ObjectValuesNotInOptions: FieldStory = {
  name: 'Object values - preselected value not in options',
  render: renderWithExternalForm,
  parameters: {
    docs: {
      description: {
        story: 'A `DefaultValue` that does not match any option (by content) is reset to `null`.'
      }
    }
  },
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'site',
        Label: 'Manufacturing Site',
        FieldType: FieldTypeEnum.DropDown,
        FieldOptions: siteOptions,
        FieldSettings: objectFieldSettings({ id: 99, code: 'XXX', country: 'N/A' })
      })
    ]
  }
};

export const ObjectValuesReadOnlyPreselected: FieldStory = {
  name: 'Object values - read only preselected',
  render: renderWithExternalForm,
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'site',
        Label: 'Manufacturing Site',
        FieldType: FieldTypeEnum.DropDown,
        FieldOptions: siteOptions,
        FieldSettings: objectFieldSettings(preselectedBasel, { IsReadOnly: true })
      })
    ]
  }
};

export const PrimitiveNonStringValuesPreselected: FieldStory = {
  name: 'Number / boolean values - preselected',
  render: renderWithExternalForm,
  parameters: {
    docs: {
      description: {
        story: 'Number and boolean values keep their type in the form value (they are not converted to strings).'
      }
    }
  },
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'batch_size',
        Label: 'Batch Size (L)',
        FieldType: FieldTypeEnum.DropDown,
        FieldOptions: [option('500 L', 500), option('2000 L', 2000), option('12000 L', 12000)],
        FieldSettings: objectFieldSettings(2000)
      }),
      createField({
        Name: 'is_gmp',
        Label: 'GMP relevant',
        FieldType: FieldTypeEnum.DropDown,
        FieldOptions: [option('Yes', true), option('No', false)],
        FieldSettings: objectFieldSettings(false)
      })
    ]
  }
};

export const ObjectValuesFromDataUrl: FieldStory = {
  name: 'Object values - DataUrl with preselection and dependent dropdown',
  render: renderWithExternalForm,
  parameters: {
    ...objectValueMswParameters,
    docs: {
      description: {
        story: 'Options are loaded from `DataUrl` (fresh objects on every response). The site is preselected by content. ' +
          'The production line dropdown uses the selected site object as `${site}` placeholder in its `DataUrl` ' +
          'and has an object `DefaultValue` as well.'
      }
    }
  },
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'site',
        Label: 'Manufacturing Site',
        FieldType: FieldTypeEnum.DropDown,
        FieldSettings: objectFieldSettings(preselectedBasel, { DataUrl: OBJECT_SITES_URL })
      }),
      createField({
        Name: 'line',
        Label: 'Production Line',
        FieldType: FieldTypeEnum.DropDown,
        FieldSettings: objectFieldSettings(
          { line: 2, siteCode: 'BSL' },
          { DataUrl: `${OBJECT_LINES_URL}?site=\${site}` }
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
        story: 'The "German site comment" field is shown only when the selected site equals (by content) Penzberg or Mannheim.'
      }
    }
  },
  args: {
    formGeneratorSettings: [
      createField({
        Name: 'site',
        Label: 'Manufacturing Site',
        FieldType: FieldTypeEnum.DropDown,
        FieldOptions: siteOptions,
        FieldSettings: objectFieldSettings(preselectedMannheim)
      }),
      createField({
        Name: 'german_site_comment',
        Label: 'German site comment',
        FieldType: FieldTypeEnum.String,
        ConditionGroups: [
          {
            Operator: LogicalOperator.and,
            Action: ActionType.Show,
            LoadUrl: null,
            LoadOnce: false,
            Conditions: [
              {
                DependentOn: 'site',
                Operator: ConditionOperator.in,
                Values: [
                  { country: 'DE', code: 'PZB', id: 3 },
                  { country: 'DE', code: 'MHM', id: 4 }
                ]
              }
            ]
          }
        ]
      })
    ]
  }
};

