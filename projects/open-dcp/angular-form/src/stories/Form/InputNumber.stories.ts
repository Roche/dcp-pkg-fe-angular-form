import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { InputNumberComponent } from '../../lib/form/input-number.component';

const meta: Meta<InputNumberComponent> = {
  title: 'Form Elements/InputNumber',
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, TranslateModule.forRoot({defaultLanguage: 'en'}), HttpClientModule]
    })
  ],
  component: InputNumberComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    modelValue: { control: { type: 'number' } },
    label: { control: { type: 'text' } },
    step: { control: { type: 'number' } },
    onInputNumberClicked: { action: 'onInputNumberClicked' },
    onModelValueChange: { action: 'onModelValueChange' }
  },
  args: {
    onInputNumberClicked: action('onInputNumberClicked'),
    onModelValueChange: action('onModelValueChange'),
    label: 'Amount',
    disabled: false,
    modelValue: 5,
    step: 1
  }
};

export default meta;
type Story = StoryObj<InputNumberComponent>;

export const ModelValueUse: Story = {
  render: (args) => ({
    props: {
      ...args
    },
    template: `
      <odcp-input-number
        [label]="label"
        [step]="step"
        [modelValue]="modelValue"
        [disabled]="disabled"
        (onInputNumberClicked)="onInputNumberClicked($event)"
        (onModelValueChange)="onModelValueChange($event)">
      </odcp-input-number>
    `
  })
};

export const ReactiveFormUse: Story = {
  render: (args) => ({
    props: {
      ...args,
      formControl: new FormControl<number | null>(10, [Validators.required])
    },
    template: `
      <odcp-input-number
        [label]="label"
        [step]="step"
        [control]="formControl"
        [disabled]="disabled"
        (onInputNumberClicked)="onInputNumberClicked($event)"
        (onModelValueChange)="onModelValueChange($event)">
      </odcp-input-number>
    `
  })
};

