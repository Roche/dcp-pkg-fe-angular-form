# AGENTS.md - `src/lib/form-generator`

## Scope

This guide applies to files under `projects/open-dcp/angular-form/src/lib/form-generator/`.

It covers:
- `form-generator/form-generator.component.ts`
- `dc-form-generator.service.ts`
- `form-generator.model.ts`
- field components under `dc-*/`
- helper classes under `helpers/`

## Purpose

This section implements schema-driven dynamic forms from `FormGeneratorElModel[]`.

Core responsibilities:
- generate Angular controls from schema,
- render the matching field component for each `FieldTypeEnum`,
- synchronize generated form values to consumer forms,
- evaluate conditions and dynamic data loading.

## Critical Contracts

- Keep `FormGeneratorElModel`, `FieldTypeEnum`, and validation enums backward compatible.
- Keep `ODCPFormGeneratorService.getFieldComponent` mappings in sync with supported field types.
- Preserve form synchronization behavior between `formCopy` and external `form` in `FormGeneratorComponent`.
- Keep dropdown value conversion rules stable (object <-> JSON string where required).

## Form Generation Rules

1. Add new field types by updating model enum, service mapping, and UI component support together.
2. When adding validators, handle both control-level and group-level use cases.
3. Keep group and array recursion safe for validator and disabled-state synchronization.
4. Avoid mutating incoming consumer data unless explicitly part of current behavior.

## Conditions and Data Loading

- `ConditionsClass` controls show/hide and validation enable/disable behavior.
- `DataLoaderClass` resolves dynamic `DataUrl` values and coordinates loading state via `uiStore`.
- Keep watchers cancellable and teardown-safe (`takeUntil`, cancellation subjects, destroy hooks).
- Preserve `$DCP-*` default-value semantics (`$DCP-first`, `$DCP-last`, `$DCP-all`, `$DCP-none`).

## Lifecycle and Subscriptions

- Prefer `OnDestroySubject` for component and helper lifecycle management.
- If using `Subscription` aggregates (for example in `FormGeneratorComponent`), always unsubscribe on destroy.
- Do not introduce bare subscriptions without cleanup.

## Testing Focus

When behavior changes, prioritize tests for:
- form synchronization (`formCopy` <-> `form`),
- dynamic visibility and conditional validation,
- dynamic option loading and non-existing selection cleanup,
- custom validator behavior, especially sibling min/max rules,
- recursive group and array control generation.

## References

- Generator component: `projects/open-dcp/angular-form/src/lib/form-generator/form-generator/form-generator.component.ts`
- Generator service: `projects/open-dcp/angular-form/src/lib/form-generator/dc-form-generator.service.ts`
- Models: `projects/open-dcp/angular-form/src/lib/form-generator/form-generator.model.ts`
- Base helper class: `projects/open-dcp/angular-form/src/lib/form-generator/helpers/form-generator-base.class.ts`

