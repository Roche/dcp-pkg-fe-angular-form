import {Meta, StoryObj, moduleMetadata} from '@storybook/angular';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, UntypedFormGroup} from "@angular/forms";
import { action } from '@storybook/addon-actions';
import {FormGeneratorComponent} from "../../lib/form-generator/form-generator/form-generator.component";
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import {formGeneratorConfigurations} from "./mockData";
import {delay, http, HttpResponse} from "msw";
import { useArgs } from '@storybook/preview-api';

type StoryProps = {
  isActive?: boolean;
};


const meta: Meta<FormGeneratorComponent & StoryProps> = {
  title: 'Form Generator/Real Life',
  parameters: {
    docs: {
      description: {
        component: [
          'Schema-driven dynamic form renderer using `FormGeneratorElModel[]`.',
          '',
          'Basic usage:',
          '```html',
          '<odcp-form-generator',
          '  [formGeneratorSettings]="settings"',
          '  [defaultValues]="defaults"',
          '  (onFormValueChange)="onChange($event)">',
          '</odcp-form-generator>',
          '```',
          '',
          'External form usage:',
          '```typescript',
          'form = new UntypedFormGroup({});',
          '```',
          '```html',
          '<odcp-form-generator',
          '  [form]="form"',
          '  [formGeneratorSettings]="settings"',
          '  [emitInitialForm]="false">',
          '</odcp-form-generator>',
          '```'
        ].join('\n')
      }
    },
    msw: {
      handlers: [
        http.get('https://demo.dev/tph/cqa/options/meta-data', async ({request}) => {
          await delay(600);
          const url = new URL(request.url)

          const valuePropertyName = url.searchParams.get('valuePropertyName');

          switch (valuePropertyName) {
            case 'Platform':
              const type1 = url.searchParams.get('filters[0].StringValue');
              return HttpResponse.json([
                {
                  "Label": `Platform ${type1} 1`,
                  "Category": null,
                  "Value": `Platform ${type1} 1`,
                },
                {
                  "Label": `Platform ${type1} 2`,
                  "Category": null,
                  "Value": `Platform ${type1} 2`,
                },
              ]);
            case 'Device':
              const type = url.searchParams.get('filters[0].StringValue');
              const platform = url.searchParams.get('filters[1].StringValue');
              return HttpResponse.json([
                {
                  "Label": `Device ${type} ${platform} 1`,
                  "Category": null,
                  "Value": `Device ${type} ${platform} 1`,
                },
                {
                  "Label": `Device ${type} ${platform} 2`,
                  "Category": null,
                  "Value": `Device ${type} ${platform} 2`,
                }
              ]);
            default:
              return HttpResponse.json([]);
          }
        }),
      ]
    }
  },
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, TranslateModule.forRoot({defaultLanguage: 'en'}), HttpClientModule, CommonModule]
    }),
  ],
  component: FormGeneratorComponent,
  tags: ['autodocs'],
  args: {
    formGeneratorSettings: [],
    defaultValues: {},
    onFormValueChange: action('onFormValueChange'),
  },
  argTypes: {
    elementsClass: {
      type: "string"
    },
    disabled: {
      type: "boolean"
    },
    onFormValueChange: {action:'onFormValueChange'},
  },
};

export default meta;
type Story = StoryObj<FormGeneratorComponent & StoryProps>;

export const BasicUsage: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
<div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
  <odcp-form-generator
      (onFormValueChange)="onFormValueChange($event)"
      [formGeneratorSettings]="formGeneratorSettings">
  </odcp-form-generator>
</div>
`
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.basic
  },
};

export const FormWithHints: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
<div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
  <odcp-form-generator
      elementsClass="full-width"
      (onFormValueChange)="onFormValueChange($event)"
      [formGeneratorSettings]="formGeneratorSettings">
  </odcp-form-generator>
</div>
`
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.hint
  },
};

export const FormWithConditions: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
<div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
  <odcp-form-generator
      elementsClass="full-width"
      (onFormValueChange)="onFormValueChange($event)"
      [formGeneratorSettings]="formGeneratorSettings">
  </odcp-form-generator>
