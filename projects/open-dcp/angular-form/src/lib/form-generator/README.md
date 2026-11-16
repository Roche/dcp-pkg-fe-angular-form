# Form Generator Extension Guide

This guide shows how a consumer app can:
- add new field types (for example, `100+`),
- override existing built-in field renderers.

## 1) Define app-specific field types

```typescript
// app/form/types.ts
export enum AppFieldTypeEnum {
  RichText = 100
}
```

## 2) Create app field components

Custom renderer components should accept the same inputs used by the generator:
- `formEl`
- `control`
- `parentIsVisible`
- `fieldComponentOverrides` (optional passthrough)

```typescript
import {Component, Input} from '@angular/core';
import {AbstractControl, UntypedFormControl} from '@angular/forms';
import {
  FormGeneratorElModel,
  FormGeneratorFieldComponentConfig
} from '@open-dcp/angular-form';

@Component({
  selector: 'app-rich-text-field',
  standalone: true,
  template: '<textarea [formControl]="formControl"></textarea>'
})
export class AppRichTextFieldComponent {
  @Input({required: true}) formEl!: FormGeneratorElModel;
  @Input({required: true}) control!: UntypedFormControl | AbstractControl;
  @Input() parentIsVisible: boolean = true;
  @Input() fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = [];

  get formControl(): UntypedFormControl {
    return this.control as UntypedFormControl;
  }
}
```

## 3) Register globally (provider-based)

Use provider registration to apply extensions application-wide.

```typescript
import {ApplicationConfig} from '@angular/core';
import {
  FieldTypeEnum,
  provideFormGeneratorFields
} from '@open-dcp/angular-form';
import {AppFieldTypeEnum} from './form/types';
import {AppRichTextFieldComponent} from './form/app-rich-text-field.component';
import {AppStringFieldComponent} from './form/app-string-field.component';

export const appConfig: ApplicationConfig = {
  providers: [
    ...provideFormGeneratorFields([
      {type: AppFieldTypeEnum.RichText, component: AppRichTextFieldComponent},
      {type: FieldTypeEnum.String, component: AppStringFieldComponent}
    ])
  ]
};
```

## 4) Override locally (instance-based)

Use `fieldComponentOverrides` when a single page needs custom rendering.

```typescript
import {FieldTypeEnum, FormGeneratorFieldComponentConfig} from '@open-dcp/angular-form';

fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = [
  {type: FieldTypeEnum.String, component: AppStringFieldComponent}
];
```

```html
<odcp-form-generator
  [form]="form"
  [formGeneratorSettings]="settings"
  [fieldComponentOverrides]="fieldComponentOverrides">
</odcp-form-generator>
```

## Resolution precedence

Field component resolution uses this order:
1. library built-ins,
2. app provider registrations,
3. per-instance `fieldComponentOverrides`.

The last matching registration wins.

