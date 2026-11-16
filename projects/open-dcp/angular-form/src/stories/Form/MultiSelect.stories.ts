import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { MultiSelectComponent } from '../../lib/form/multi-select.component';
import { FieldOptionModel } from '../../lib/form-generator/form-generator.model';

const options: FieldOptionModel[] = [
  { Label: 'Apple', Category: 'Fruit', Value: 'apple' },
  { Label: 'Banana', Category: 'Fruit', Value: 'banana' },
  { Label: 'Carrot', Category: 'Vegetable', Value: 'carrot' },
  { Label: 'Spinach', Category: 'Vegetable', Value: 'spinach' }
];

/** Options with object values (bound directly to mat-select, matched by content). */
const objectOptions: FieldOptionModel[] = [
  { Label: 'Apple', Category: 'Fruit', Value: { id: 1, name: 'apple', details: { color: 'red' } } },
  { Label: 'Banana', Category: 'Fruit', Value: { id: 2, name: 'banana', details: { color: 'yellow' } } },
  { Label: 'Carrot', Category: 'Vegetable', Value: { id: 3, name: 'carrot', details: { color: 'orange' } } },
  { Label: 'Spinach', Category: 'Vegetable', Value: { id: 4, name: 'spinach', details: { color: 'green' } } }
];

const valuePreview = (expression: string) => `
  <h4 style="margin: 16px 0 8px 0; font-family: monospace;">value:</h4>
  <pre style="background: #f4f4f4; padding: 16px; border-radius: 4px; font-size: 12px;">{{ ${expression} | json }}</pre>
`;

const meta: Meta<MultiSelectComponent> = {
  title: 'Form Elements/MultiSelect',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule, TranslateModule.forRoot({defaultLanguage: 'en'}), HttpClientModule]
    })
  ],
  component: MultiSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    label: { control: { type: 'text' } },
    onMultiSelectClicked: { action: 'onMultiSelectClicked' },
    onModelValueChange: { action: 'onModelValueChange' }
  },
  args: {
    onMultiSelectClicked: action('onMultiSelectClicked'),
    onModelValueChange: action('onModelValueChange'),
    label: 'Products',
    disabled: false,
    modelValue: ['banana', 'spinach']
  }
};

export default meta;
type Story = StoryObj<MultiSelectComponent>;

export const ModelValueUse: Story = {
  render: (args) => ({
    props: {
      ...args,
      options
    },
    template: `
      <odcp-multi-select
        [label]="label"
        [options]="options"
        [modelValue]="modelValue"
        [disabled]="disabled"
        (onMultiSelectClicked)="onMultiSelectClicked($event)"
        (onModelValueChange)="onModelValueChange($event)">
      </odcp-multi-select>
    `
  })
};

export const ReactiveFormUse: Story = {
  render: (args) => ({
    props: {
      ...args,
      options,
      formControl: new FormControl<any[] | null>(['apple'], [Validators.required])
    },
    template: `
      <odcp-multi-select
        [label]="label"
        [options]="options"
        [control]="formControl"
        [disabled]="disabled"
        (onMultiSelectClicked)="onMultiSelectClicked($event)"
        (onModelValueChange)="onModelValueChange($event)">
      </odcp-multi-select>
    `
  })
};

/* ------------------------------------------------------------------------------------------------
 * Object values
 * Preselected values are new object instances with a different key order than the option values,
 * showing that selection is matched by content (`compareWith` + deep equality), not by reference.
 * ---------------------------------------------------------------------------------------------- */

export const ObjectValuesModelValue: Story = {
  name: 'Object values - modelValue preselected',
  argTypes: {
    modelValue: { control: { type: 'object' } }
  },
  args: {
    modelValue: [
      { details: { color: 'yellow' }, name: 'banana', id: 2 },
      { name: 'spinach', details: { color: 'green' }, id: 4 }
    ]
  },
  render: (args) => ({
    props: {
      ...args,
      options: objectOptions,
      current: args.modelValue
    },
    template: `
      <odcp-multi-select
        [label]="label"
        [options]="options"
        [modelValue]="modelValue"
        [disabled]="disabled"
        (onMultiSelectClicked)="onMultiSelectClicked($event)"
        (onModelValueChange)="current = $event; onModelValueChange($event)">
      </odcp-multi-select>
      ${valuePreview('current')}
    `
  })
};

export const ObjectValuesReactiveForm: Story = {
  name: 'Object values - reactive form preselected',
  render: (args) => {
    const formControl = new FormControl<any[] | null>(
      [{ name: 'apple', id: 1, details: { color: 'red' } }],
      [Validators.required]
    );
    return {
      props: {
        ...args,
        options: objectOptions,
        formControl
      },
      template: `
        <odcp-multi-select
          [label]="label"
          [options]="options"
          [control]="formControl"
          [disabled]="disabled"
          (onMultiSelectClicked)="onMultiSelectClicked($event)"
          (onModelValueChange)="onModelValueChange($event)">
        </odcp-multi-select>
        ${valuePreview('formControl.value')}
      `
    };
  }
};

export const ObjectValuesProgrammaticChange: Story = {
  name: 'Object values - set value programmatically',
  render: (args) => {
    const formControl = new FormControl<any[] | null>([]);
    return {
      props: {
        ...args,
        options: objectOptions,
        formControl,
        selectVegetables: () => formControl.setValue([
          { id: 3, details: { color: 'orange' }, name: 'carrot' },
          { details: { color: 'green' }, id: 4, name: 'spinach' }
        ]),
        selectAll: () => formControl.setValue(objectOptions.map(el => JSON.parse(JSON.stringify(el.Value)))),
        clear: () => formControl.setValue([])
      },
      template: `
        <odcp-multi-select
          [label]="label"
          [options]="options"
          [control]="formControl"
          [disabled]="disabled"
          (onMultiSelectClicked)="onMultiSelectClicked($event)"
          (onModelValueChange)="onModelValueChange($event)">
        </odcp-multi-select>
        <div style="display: flex; gap: 8px;">
          <button type="button" (click)="selectVegetables()">setValue(vegetable objects)</button>
          <button type="button" (click)="selectAll()">setValue(all objects - copies)</button>
          <button type="button" (click)="clear()">setValue([])</button>
        </div>
        ${valuePreview('formControl.value')}
      `
    };
  }
};

