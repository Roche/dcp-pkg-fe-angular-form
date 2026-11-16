import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SecretInputComponent } from '../../lib/form/secret-input.component';

const meta: Meta<SecretInputComponent> = {
  title: 'Form Elements/SecretInput',
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, TranslateModule.forRoot({defaultLanguage: 'en'}), HttpClientModule]
    })
  ],
  component: SecretInputComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    modelValue: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    autocomplete: { control: { type: 'text' } },
    onSecretInputClicked: { action: 'onSecretInputClicked' },
    onModelValueChange: { action: 'onModelValueChange' }
  },
  args: {
    onSecretInputClicked: action('onSecretInputClicked'),
    onModelValueChange: action('onModelValueChange'),
    label: 'Password',
    autocomplete: 'new-password',
    disabled: false,
    modelValue: 'secret'
  }
};

export default meta;
type Story = StoryObj<SecretInputComponent>;

export const ModelValueUse: Story = {
  render: (args) => ({
    props: {
      ...args
    },
    template: `
      <odcp-secret-input
        [label]="label"
        [autocomplete]="autocomplete"
        [modelValue]="modelValue"
        [disabled]="disabled"
        (onSecretInputClicked)="onSecretInputClicked($event)"
        (onModelValueChange)="onModelValueChange($event)">
      </odcp-secret-input>
    `
  })
};

export const ReactiveFormUse: Story = {
  render: (args) => ({
    props: {
      ...args,
      formControl: new FormControl<string | null>('my-password', [Validators.required])
    },
    template: `
      <odcp-secret-input
        [label]="label"
        [autocomplete]="autocomplete"
        [control]="formControl"
        [disabled]="disabled"
        (onSecretInputClicked)="onSecretInputClicked($event)"
        (onModelValueChange)="onModelValueChange($event)">
      </odcp-secret-input>
    `
  })
};

