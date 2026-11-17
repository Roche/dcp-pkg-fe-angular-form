# DataUrl Placeholder Resolution

This document describes how `DataUrl` placeholders are resolved in the form generator loaders.

Applies to:
- `projects/open-dcp/angular-form/src/lib/form-generator/helpers/DataLoader.class.ts`

## Supported Placeholder Standards

All placeholders use `${...}` and can be mixed in a single `DataUrl`.

### 1) Flat key (backward compatible)

```text
${complaint_health_e2e|178}
```

- Current standard used by existing projects.
- Resolver behavior:
  1. looks in current parent group,
  2. then in root form object,
  3. then deep-searches nested objects by key.

### 2) Relative key (`./`)

```text
${./commercial_deviations_health_e2e|189}
```

- Relative to the current control key space.
- Behaves as an alias of flat key lookup (`${./key}` equals `${key}`).

### 3) Relative traversal (`../`)

```text
${../commercial_deviations_group_e2e|187.commercial_deviations_health_e2e|189}
${../../../global_target|99}
```

- `../` goes one level up from the current control context.
- You can chain it (`../../`, `../../../`, ...).

### 4) Root path (`$root.`)

```text
${$root.complaints_group_e2e|170.complaint_health_e2e|178}
```

- Path starts from the root form object.
- Use this when the field can be outside the current group.

## Minimal Mixed Example

```text
/tph/assessment/form/result/aggregated?flat=${complaint_health_e2e|178}&relativeLocal=${./local_health|1}&relativeParentSibling=${../commercial_deviations_group_e2e|187.commercial_deviations_health_e2e|189}&root=${$root.assessment_root|1.complaints_group_e2e|170.complaint_health_e2e|178}
```

## Resolution Notes

- Placeholder keys are trimmed before resolution.
- Missing/null/undefined values are converted to empty string in final URL substitution.
- Data loading listens to root form changes, so cross-group dependencies can trigger refresh.
- For new configurations, prefer `$root.` paths when names may repeat across groups.

## Tests

Behavior is covered by:
- `projects/open-dcp/angular-form/src/lib/form-generator/helpers/DataUrlPlaceholders.spec.ts`

