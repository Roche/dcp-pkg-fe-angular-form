import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownSelectComponent } from '../../lib/form/dropdown-select.component';
import { FieldOptionModel } from '../../lib/form-generator/form-generator.model';

const options: FieldOptionModel[] = [
  { Label: 'Germany', Category: 'Europe', Value: 'DE' },
  { Label: 'France', Category: 'Europe', Value: 'FR' },
  { Label: 'Japan', Category: 'Asia', Value: 'JP' },
  { Label: 'Brazil', Value: 'BR' }
];

/** Options with object values (bound directly to mat-select, matched by content). */
const objectOptions: FieldOptionModel[] = [
  { Label: 'Germany', Category: 'Europe', Value: { iso: 'DE', name: 'Germany', eu: true } },
  { Label: 'France', Category: 'Europe', Value: { iso: 'FR', name: 'France', eu: true } },
  { Label: 'Japan', Category: 'Asia', Value: { iso: 'JP', name: 'Japan', eu: false } },
  { Label: 'Brazil', Value: { iso: 'BR', name: 'Brazil', eu: false } }
];

const valuePreview = (expression: string) => `
  <h4 style="margin: 16px 0 8px 0; font-family: monospace;">value:</h4>
  <pre style="background: #f4f4f4; padding: 16px; border-radius: 4px; font-size: 12px;">{{ ${expression} | json }}</pre>
`;

const meta: Meta<DropdownSelectComponent> = {
  title: 'Form Elements/DropdownSelect',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule, TranslateModule.forRoot({defaultLanguage: 'en'}), HttpClientModule]
    })
  ],
  component: DropdownSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    modelValue: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    onDropdownSelectClicked: { action: 'onDropdownSelectClicked' },
    onModelValueChange: { action: 'onModelValueChange' }
  },
  args: {
    onDropdownSelectClicked: action('onDropdownSelectClicked'),
    onModelValueChange: action('onModelValueChange'),
    label: 'Country',
    disabled: false,
    modelValue: 'FR'
  }
};

export default meta;
type Story = StoryObj<DropdownSelectComponent>;

export const ModelValueUse: Story = {
  render: (args) => ({
    props: {
      ...args,
      options
    },
    template: `
      <odcp-dropdown-select
        [label]="label"
        [options]="options"
        [modelValue]="modelValue"
        [disabled]="disabled"
        (onDropdownSelectClicked)="onDropdownSelectClicked($event)"
        (onModelValueChange)="onModelValueChange($event)">
      </odcp-dropdown-select>
    `
  })
};

export const ReactiveFormUse: Story = {
  render: (args) => ({
    props: {
      ...args,
      options,
      formControl: new FormControl<string | null>('JP', [Validators.required])
    },
    template: `
      <odcp-dropdown-select
        [label]="label"
        [options]="options"
        [control]="formControl"
        [disabled]="disabled"
        (onDropdownSelectClicked)="onDropdownSelectClicked($event)"
        (onModelValueChange)="onModelValueChange($event)">
      </odcp-dropdown-select>
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
    modelValue: { eu: false, name: 'Japan', iso: 'JP' }
  },
  render: (args) => ({
    props: {
      ...args,
      options: objectOptions,
      current: args.modelValue
    },
    template: `
      <odcp-dropdown-select
        [label]="label"
        [options]="options"
        [modelValue]="modelValue"
        [disabled]="disabled"
        (onDropdownSelectClicked)="onDropdownSelectClicked($event)"
        (onModelValueChange)="current = $event; onModelValueChange($event)">
      </odcp-dropdown-select>
      ${valuePreview('current')}
    `
  })
};

export const ObjectValuesReactiveForm: Story = {
  name: 'Object values - reactive form preselected',
  render: (args) => {
    const formControl = new FormControl<any>({ name: 'France', iso: 'FR', eu: true }, [Validators.required]);
    return {
      props: {
        ...args,
        options: objectOptions,
        formControl
      },
      template: `
        <odcp-dropdown-select
          [label]="label"
          [options]="options"
          [control]="formControl"
          [disabled]="disabled"
          (onDropdownSelectClicked)="onDropdownSelectClicked($event)"
          (onModelValueChange)="onModelValueChange($event)">
        </odcp-dropdown-select>
        ${valuePreview('formControl.value')}
      `
    };
  }
};

export const ObjectValuesProgrammaticChange: Story = {
  name: 'Object values - set value programmatically',
  render: (args) => {
    const formControl = new FormControl<any>(null);
    return {
      props: {
        ...args,
        options: objectOptions,
        formControl,
        selectBrazil: () => formControl.setValue({ name: 'Brazil', eu: false, iso: 'BR' }),
        selectGermany: () => formControl.setValue({ eu: true, iso: 'DE', name: 'Germany' }),
        clear: () => formControl.setValue(null)
      },
      template: `
        <odcp-dropdown-select
          [label]="label"
          [options]="options"
          [control]="formControl"
          [disabled]="disabled"
          (onDropdownSelectClicked)="onDropdownSelectClicked($event)"
          (onModelValueChange)="onModelValueChange($event)">
        </odcp-dropdown-select>
        <div style="display: flex; gap: 8px;">
          <button type="button" (click)="selectGermany()">setValue(Germany object)</button>
          <button type="button" (click)="selectBrazil()">setValue(Brazil object)</button>
          <button type="button" (click)="clear()">setValue(null)</button>
        </div>
        ${valuePreview('formControl.value')}
      `
    };
  }
};