</div>
`
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.conditions
  },
};

export const FormWithArrayWithChildren: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
<div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
  <odcp-form-generator
      elementsClass="full-width"
      (onFormValueChange)="onFormValueChange($event)"
      [formGeneratorSettings]="formGeneratorSettings">
  </odcp-form-generator>
</div>
`
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.arrayWithChildren
  },
};

export const formMaxLimitReached: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
<div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
  <odcp-form-generator
      elementsClass="full-width"
      (onFormValueChange)="onFormValueChange($event)"
      [formGeneratorSettings]="formGeneratorSettings">
  </odcp-form-generator>
</div>
`
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.maxLimitReached
  },
};

export const formArrayStructure: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
<div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
  <odcp-form-generator
      elementsClass="full-width"
      (onFormValueChange)="onFormValueChange($event)"
      [formGeneratorSettings]="formGeneratorSettings">
  </odcp-form-generator>
</div>
`
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.newFormArrayStructure
  },
};

export const newData: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
<div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
  <odcp-form-generator
      elementsClass="full-width"
      (onFormValueChange)="onFormValueChange($event)"
      [formGeneratorSettings]="formGeneratorSettings">
  </odcp-form-generator>
</div>
`
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.newData
  },
};

export const dateRange: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
<div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
  <odcp-form-generator
      elementsClass="full-width"
      (onFormValueChange)="onFormValueChange($event)"
      [formGeneratorSettings]="formGeneratorSettings">
  </odcp-form-generator>
</div>
`
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.dateRange
  },
};

export const conditionalFieldsForm: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
<div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
  <odcp-form-generator
      elementsClass="full-width"
      (onFormValueChange)="onFormValueChange($event)"
      [formGeneratorSettings]="formGeneratorSettings">
  </odcp-form-generator>
</div>
`
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.conditionalFields
  },
};

export const dynamicDataForm: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
      <div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
        <odcp-form-generator
            elementsClass="full-width"
            (onFormValueChange)="onFormValueChange($event)"
            [formGeneratorSettings]="formGeneratorSettings">
        </odcp-form-generator>
      </div>
    `
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.dynamicData
  },
};

export const preselectedMultiSelect: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
      <div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
        <odcp-form-generator
            elementsClass="full-width"
            (onFormValueChange)="onFormValueChange($event)"
            [formGeneratorSettings]="formGeneratorSettings">
        </odcp-form-generator>
      </div>
    `
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.preselectedMultiSelect
  },
};

export const preselectedMultiSelectWithObjectsValues: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
      <div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
        <odcp-form-generator
            elementsClass="full-width"
            (onFormValueChange)="onFormValueChange($event)"
            [formGeneratorSettings]="formGeneratorSettings">
        </odcp-form-generator>
      </div>
    `
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.preselectedMultiSelectObject
  },
};

export const countConditions: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
      <div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
        <odcp-form-generator
            elementsClass="full-width"
            (onFormValueChange)="onFormValueChange($event)"
            [formGeneratorSettings]="formGeneratorSettings">
        </odcp-form-generator>
      </div>
    `
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.countConditions
  },
};

export const closureDate: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
      <div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
        <odcp-form-generator
            elementsClass="full-width"
            (onFormValueChange)="onFormValueChange($event)"
            [formGeneratorSettings]="formGeneratorSettings">
        </odcp-form-generator>
      </div>
    `
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.closureDate
  },
};


export const multiSelect: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
      <div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
        <odcp-form-generator
            elementsClass="full-width"
            (onFormValueChange)="onFormValueChange($event)"
            [formGeneratorSettings]="formGeneratorSettings"
            [allowMultiSelect]="true">
        </odcp-form-generator>
      </div>
    `
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.multiSelect
  },
};


export const showCondition: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
      <div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
        <odcp-form-generator
            elementsClass="full-width"
            (onFormValueChange)="onFormValueChange($event)"
            [formGeneratorSettings]="formGeneratorSettings"
            [allowMultiSelect]="true">
        </odcp-form-generator>
      </div>
    `
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.showCondition
  },
};


