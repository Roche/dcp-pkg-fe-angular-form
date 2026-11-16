import {Injectable, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
import {FormGeneratorElModel, TableColumnModel, TableModel, TableRowModel} from "../form-generator.model";
import {AbstractControl, UntypedFormControl} from "@angular/forms";
import {debounceTime, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import * as _ from 'underscore';
import {ConditionsClass} from "./Conditions.class";
import { uiStore } from "@open-dcp/services";
import {DataLoadingWatcherService} from "./DataLoadingWatcher.service";
import { MatTableDataSource } from "@angular/material/table";
import { DcHttp } from "@open-dcp/angular-services";

export const LOADING_PREFIX = 'FormGeneratorDataLoading';

@Injectable()
export class TableDataLoaderClass extends ConditionsClass implements OnInit, OnDestroy, OnChanges {
  // DataUrl placeholder formats (${key}, ${./key}, ${../path}, ${$root.path}): see docs/dataurl-placeholders.md
  private cancel$ = new Subject<void>();

  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({ required: true }) override control!: UntypedFormControl | AbstractControl;

  tableFromServer: TableModel | null  = null;

  columns: TableColumnModel[] = [];
  visibleColumnKeys: string[] = [];

  dataSource = new MatTableDataSource<TableRowModel>([]);

  lastDataValue = {};

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


  private loadData() {
    // First, try to load data from the form control's value (set by DefaultValue)
    if (this.loadDataFromControlValue()) {
      return;
    }

    // If not found in control value, fallback to DataUrl
    if (this.formEl.FieldSettings?.DataUrl) {
      this.loadDataFromUrl();
      return;
    }
  }

  private loadDataFromControlValue(): boolean {
    // Check if the control already has table data in its value
    // Use getRawValue() to get value even if control is disabled (read-only)
    const controlValue = (this.control as any).getRawValue?.() ?? this.control.value;

    // Verify it's a valid table structure
    if (controlValue && typeof controlValue === 'object' && 'Columns' in controlValue) {
      this.setTableData(controlValue);
      return true;
    }

    return false;
  }

  private setTableData(tableData: any) {
    const columns = tableData.Columns ?? [];
    this.columns = columns.filter((column: any) => column.IsVisible);
    this.visibleColumnKeys = this.columns.map((column: any) => column.Key);
    this.dataSource.data = tableData.Rows ?? [];
    this.tableFromServer = tableData;
  }

  private getData(values: any) {
    const url = this.replaceUrlValues(values);
    this.cancel$.next();
    uiStore.setLoading(`${LOADING_PREFIX}${this.formEl.Name}`);
    this.formGeneratorService.getTableData(url)
    .pipe(takeUntil(this.cancel$))
    .subscribe({
      next: (table) => {
        this.tableFromServer = table;
        const columns = table.Columns ?? [];
        this.columns = columns.filter(column => column.IsVisible);
        this.visibleColumnKeys = this.columns.map((column) => column.Key);
        this.dataSource.data = table.Rows ?? [];
        uiStore.removeLoading(`${LOADING_PREFIX}${this.formEl.Name}`);
      },
      error: (err) => {
        uiStore.removeLoading(`${LOADING_PREFIX}${this.formEl.Name}`);
      },
    });
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

  private valueIsEmpty(value: any) {
    return value == null ||
      (typeof value === 'string' && value.trim() === '') ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0);
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
}
