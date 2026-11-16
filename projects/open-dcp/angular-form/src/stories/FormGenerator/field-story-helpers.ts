import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { delay, http, HttpResponse } from 'msw';
import { FormGeneratorComponent } from '../../lib/form-generator/form-generator/form-generator.component';
import {
  FieldOptionModel,
  FieldTypeEnum,
  FormGeneratorElModel,
  FormGeneratorValidationEnum,
  IFieldValidation
} from '../../lib/form-generator/form-generator.model';
import {FormGeneratorFieldComponentConfig} from '../../lib/form-generator/form-generator.tokens';

export type FieldStoryArgs = {
  formGeneratorSettings: FormGeneratorElModel[];
  allowMultiSelect?: boolean;
  fieldComponentOverrides?: FormGeneratorFieldComponentConfig[];
};

export type FieldStory = StoryObj<FormGeneratorComponent & FieldStoryArgs>;

export const renderWithExternalForm = (args: FieldStoryArgs) => {
  const inputForm = new UntypedFormGroup({});

  return {
    props: {
      allowMultiSelect: false,
      fieldComponentOverrides: [],
      ...args,
      inputForm
    },
    template: `
      <div style="width: 100%; display: flex; align-items: flex-start; gap: 32px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 320px;">
          <odcp-form-generator
            elementsClass="full-width"
            [form]="inputForm"
            [formGeneratorSettings]="formGeneratorSettings"
            [fieldComponentOverrides]="fieldComponentOverrides"
            [allowMultiSelect]="allowMultiSelect">
          </odcp-form-generator>
        </div>
        <div style="flex: 1; min-width: 320px;">
          <h4 style="margin: 0 0 8px 0; font-family: monospace;">inputForm.value:</h4>
          <pre style="background: #f4f4f4; padding: 16px; border-radius: 4px; overflow: auto; font-size: 12px;">{{ inputForm.value | json }}</pre>
        </div>
      </div>
    `
  };
};

export const formGeneratorFieldDecorators = [
  moduleMetadata({
    imports: [
      ReactiveFormsModule,
      TranslateModule.forRoot({ defaultLanguage: 'en' }),
      HttpClientModule,
      CommonModule
    ]
  })
];

export const defaultFieldStoryArgs: FieldStoryArgs = {
  formGeneratorSettings: [],
  allowMultiSelect: false,
  fieldComponentOverrides: []
};

export const createField = (
  overrides: Partial<FormGeneratorElModel> & Pick<FormGeneratorElModel, 'Name' | 'Label' | 'FieldType'>
): FormGeneratorElModel => ({
  Name: overrides.Name,
  Label: overrides.Label,
  FieldType: overrides.FieldType,
  Description: overrides.Description ?? null,
  FieldValidations: overrides.FieldValidations ?? [],
  FieldOptions: overrides.FieldOptions ?? [],
  Children: overrides.Children ?? [],
  FieldSettings: overrides.FieldSettings ?? {
    DefaultValue: null,
    StepSize: 0,
    DataUrl: null,
    IsRepeatable: false,
    IsReadOnly: false
  },
  ConditionGroups: overrides.ConditionGroups ?? [],
  allowMultiSelect: overrides.allowMultiSelect
});

export const requiredValidation = (): IFieldValidation => ({
  Type: FormGeneratorValidationEnum.Required,
  Value: ''
});

export const validation = (type: FormGeneratorValidationEnum, value: any): IFieldValidation => ({
  Type: type,
  Value: value
});

export const option = (Label: string, Value: any, Category: string | null = null): FieldOptionModel => ({
  Label,
  Value,
  Category
});

export const createDynamicDataParameters = (): Meta<FormGeneratorComponent & FieldStoryArgs>['parameters'] => ({
  msw: {
    handlers: [
      http.get('https://demo.dev/tph/cqa/options/meta-data', async ({ request }) => {
        await delay(600);
        const url = new URL(request.url);
        const valuePropertyName = url.searchParams.get('valuePropertyName');

        switch (valuePropertyName) {
          case 'Platform': {
            const type = url.searchParams.get('filters[0].StringValue');
            return HttpResponse.json([
              option(`Platform ${type} 1`, `platform-${type}-1`),
              option(`Platform ${type} 2`, `platform-${type}-2`)
            ]);
          }
          case 'Device': {
            const type = url.searchParams.get('filters[0].StringValue');
            const platform = url.searchParams.get('filters[1].StringValue');
            return HttpResponse.json([
              option(`Device ${type} ${platform} 1`, `device-${type}-${platform}-1`),
              option(`Device ${type} ${platform} 2`, `device-${type}-${platform}-2`)
            ]);
          }
          default:
            return HttpResponse.json([]);
        }
      })
    ]
  }
});

export const simpleTextField = (name: string, label: string, defaultValue: string | null = null) =>
  createField({
    Name: name,
    Label: label,
    FieldType: FieldTypeEnum.String,
    FieldValidations: [requiredValidation()],
    FieldSettings: {
      DefaultValue: defaultValue,
      StepSize: 0,
      DataUrl: null,
      IsRepeatable: false,
      IsReadOnly: false
    }
  });

