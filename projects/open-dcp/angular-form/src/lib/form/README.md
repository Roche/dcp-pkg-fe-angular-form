# Form Components (`src/lib/form`)

Standalone form-layer components available from `@open-dcp/angular-form`.

## `CheckboxComponent` (`odcp-checkbox`)

```html
<odcp-checkbox [control]="form.controls.active">Active</odcp-checkbox>
```

## `SlideToggleComponent` (`odcp-slide-toggle`)

```html
<odcp-slide-toggle [control]="form.controls.public">Public</odcp-slide-toggle>
```

## `InputStringComponent` (`odcp-input-string`)

```html
<odcp-input-string label="Name" [control]="form.controls.name"></odcp-input-string>
```

Override the built-in validation namespace when needed:

```html
<odcp-input-string
  label="Name"
  [control]="form.controls.name"
  translationPrefix="MY_APP.VALIDATIONS">
</odcp-input-string>
```

## `InputNumberComponent` (`odcp-input-number`)

```html
<odcp-input-number label="Amount" [control]="form.controls.amount"></odcp-input-number>
```

## `SecretInputComponent` (`odcp-secret-input`)

```html
<odcp-secret-input label="Password" [control]="form.controls.password"></odcp-secret-input>
```

## `TextareaComponent` (`odcp-textarea`)

```html
<odcp-textarea label="Description" [control]="form.controls.description"></odcp-textarea>
```

## `DropdownSelectComponent` (`odcp-dropdown-select`)

```html
<odcp-dropdown-select [options]="options" [control]="form.controls.country"></odcp-dropdown-select>
```

## `MultiSelectComponent` (`odcp-multi-select`)

```html
<odcp-multi-select [options]="options" [control]="form.controls.tags"></odcp-multi-select>
```

## `FormValidationErrorComponent` (`odcp-form-validation-error`)

```html
<mat-error>
  <odcp-form-validation-error [control]="form.controls.name"></odcp-form-validation-error>
</mat-error>
```

By default the component registers and uses fallback messages from
`ODCP.FORM.VALIDATIONS` for:

- `required`
- `min`
- `max`
- `whitespace`
- `minlength` / `minLength`
- `maxlength` / `maxLength`

Use `translationPrefix` to point at your own translation catalog instead:

```html
<mat-error>
  <odcp-form-validation-error
    [control]="form.controls.name"
    translationPrefix="MY_APP.VALIDATIONS">
  </odcp-form-validation-error>
</mat-error>
```

