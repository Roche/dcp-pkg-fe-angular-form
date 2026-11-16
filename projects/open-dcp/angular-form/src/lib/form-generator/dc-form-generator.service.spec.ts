import {FieldTypeEnum} from './form-generator.model';
import {
  createFormGeneratorFieldComponentMap,
  FORM_GENERATOR_FIELD_COMPONENTS,
  FormGeneratorFieldComponentConfig,
  provideFormGeneratorFields,
  resolveFormGeneratorFieldComponent
} from './form-generator.tokens';

class BuiltInStringFieldComponent {}
class BuiltInDropdownFieldComponent {}
class CustomAppFieldComponent {}
class ProviderOverrideFieldComponent {}
class InstanceOverrideFieldComponent {}

describe('form-generator field registry helpers', () => {
  const builtIns: FormGeneratorFieldComponentConfig[] = [
    {type: FieldTypeEnum.String, component: BuiltInStringFieldComponent},
    {type: FieldTypeEnum.DropDown, component: BuiltInDropdownFieldComponent}
  ];

  it('keeps built-in mappings when there are no app overrides', () => {
    expect(resolveFormGeneratorFieldComponent(FieldTypeEnum.String, builtIns)).toBe(BuiltInStringFieldComponent);
  });

  it('adds app-specific field types outside the built-in range', () => {
    expect(
      resolveFormGeneratorFieldComponent(100, builtIns, [
        {type: 100, component: CustomAppFieldComponent}
      ])
    ).toBe(CustomAppFieldComponent);
  });

  it('allows app registrations to replace built-in renderers', () => {
    expect(
      resolveFormGeneratorFieldComponent(FieldTypeEnum.String, builtIns, [
        {type: FieldTypeEnum.String, component: ProviderOverrideFieldComponent}
      ])
    ).toBe(ProviderOverrideFieldComponent);
  });

  it('prefers per-instance overrides over provider-level registrations', () => {
    expect(
      resolveFormGeneratorFieldComponent(FieldTypeEnum.String, builtIns, [
        {type: FieldTypeEnum.String, component: ProviderOverrideFieldComponent}
      ], [
        {type: FieldTypeEnum.String, component: InstanceOverrideFieldComponent}
      ])
    ).toBe(InstanceOverrideFieldComponent);
  });

  it('returns null for unknown field types before the service fallback is applied', () => {
    expect(resolveFormGeneratorFieldComponent(999, builtIns)).toBeNull();
  });

  it('builds a merged map with last registration wins precedence', () => {
    const fieldMap = createFormGeneratorFieldComponentMap(
      builtIns,
      [
        {type: 100, component: CustomAppFieldComponent},
        {type: FieldTypeEnum.String, component: ProviderOverrideFieldComponent}
      ],
      [
        {type: FieldTypeEnum.String, component: InstanceOverrideFieldComponent}
      ]
    );

    expect(fieldMap.get(100)).toBe(CustomAppFieldComponent);
    expect(fieldMap.get(FieldTypeEnum.String)).toBe(InstanceOverrideFieldComponent);
    expect(fieldMap.get(FieldTypeEnum.DropDown)).toBe(BuiltInDropdownFieldComponent);
  });

  it('creates multi providers that apps can spread into Angular providers arrays', () => {
    expect(
      provideFormGeneratorFields([
        {type: 100, component: CustomAppFieldComponent},
        {type: FieldTypeEnum.String, component: ProviderOverrideFieldComponent}
      ])
    ).toEqual([
      {
        provide: FORM_GENERATOR_FIELD_COMPONENTS,
        multi: true,
        useValue: {type: 100, component: CustomAppFieldComponent}
      },
      {
        provide: FORM_GENERATOR_FIELD_COMPONENTS,
        multi: true,
        useValue: {type: FieldTypeEnum.String, component: ProviderOverrideFieldComponent}
      }
    ]);
  });
});



