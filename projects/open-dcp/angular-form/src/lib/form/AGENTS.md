# AGENTS.md - `src/lib/form`

## Scope

This guide applies to files under `projects/open-dcp/angular-form/src/lib/form/`.

Use this section for standalone form controls that are consumed directly in templates, for example:
- `odcp-input-string`
- `odcp-input-number`
- `odcp-secret-input`
- `odcp-textarea`
- `odcp-checkbox`
- `odcp-slide-toggle`
- `odcp-dropdown-select`
- `odcp-multi-select`
- `odcp-form-validation-error`

## Purpose

These components are thin Angular Material wrappers around a provided `FormControl`.

They should:
- render a single field concern,
- keep behavior predictable and composable,
- emit value and interaction changes when required,
- keep validation display delegated to `FormValidationErrorComponent`.

## Input/Output Contract

- Prefer `@Input() control` as the source of truth.
- Treat `modelValue` as initialization or sync input, not independent state.
- Avoid duplicating field state in local variables unless required for UI-only behavior.
- Keep `@Output()` events focused and stable (`onModelValueChange`, click and selection outputs).

## Implementation Rules

1. Keep components standalone and explicit with Angular Material imports.
2. Do not mutate incoming `options` arrays; derive filtered and grouped collections.
3. Keep clear and reset behavior explicit (for example stop propagation on clear icon click).
4. Preserve strict null handling (`null` means no selection, not empty string).
5. Use typed helpers for union data where templates branch (for example group vs option objects).

## Validation and Errors

- Use Angular validators on the provided control.
- Render errors through `odcp-form-validation-error` inside `mat-error`.
- Forward a `translationPrefix` input from wrapper components to `odcp-form-validation-error` so consumers can override the validation namespace.
- Default built-in validation messages live under `ODCP.FORM.VALIDATIONS`.
- Respect required state from `control.hasValidator(Validators.required)` where relevant.

## RxJS and Lifecycle

All subscriptions must be cleaned up.

Preferred pattern in this folder:
- extend `OnDestroySubject` from `@open-dcp/angular-services`,
- pipe streams with `takeUntil(this.onDestroy$)`,
- `override ngOnDestroy()` and call `super.ngOnDestroy()`.

## UX Consistency

- Keep labels, placeholders, and aria labels configurable through inputs.
- Keep filtering behavior case-insensitive and whitespace-tolerant.
- Reset temporary filter UI state when select overlays close.

## Testing Focus

When behavior changes, add or update tests for:
- value propagation to outputs,
- required and clear interactions,
- filtering and grouped option rendering,
- disabled-state behavior and control sync.

## References

- Local usage examples: `projects/open-dcp/angular-form/src/lib/form/README.md`
- Public exports: `projects/open-dcp/angular-form/src/form.ts`
- Shared option model: `projects/open-dcp/angular-form/src/lib/form-generator/form-generator.model.ts`

