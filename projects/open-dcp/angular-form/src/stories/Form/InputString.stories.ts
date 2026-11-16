import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { InputStringComponent } from '../../lib/form/input-string.component';

const meta: Meta<InputStringComponent> = {
  title: 'Form Elements/InputString',
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, TranslateModule.forRoot({defaultLanguage: 'en'}), HttpClientModule]
    })
  ],
  component: InputStringComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    modelValue: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    onInputStringClicked: { action: 'onInputStringClicked' },
    onModelValueChange: { action: 'onModelValueChange' }
  },
  args: {
    onInputStringClicked: action('onInputStringClicked'),
    onModelValueChange: action('onModelValueChange'),
    label: 'Name',
    disabled: false,
    modelValue: 'Initial value'
  }
};

export default meta;
type Story = StoryObj<InputStringComponent>;

export const ModelValueUse: Story = {
  render: (args) => ({
    props: {
      ...args
    },
    template: `
      <odcp-input-string
        [label]="label"
        [modelValue]="modelValue"
        [disabled]="disabled"
        (onInputStringClicked)="onInputStringClicked($event)"
        (onModelValueChange)="onModelValueChange($event)">
      </odcp-input-string>
    `
  })
};

export const ReactiveFormUse: Story = {
  render: (args) => ({
    props: {
      ...args,
      formControl: new FormControl<string | null>('John Doe', [Validators.required])
    },
    template: `
      <odcp-input-string
        [label]="label"
        [control]="formControl"
        [disabled]="disabled"
        (onInputStringClicked)="onInputStringClicked($event)"
        (onModelValueChange)="onModelValueChange($event)">
      </odcp-input-string>
    `
  })
};

