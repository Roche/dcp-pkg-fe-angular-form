import { Meta, StoryObj, moduleMetadata  } from '@storybook/angular';
import {CheckboxComponent} from "../../lib/form/checkbox.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import { action } from '@storybook/addon-actions';

const meta: Meta<CheckboxComponent> = {
  title: 'Form Elements/Checkbox',
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  component: CheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    modelValue: {
      control: {type: "boolean"}
    },
    indeterminate: {
      control: {type: "boolean"}
    },
    onCheckboxClicked: {action:'onCheckboxClicked'},
    onModelValueChange: {action:'onModelValueChange'},
  },
  args: {
    onCheckboxClicked: action('onCheckboxClicked'),
    onModelValueChange: action('onModelValueChange'),
  }
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const ModelValueUse: Story = {
  render: (args) => ({
    props: {
      ...args,
      onCheckboxClicked: args.onCheckboxClicked,
      onModelValueChange: args.onModelValueChange
    },
    template: `
<odcp-checkbox
    (onCheckboxClicked)="onCheckboxClicked($event)"
    (onModelValueChange)="onModelValueChange($event)"
    [modelValue]="${args.modelValue}"
    [disabled]="${args.disabled}">
  Label
</odcp-checkbox>
`
  }),
  args: {
    disabled: false,
    modelValue: true
  },
};

export const ReactiveFormUse: Story = {
  render: (args) => ({
    template: `
        <!--Inside parent component:
        formControl: new FormControl<boolean>(true)-->
      <odcp-checkbox
          (onCheckboxClicked)="onCheckboxClicked($event)"
          (onModelValueChange)="onModelValueChange($event)"
          [control]="formControl"
          [disabled]="${args.disabled}">
        Label
      </odcp-checkbox>
      `,
    props: {
      ...args,
      onCheckboxClicked: args.onCheckboxClicked,
      onModelValueChange: args.onModelValueChange,
      formControl: new FormControl<boolean>(true)
    }
  }),
  args: {
    disabled: false,
  }
};

export const IndeterminateState: Story = {
  render: (args) => ({
    template: `
<odcp-checkbox
    [indeterminate]="${args.indeterminate}">
  Label
</odcp-checkbox>
`
  }),
  args: {
    indeterminate: true
  },
};
