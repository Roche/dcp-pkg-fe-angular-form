import {InjectionToken, Provider, Type} from "@angular/core";
import {FormGeneratorFieldType} from "./form-generator.model";

export interface FormGeneratorFieldComponentConfig {
  type: FormGeneratorFieldType;
  component: Type<any>;
}

export const FORM_GENERATOR_FIELD_COMPONENTS = new InjectionToken<FormGeneratorFieldComponentConfig[]>(
  'FORM_GENERATOR_FIELD_COMPONENTS'
);

export function provideFormGeneratorFields(fields: FormGeneratorFieldComponentConfig[]): Provider[] {
  return fields.map(field => ({
    provide: FORM_GENERATOR_FIELD_COMPONENTS,
    multi: true,
    useValue: field
  }));
}

export function createFormGeneratorFieldComponentMap(
  builtInFields: FormGeneratorFieldComponentConfig[],
  registeredFields: FormGeneratorFieldComponentConfig[] = [],
  fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = []
): Map<FormGeneratorFieldType, Type<any>> {
  const fieldComponents = new Map<FormGeneratorFieldType, Type<any>>();

  [...builtInFields, ...registeredFields, ...fieldComponentOverrides].forEach(({type, component}) => {
    fieldComponents.set(type, component);
  });

  return fieldComponents;
}

export function resolveFormGeneratorFieldComponent(
  fieldType: FormGeneratorFieldType,
  builtInFields: FormGeneratorFieldComponentConfig[],
  registeredFields: FormGeneratorFieldComponentConfig[] = [],
  fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = []
): Type<any> | null {
  return createFormGeneratorFieldComponentMap(
    builtInFields,
    registeredFields,
    fieldComponentOverrides
  ).get(fieldType) || null;
}


