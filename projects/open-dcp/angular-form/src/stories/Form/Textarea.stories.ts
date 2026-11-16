import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { TextareaComponent } from '../../lib/form/textarea.component';

const meta: Meta<TextareaComponent> = {
  title: 'Form Elements/Textarea',
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, TranslateModule.forRoot({defaultLanguage: 'en'}), HttpClientModule]
    })
  ],
  component: TextareaComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    modelValue: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    minRows: { control: { type: 'number' } },
    maxRows: { control: { type: 'number' } },
    onTextareaClicked: { action: 'onTextareaClicked' },
    onModelValueChange: { action: 'onModelValueChange' }
  },
  args: {
    onTextareaClicked: action('onTextareaClicked'),
    onModelValueChange: action('onModelValueChange'),
    label: 'Description',
    minRows: 3,
    maxRows: 8,
    disabled: false,
    modelValue: 'Sample text'
  }
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const ModelValueUse: Story = {
  render: (args) => ({
    props: {
      ...args
    },
    template: `
      <odcp-textarea
        [label]="label"
        [minRows]="minRows"
        [maxRows]="maxRows"
        [modelValue]="modelValue"
        [disabled]="disabled"
        (onTextareaClicked)="onTextareaClicked($event)"
        (onModelValueChange)="onModelValueChange($event)">
      </odcp-textarea>
    `
  })
};

export const ReactiveFormUse: Story = {
  render: (args) => ({
    props: {
      ...args,
      formControl: new FormControl<string | null>('Long text', [Validators.required])
    },
    template: `
      <odcp-textarea
        [label]="label"
        [minRows]="minRows"
        [maxRows]="maxRows"
        [control]="formControl"
        [disabled]="disabled"
        (onTextareaClicked)="onTextareaClicked($event)"
        (onModelValueChange)="onModelValueChange($event)">
      </odcp-textarea>
    `
  })
};

