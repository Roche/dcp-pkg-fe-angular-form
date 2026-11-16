import { Meta, StoryObj, moduleMetadata  } from '@storybook/angular';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import { action } from '@storybook/addon-actions';
import {SlideToggleComponent} from "../../lib/form/slide-toggle.component";

const meta: Meta<SlideToggleComponent> = {
  title: 'Form Elements/SlideToggle',
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
    }),
  ],
  component: SlideToggleComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    modelValue: {
      control: {type: "boolean"}
    },
    onToggleClicked: {action:'onToggleClicked'},
    onModelValueChange: {action:'onModelValueChange'},
  },
  args: {
    onToggleClicked: action('onToggleClicked'),
    onModelValueChange: action('onModelValueChange'),
  }
};

export default meta;
type Story = StoryObj<SlideToggleComponent>;

export const ModelValueUse: Story = {
  render: (args) => ({
    props: {
      ...args,
      onToggleClicked: args.onToggleClicked,
      onModelValueChange: args.onModelValueChange
    },
    template: `
<odcp-slide-toggle
    (onToggleClicked)="onToggleClicked($event)"
    (onModelValueChange)="onModelValueChange($event)"
    [modelValue]="${args.modelValue}"
    [disabled]="${args.disabled}">
  Label
</odcp-slide-toggle>
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
      <odcp-slide-toggle
          (onToggleClicked)="onToggleClicked($event)"
          (onModelValueChange)="onModelValueChange($event)"
          [control]="formControl"
          [disabled]="${args.disabled}">
        {{formControl.value ? 'On' : 'Off'}}
      </odcp-slide-toggle>
      `,
    props: {
      ...args,
      onToggleClicked: args.onToggleClicked,
      onModelValueChange: args.onModelValueChange,
      formControl: new FormControl<boolean>(true)
    }
  }),
  args: {
    disabled: false,
  }
};