export const disableValidationConditions: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
      <div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
        <odcp-form-generator
            elementsClass="full-width"
            (onFormValueChange)="onFormValueChange($event)"
            [formGeneratorSettings]="formGeneratorSettings"
            [allowMultiSelect]="true">
        </odcp-form-generator>
      </div>
    `
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.disableValidationConditions
  },
};

export const withExternalForm: Story = {
  render: (args) => {
    const inputForm = new UntypedFormGroup({});
    return {
      props: {
        ...args,
        inputForm,
      },
      template: `
        <div style="width: 100%; display: flex; align-items: flex-start; gap: 32px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 300px;">
            <odcp-form-generator
                elementsClass="full-width"
                [form]="inputForm"
                [formGeneratorSettings]="formGeneratorSettings"
                [allowMultiSelect]="true">
            </odcp-form-generator>
          </div>
          <div style="flex: 1; min-width: 300px;">
            <h4 style="margin: 0 0 8px 0; font-family: monospace;">inputForm.value:</h4>
            <pre style="background: #f4f4f4; padding: 16px; border-radius: 4px; overflow: auto; font-size: 12px;">{{ inputForm.value | json }}</pre>
          </div>
        </div>
      `
    };
  },
  args: {
    formGeneratorSettings: formGeneratorConfigurations.disableValidationConditions
  },
};

export const descriptionWithHtml: Story = {
  render: (args) => {
    const inputForm = new UntypedFormGroup({});
    return {
      props: {
        ...args,
        inputForm,
      },
      template: `
        <div style="width: 100%; display: flex; align-items: flex-start; gap: 32px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 300px;">
            <odcp-form-generator
                elementsClass="full-width"
                [form]="inputForm"
                [formGeneratorSettings]="formGeneratorSettings"
                [allowMultiSelect]="true">
            </odcp-form-generator>
          </div>
          <div style="flex: 1; min-width: 300px;">
            <h4 style="margin: 0 0 8px 0; font-family: monospace;">inputForm.value:</h4>
            <pre style="background: #f4f4f4; padding: 16px; border-radius: 4px; overflow: auto; font-size: 12px;">{{ inputForm.value | json }}</pre>
          </div>
        </div>
      `
    };
  },
  args: {
    formGeneratorSettings: formGeneratorConfigurations.descriptionWithHtml
  },
};

export const disabledDropDown: Story = {
  render: (args) => {
    const [{ isActive }, updateArgs] = useArgs();
    const inputForm = new UntypedFormGroup({});
    inputForm.valueChanges.subscribe(value => {});
    return {
      props: {
        ...args,
        inputForm,
        toggle() {
          updateArgs({ isActive: !isActive });
        },
      },
      template: `
        <div style="width: 100%; display: flex; align-items: flex-start; gap: 32px; flex-wrap: wrap;">
          <button (click)="toggle()">
            Toggle
          </button>
          <div style="flex: 1; min-width: 300px;">
            <odcp-form-generator
                elementsClass="full-width"
                [form]="inputForm"
                [disabled]="isActive"
                [formGeneratorSettings]="formGeneratorSettings"
                [allowMultiSelect]="true">
            </odcp-form-generator>
          </div>
          <div style="flex: 1; min-width: 300px;">
            <h4 style="margin: 0 0 8px 0; font-family: monospace;">inputForm.value:</h4>
            <pre style="background: #f4f4f4; padding: 16px; border-radius: 4px; overflow: auto; font-size: 12px;">{{ inputForm.value | json }}</pre>
          </div>
        </div>
      `
    };
  },
  args: {
    formGeneratorSettings: formGeneratorConfigurations.disabledDropDown,
    isActive: false,
  },
};

export const ProductQualityAggregatedE2E: Story = {
  render: (args) => ({
    props: {
      ...args,
      onFormValueChange: args.onFormValueChange
    },
    template: `
      <div style="width: 100%; display: flex; align-items: center; justify-content: flex-start; gap: 20px; flex-wrap: wrap;">
        <odcp-form-generator
            elementsClass="full-width"
            (onFormValueChange)="onFormValueChange($event)"
            [formGeneratorSettings]="formGeneratorSettings"
            [allowMultiSelect]="true">
        </odcp-form-generator>
      </div>
    `
  }),
  args: {
    formGeneratorSettings: formGeneratorConfigurations.productQualityAggregatedE2E
  },
};
