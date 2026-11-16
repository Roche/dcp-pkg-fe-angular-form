import {Injectable, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
import {
  DefaultValueModel,
  FieldDefaultValueSelectionEnum,
  FieldOptionModel,
  FieldTypeEnum,
  FormGeneratorElModel,
  GroupResult
} from "../form-generator.model";
import {AbstractControl, UntypedFormControl} from "@angular/forms";
import {debounceTime, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import * as _ from 'underscore';
import {ConditionsClass} from "./Conditions.class";
import { uiStore } from "@open-dcp/services";
import {DataLoadingWatcherService} from "./DataLoadingWatcher.service";
import {DcHttp} from "@open-dcp/angular-services";

export const LOADING_PREFIX = 'FormGeneratorDataLoading';

@Injectable()
export class DataLoaderClass extends ConditionsClass implements OnInit, OnDestroy, OnChanges {
  // DataUrl placeholder formats (${key}, ${./key}, ${../path}, ${$root.path}): see docs/dataurl-placeholders.md
  private cancel$ = new Subject<void>();

  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({ required: true }) override control!: UntypedFormControl | AbstractControl;

  groupedOptions: GroupResult[] | FieldOptionModel[] = [];
  fieldOptionsFromServer: FieldOptionModel[] = [];

  lastDataValue = {};

  /**
   * When true, object option values are serialized to JSON strings before rendering.
   * Needed only for components that cannot work with object values (e.g. free-text autocomplete).
   * `mat-select` based components keep the raw values and rely on `compareWith`.
   */
  protected stringifyOptionValues = false;

  get convertedFieldOptionsValues(): FieldOptionModel[] {
    if (this.formEl?.FieldOptions && this.formEl?.FieldOptions?.length > 0) {
      return this.formGeneratorService.convertedFieldOptionsValues(this.formEl.FieldOptions, this.stringifyOptionValues);
    }
    if (this.fieldOptionsFromServer.length > 0) {
      return this.formGeneratorService.convertedFieldOptionsValues(
        this.fieldOptionsFromServer as FieldOptionModel[],
        this.stringifyOptionValues
      );
    }
    return this.formGeneratorService.convertedFieldOptionsValues([], this.stringifyOptionValues);
  }

  /**
   * Deep-equal comparator for option values. Bind it to `mat-select [compareWith]`.
   */
  compareOptionValues = (a: any, b: any): boolean => this.formGeneratorService.compareOptionValues(a, b);

  constructor(
    public readonly httpClient: DcHttp,
    private readonly dataLoadingWatcher: DataLoadingWatcherService
  ) {
    super(httpClient);
  }

  override ngOnInit() {
    this.dataLoadingWatcher.registerLoader(this.formEl.Name);
    super.ngOnInit();
    this.loadData();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

  handleFilter(string: string) {
    if (!string) {
      this.setOptions([...this.convertedFieldOptionsValues]);
      return;
    }
    this.setOptions([
      ...this.convertedFieldOptionsValues.filter(el => el.Label?.toLowerCase().includes(string.toLowerCase()))
    ]);
  }


  private setOptions(values: FieldOptionModel[]) {
    this.groupedOptions = this.formGeneratorService.getGroupedFieldOptions(values, this.stringifyOptionValues);
  }

  private loadData() {
    if (this.formEl.FieldSettings?.DataUrl) {
      this.loadDataFromUrl();
      return;
    }

    this.setOptions([...this.convertedFieldOptionsValues]);
  }

  private valueIsEmpty(value: any) {
    return value == null ||
      (typeof value === 'string' && value.trim() === '') ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0);
  }

  private checkForDynamicEntries() {
    let value = this.control.value;
    const defaultValue = this.formEl.FieldSettings?.DefaultValue;
    if ((typeof defaultValue === 'string' && defaultValue?.startsWith('$DCP-')) ||
      (typeof value === 'string' && value.startsWith('$DCP-'))) {
      switch (defaultValue) {
        case FieldDefaultValueSelectionEnum.FirstOption:
          const selectedFirstValue = this.fieldOptionsFromServer[0]?.Value;
          if (this.formEl.FieldType === FieldTypeEnum.DropDown) {
            this.control.patchValue(selectedFirstValue, {emitEvent: true});
          } else {
            this.control.patchValue([selectedFirstValue], {emitEvent: true});
          }
          break;

        case FieldDefaultValueSelectionEnum.LastOption:
          const selectedLastValue = this.fieldOptionsFromServer[this.fieldOptionsFromServer.length - 1].Value;
          if (this.formEl.FieldType === FieldTypeEnum.DropDown) {
            this.control.patchValue(selectedLastValue, {emitEvent: true});
          } else {
            this.control.patchValue([selectedLastValue], {emitEvent: true});
          }
          break;

        case FieldDefaultValueSelectionEnum.AllOptions:
          this.control.patchValue(this.fieldOptionsFromServer.map(opt => opt.Value), {emitEvent: true});
          break;

        case FieldDefaultValueSelectionEnum.NoOptions:
          this.control.patchValue(null);
          break;

        default:
          this.control.patchValue(value);
          break;
      }
    }
    this.dataLoadingWatcher.dataLoaded(this.formEl.Name, this.control.value);
  }

  private getData(values: any) {
    const url = this.replaceUrlValues(values);
    this.cancel$.next();
    uiStore.setLoading(`${LOADING_PREFIX}${this.formEl.Name}`);
    this.formGeneratorService.getData(url)
    .pipe(takeUntil(this.cancel$))
    .subscribe({
      next: (res: FieldOptionModel[] | DefaultValueModel) => {
        if (Array.isArray(res)) {
          this.setOptions(res);
          this.removeNonExistingSelection(res);
          this.fieldOptionsFromServer = res;
          this.checkForDynamicEntries();
          uiStore.removeLoading(`${LOADING_PREFIX}${this.formEl.Name}`);

          return;
        }

        this.setDefaultValue((res as DefaultValueModel)?.DefaultValue);

        uiStore.removeLoading(`${LOADING_PREFIX}${this.formEl.Name}`);
      },
      error: () => {
        uiStore.removeLoading(`${LOADING_PREFIX}${this.formEl.Name}`);
      },
    });
  }

  private removeNonExistingSelection(res: FieldOptionModel[]) {
    const value = this.control.value;
    if (value === null || (typeof value === 'string' && value?.startsWith('$DCP-'))) {
      return;
    }
    if (Array.isArray(value)) {
      const filtered = res.filter(el => value.some(selected => this.optionValueMatches(el.Value, selected)));
      this.control.patchValue(filtered.map(el => el.Value), {emitEvent: true});
    } else {
      const filtered = res.filter(el => this.optionValueMatches(el.Value, value));
      this.control.patchValue(filtered[0]?.Value ?? null, {emitEvent: true});
    }
  }

  /**
   * Objects are compared by content; primitives are compared loosely by their string
   * representation (keeps backward compatibility for e.g. `1` vs `'1'`).
   */
  private optionValueMatches(optionValue: any, selected: any): boolean {
    if ((optionValue !== null && typeof optionValue === 'object') || (selected !== null && typeof selected === 'object')) {
      // Selected value may still be a serialized (JSON string) object, e.g. from previously stored form data
      if (optionValue !== null && typeof optionValue === 'object' && typeof selected === 'string') {
        selected = this.formGeneratorService.parseDropdownValue(selected);
      }
      return this.formGeneratorService.compareOptionValues(optionValue, selected);
    }
    if (optionValue === null || optionValue === undefined || selected === null || selected === undefined) {
      return optionValue === selected;
    }
    return String(optionValue) === String(selected);
  }

  private replaceUrlValues(values: any) {
    let result = this.formEl.FieldSettings?.DataUrl || '';
    Object.keys(values).forEach(key => {
      let value = values[key];

      if (typeof value === 'object' && value !== null) {
        value = JSON.stringify(value);
      }

      if (value === null || value === undefined) {
        value = '';
      }

      result = result.split('${' + key + '}').join(value);
    });
    return result;
  }

  private getDataUrlKeys() {
    const found = [];          // an array to collect the strings that are found
    const rxp = /\${([^}]+)}/g;
    const str = this.formEl.FieldSettings?.DataUrl || '';
    let curMatch;

    while( curMatch = rxp.exec( str ) ) {
      found.push(curMatch[1].trim());
    }

    return found;
  }

  private getFormValue(control: AbstractControl | null | undefined) {
    const valueFromGetRaw = (control as any)?.getRawValue?.();
    return valueFromGetRaw ?? control?.value ?? {};
  }

  private getPathValue(source: any, path: string[]) {
    let current = source;
    for (const segment of path) {
      if (!current || typeof current !== 'object' || !Object.prototype.hasOwnProperty.call(current, segment)) {
        return undefined;
      }
      current = current[segment];
    }
    return current;
  }

  private getControlPath(): string[] {
    const segments: string[] = [];
    let current: AbstractControl | null = this.control;

    while (current?.parent) {
      const parent = current.parent as any;

      if (parent?.controls && !Array.isArray(parent.controls)) {
        const key = Object.keys(parent.controls).find(controlKey => parent.controls[controlKey] === current);
        if (key) {
          segments.unshift(key);
        }
      } else if (Array.isArray(parent?.controls)) {
        const index = parent.controls.findIndex((child: AbstractControl) => child === current);
        if (index >= 0) {
          segments.unshift(`${index}`);
        }
      }

      current = parent;
    }

    return segments;
  }

  private resolveRelativePath(relativeKey: string, rootValue: any) {
    const currentPath = this.getControlPath();
    const withoutCurrentControl = currentPath.slice(0, Math.max(0, currentPath.length - 1));

    let upLevels = 0;
    let pathKey = relativeKey;

    if (pathKey.startsWith('./')) {
      pathKey = pathKey.slice(2);
    }

    while (pathKey.startsWith('../')) {
      upLevels += 1;
      pathKey = pathKey.slice(3);
    }

    const basePath = withoutCurrentControl.slice(0, Math.max(0, withoutCurrentControl.length - upLevels));
    const tailPath = pathKey.split('.').filter(Boolean);
    const fullPath = [...basePath, ...tailPath];

    return {
      value: this.getPathValue(rootValue, fullPath),
      dependencyKey: fullPath[fullPath.length - 1] || null,
    };
  }

  private findValueDeep(source: any, key: string): any {
    if (!source || typeof source !== 'object') {
      return undefined;
    }

    if (Object.prototype.hasOwnProperty.call(source, key)) {
      return source[key];
    }

    for (const nested of Object.values(source)) {
      if (nested && typeof nested === 'object') {
        const found = this.findValueDeep(nested, key);
        if (found !== undefined) {
          return found;
        }
      }
    }

    return undefined;
  }

  private resolveDataKeyValue(key: string, parentValue: any, rootValue: any) {
    if (key.startsWith('$root.')) {
      const path = key.replace('$root.', '').split('.').filter(Boolean);
      return {
        value: this.getPathValue(rootValue, path),
        dependencyKey: path[path.length - 1] || null,
      };
    }

    if (key.startsWith('./') || key.startsWith('../')) {
      return this.resolveRelativePath(key, rootValue);
    }

    if (parentValue && Object.prototype.hasOwnProperty.call(parentValue, key)) {
      return {
        value: parentValue[key],
        dependencyKey: key,
      };
    }
    if (rootValue && Object.prototype.hasOwnProperty.call(rootValue, key)) {
      return {
        value: rootValue[key],
        dependencyKey: key,
      };
    }
    return {
      value: this.findValueDeep(rootValue, key),
      dependencyKey: key,
    };
  }

  private checkForDataValue(firstTime = false) {
    const dataKeys = this.getDataUrlKeys();
    const parentValue = this.getFormValue(this.control.parent);
    const rootValue = this.getFormValue(this.control.root);
    const dependencyKeys: string[] = [];
    let values = {};

    dataKeys.forEach(key => {
      const resolved = this.resolveDataKeyValue(key, parentValue, rootValue);
      values = {
        ...values,
        [key]: resolved.value
      };
      if (resolved.dependencyKey) {
        dependencyKeys.push(resolved.dependencyKey);
      }
    });

    if (!firstTime && _.isEqual(values, this.lastDataValue)) {
      return;
    }

    const parameterLoading = Object.keys(uiStore.getState().loading).filter(key => key.startsWith(LOADING_PREFIX)).map(key => key.replace(LOADING_PREFIX, ''));

    if (dataKeys.length > 0 && parameterLoading.some(el => dependencyKeys.includes(el))) {
      const keys = parameterLoading.filter(el => dependencyKeys.includes(el));
      if (this.dataLoadingWatcher.watcherExist(this.formEl.Name, keys)) {
        return;
      }
      this.dataLoadingWatcher.createWatcher(this.formEl.Name, keys, () => {
        this.checkForDataValue();
      });
      return;
    }

    this.lastDataValue = structuredClone(values);

    if (Object.values(values).some(el => this.valueIsEmpty(el))) {
      const controlValue = this.control.value;
      const hasDcpPlaceholder =
        (typeof controlValue === "string" && controlValue.includes("$DCP-")) ||
        (Array.isArray(controlValue) && controlValue.some(item => typeof item === "string" && item.includes("$DCP-")));

      if (!hasDcpPlaceholder) {
        this.control.reset();
      }
      this.groupedOptions = [];
      return;
    }

    if (Object.values(values).some((el: any) => {
      if (typeof el === "string" && el.includes("$DCP-")) {
         return true;
      }

      if (Array.isArray(el) && (el.length == 0 || el.some(item => typeof item === "string" && item.includes("$DCP-")))) {
        return true;
      }

      return false;
    })) {
      return;
    }

    this.getData(values);
  }

  private loadDataFromUrl() {
    this.checkForDataValue(true);
    const parameterCount = this.getDataUrlKeys().length ?? 1;
    const valueChanges$ = this.control.root?.valueChanges ?? this.control.parent?.valueChanges;
    valueChanges$?.pipe(takeUntil(this.onDestroy$), debounceTime(parameterCount * 10)).subscribe(() => {
      this.checkForDataValue();
    });
  }

  private setDefaultValue(value: any) {
    const offset = Object.keys(this.control?.parent?.value || {})?.findIndex(key => key === this.formEl.Name) || 0;
    setTimeout(() => {
      this.formEl = {
        ...this.formEl,
        FieldSettings: {
          ...this.formEl.FieldSettings,
          DefaultValue: value
        }
      };
      this.control.patchValue(value);
    }, offset * 50);
  }
}
