import {
  FormGeneratorFieldType,
  FieldOptionModel,
  FieldTypeEnum,
  FormGeneratorElModel,
  FormGeneratorValidationEnum,
  GroupResult,
  TableModel,
  DefaultValueModel
} from "./form-generator.model";
import {inject, Injectable, Type} from "@angular/core";
import * as _ from 'underscore';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {
  MaxPrecisionValidator,
  MinPrecisionValidator,
  RemainderValidator, siblingMaxValidator, siblingMinValidator,
  TrimmedValidator
} from "./helpers/custom-validators";
import {Observable} from "rxjs";
import {DcDateTimeComponent} from "./dc-date-time/dc-date-time.component";
import {NonExistingFieldComponent} from "./non-existing-field/non-existing-field.component";
import {DcMultiselectComponent} from "./dc-multiselect/dc-multiselect.component";
import {DcArrayComponent} from "./dc-array/dc-array.component";
import {DcGroupComponent} from "./dc-group/dc-group.component";
import {DcNumericInputComponent} from "./dc-numeric-input/dc-numeric-input.component";
import {DcDropDownComponent} from "./dc-drop-down/dc-drop-down.component";
import {DcStringInputComponent} from "./dc-string-input/dc-string-input.component";
import {DcPrecisionNumberComponent} from "./dc-precision-number/dc-precision-number.component";
import {DcMultistringInputComponent} from "./dc-multistring-input/dc-multistring-input.component";
import {DcFormGeneratorDescriptionComponent} from "./dc-fg-description/dc-form-generator-description.component";
import {DcCheckboxComponent} from "./dc-checkbox/dc-checkbox.component";
import {DcTextareaComponent} from "./dc-textarea/dc-textarea.component";
import { DcTimeRangeComponent } from "./dc-time-range/dc-time-range.component";
import {MinLengthArrayValidator} from "../validators/minLengthArray.validator";
import {DcExtendableDropDownComponent} from "./dc-extendable-drop-down/dc-extendable-drop-down.component";
import {DcSecretInputComponent} from "./dc-secret-input/dc-secret-input.component";
import {DcHttp} from "@open-dcp/angular-services";
import {
  FORM_GENERATOR_FIELD_COMPONENTS,
  FormGeneratorFieldComponentConfig,
  resolveFormGeneratorFieldComponent
} from "./form-generator.tokens";
import { DcFormGeneratorTextComponent } from "./dc-fg-text/dc-form-generator-text.component";

@Injectable({providedIn: 'root'})
export class ODCPFormGeneratorService {
  private readonly registeredFieldComponents = inject(FORM_GENERATOR_FIELD_COMPONENTS, {optional: true}) || [];

  private readonly builtInFieldComponents: FormGeneratorFieldComponentConfig[] = [
    {type: FieldTypeEnum.DateTime, component: DcDateTimeComponent},
    {type: FieldTypeEnum.MultiSelectDropdown, component: DcMultiselectComponent},
    {type: FieldTypeEnum.Array, component: DcArrayComponent},
    {type: FieldTypeEnum.Group, component: DcGroupComponent},
    {type: FieldTypeEnum.Number, component: DcNumericInputComponent},
    {type: FieldTypeEnum.DropDown, component: DcDropDownComponent},
    {type: FieldTypeEnum.String, component: DcStringInputComponent},
    {type: FieldTypeEnum.NumberWithPrecision, component: DcPrecisionNumberComponent},
    {type: FieldTypeEnum.MultiStringInput, component: DcMultistringInputComponent},
    {type: FieldTypeEnum.Description, component: DcFormGeneratorDescriptionComponent},
    {type: FieldTypeEnum.Checkbox, component: DcCheckboxComponent},
    {type: FieldTypeEnum.TextArea, component: DcTextareaComponent},
    {type: FieldTypeEnum.TimeRange, component: DcTimeRangeComponent},
    {type: FieldTypeEnum.ExtendableDropDown, component: DcExtendableDropDownComponent},
    {type: FieldTypeEnum.Secret, component: DcSecretInputComponent},
    {type: FieldTypeEnum.Text, component: DcFormGeneratorTextComponent}
  ];

  constructor(
    private readonly http: DcHttp
  ) {}

  addGroupEl(el: FormGeneratorElModel, form: UntypedFormGroup, defaultValues: any = {}) {
    if (el.FieldType === FieldTypeEnum.Description) {
      return;
    }
    form.addControl(el.Name, this.generateField(el, defaultValues, form));
  }
  private generateField(el: FormGeneratorElModel, defaultValues: any = {}, form: UntypedFormGroup): AbstractControl {
    const dv = el.FieldSettings?.DefaultValue;
    const hasDefaultValue = defaultValues && Object.prototype.hasOwnProperty.call(defaultValues, el.Name);
    const value = this.generateValue(
      el,
      hasDefaultValue ? defaultValues[el.Name]
        : (dv !== null ? dv : null)
    );
    const validators: ValidatorFn[] = [];

    if (el.FieldValidations) {
      el.FieldValidations.forEach(({Type, Value}) => {
        const validator = this.generateValidator(Type, Value, el, form)
        if (!validator) {
          return;
        }
        validators.push(validator);
      });
    }

    if (el.FieldType === FieldTypeEnum.Array) {
      return new UntypedFormArray([], validators);
    }

    if (el.FieldType === FieldTypeEnum.Group) {
      this.addGroupDefaultValues(el, defaultValues);
      return new UntypedFormGroup({}, validators);
    }

    if (el.FieldSettings?.IsReadOnly) {
      return new UntypedFormControl({value, disabled: true}, validators);
    }
    return new UntypedFormControl(value, validators);
  }

  cloneControl(ctrl: AbstractControl): AbstractControl {
    if (ctrl instanceof UntypedFormGroup) {
      return new UntypedFormGroup(
        Object.keys(ctrl.controls).reduce((acc, k) => {
          acc[k] = this.cloneControl(ctrl.controls[k]);
          return acc;
        }, {} as any)
      );
    } else if (ctrl instanceof UntypedFormArray) {
      return new UntypedFormArray(ctrl.controls.map(c => this.cloneControl(c)), {validators: ctrl.validator});
    } else {
      return new UntypedFormControl(ctrl.value, {validators: ctrl.validator});
    }
  }

  getValidators(formEl: FormGeneratorElModel, parent: UntypedFormGroup) {
    const validators: ValidatorFn[] = [];
    if (formEl.FieldValidations) {
      formEl.FieldValidations.forEach(({Type, Value}) => {
        const validator = this.generateValidator(Type, Value, formEl, parent)
        if (!validator) {
          return;
        }
        validators.push(validator);
      });
    }
    return validators;
  }

  /**
   * Maps a single `FormGeneratorValidationEnum` rule to the corresponding Angular `ValidatorFn`.
   *
   * For cross-field (sibling) comparisons on numeric fields the validator is registered on
   * the **parent `FormGroup`** instead of the individual control, and `null` is returned so
   * the caller does not push a duplicate validator onto the control itself.
   *
   * | Validation type      | Field types              | Behaviour |
   * |----------------------|--------------------------|-----------|
   * | `Required`           | any                      | Delegates to `Validators.required`. |
   * | `StringLength`       | any                      | Delegates to `Validators.maxLength(value)`. |
   * | `Max`                | Number + sibling ref     | Adds `siblingMaxValidator` to the parent group; returns `null`. |
   * | `Max`                | String / Array           | Delegates to `Validators.maxLength(value)`. |
   * | `Max`                | other                    | Delegates to `Validators.max(value)`. |
   * | `Min`                | Number + sibling ref     | Adds `siblingMinValidator` to the parent group; returns `null`. |
   * | `Min`                | String                   | Delegates to `Validators.minLength(value)`. |
   * | `Min`                | Array                    | Uses `MinLengthArrayValidator(value)`. |
   * | `Min`                | other                    | Delegates to `Validators.min(value)`. |
   * | `Remainder`          | any                      | Uses `RemainderValidator(value)`. |
   * | `MinPrecision`       | any                      | Uses `MinPrecisionValidator(value)`. |
   * | `MaxPrecision`       | any                      | Uses `MaxPrecisionValidator(value)`. |
   * | `Trimmed`            | any                      | Uses `TrimmedValidator()`. |
   *
   * A **sibling reference** is a `value` string matching the pattern `${fieldName}` (no dots),
   * resolved via {@link extractSameLevelSiblingName}.
   *
   * @param type    - The validation rule type from `FormGeneratorValidationEnum`.
   * @param value   - The rule's parameter (e.g. max length, step size, or a sibling reference).
   * @param formEl  - The form element definition being validated.
   * @param parent  - The parent `FormGroup` used to attach cross-field validators.
   * @returns The resolved `ValidatorFn`, or `null` when the validator was applied at group level.
   */
  private generateValidator(
    type: FormGeneratorValidationEnum,
    value: any,
    formEl: FormGeneratorElModel,
    parent: UntypedFormGroup
  ): ValidatorFn | null {
    const siblingFieldName = this.extractSameLevelSiblingName(value);
    const fieldType = formEl.FieldType;
    const fieldName = formEl.Name;
    switch (type) {
      case FormGeneratorValidationEnum.Required:
        return Validators.required;
      case FormGeneratorValidationEnum.StringLength:
        return Validators.maxLength(parseInt(value));
      case FormGeneratorValidationEnum.Max:
        if (this.isNumericField(fieldType) && siblingFieldName) {
          parent.addValidators(siblingMaxValidator(siblingFieldName, fieldName));
          return null;
        }
        if (fieldType === FieldTypeEnum.String || fieldType === FieldTypeEnum.Array) {
          return Validators.maxLength(parseInt(value));
        }
        return Validators.max(parseFloat(value));
      case FormGeneratorValidationEnum.Min:
        if (this.isNumericField(fieldType) && siblingFieldName) {
          parent.addValidators(siblingMinValidator(siblingFieldName, fieldName));
          return null;
        }
        if (fieldType === FieldTypeEnum.String) {
          return Validators.minLength(parseInt(value))
        }
        if (fieldType === FieldTypeEnum.Array) {
          return MinLengthArrayValidator(parseInt(value));
        }
        return Validators.min(parseFloat(value));
      case FormGeneratorValidationEnum.Remainder:
        return RemainderValidator(value);
      case FormGeneratorValidationEnum.MinPrecision:
        return MinPrecisionValidator(value);
      case FormGeneratorValidationEnum.MaxPrecision:
        return MaxPrecisionValidator(value);
      case FormGeneratorValidationEnum.Trimmed:
        return TrimmedValidator();
      default:
        return null;
    }
  }

  private isNumericField(fieldType: FieldTypeEnum) {
    return fieldType === FieldTypeEnum.Number;
  }

  private extractSameLevelSiblingName(value: any): string | null {
    if (typeof value !== 'string') {
      return null;
    }

    const match = value.match(/^\$\{([^{}]+)}$/);
    if (!match) {
      return null;
    }

    const fieldName = match[1].trim();
    if (!fieldName || fieldName.includes('.')) {
      return null;
    }

    return fieldName;
  }

  generateValue(el: FormGeneratorElModel, value: any) {
    const type = el.FieldType;
    switch(type) {
      case FieldTypeEnum.Number:
        return value !== null && value !== undefined ? parseFloat(value) : null;
      case FieldTypeEnum.DropDown:
        return this.generateDropDownValue(el, value);
      case FieldTypeEnum.MultiSelectDropdown:
        return Array.isArray(value)
          ? value.map(item => this.resolveLegacyStringOptionValue(el.FieldOptions || [], item))
          : value;
      default:
        return value;
    }
  }

  /**
   * Backward compatibility: object option values used to be stored as JSON strings.
   * If the value is such a string and a static option holds the equal object, return that option's object value.
   * Any other value is returned unchanged.
   */
  resolveLegacyStringOptionValue(options: FieldOptionModel[], value: any) {
    if (typeof value !== 'string' || !options.some(el => el.Value !== null && typeof el.Value === 'object')) {
      return value;
    }
    const parsed = this.parseDropdownValue(value);
    if (parsed === null || typeof parsed !== 'object') {
      return value;
    }
    return options.find(el => this.compareOptionValues(el.Value, parsed))?.Value ?? value;
  }

  private generateDropDownValue(element: FormGeneratorElModel, value: any) {
    value = this.resolveLegacyStringOptionValue(element.FieldOptions || [], value);
    if (value && typeof value === 'object') {
      const staticOptions = element.FieldOptions || [];
      // Options are loaded later from DataUrl - keep the value, it is validated after the options arrive
      if (!staticOptions.length) {
        return value;
      }
      return staticOptions.find(el => this.compareOptionValues(el.Value, value))?.Value ?? null;
    }

    return value;
  }

  /**
   * Compares two option values by content (deep equality) instead of reference.
   * Used as `compareWith` for `mat-select`, so object values can be bound directly
   * without converting them to JSON strings.
   */
  compareOptionValues = (a: any, b: any): boolean => {
    if (a === b) {
      return true;
    }
    if (a === null || b === null || a === undefined || b === undefined) {
      return false;
    }
    if (typeof a !== 'object' || typeof b !== 'object') {
      return false;
    }
    return _.isEqual(a, b);
  };

  /**
   * Removes duplicated options (by deep-equal `Value`).
   * Pass `stringifyValues = true` for components which can work only with primitive values
   * (e.g. autocomplete input); object values will be serialized to JSON strings.
   */
  convertedFieldOptionsValues(fieldOptions: FieldOptionModel[], stringifyValues = false): FieldOptionModel[] {
    const options = stringifyValues
      ? fieldOptions.map(el => ({...el, Value: this.convertObjectDropdownValue(el.Value)}))
      : [...fieldOptions];

    const unique: FieldOptionModel[] = [];
    // Keep the last occurrence for duplicated values (same behaviour as the previous Map based implementation)
    options.forEach(item => {
      const index = unique.findIndex(el => this.compareOptionValues(el.Value, item.Value));
      if (index >= 0) {
        unique[index] = item;
      } else {
        unique.push(item);
      }
    });
    return unique;
  }

  getGroupedFieldOptions(values: FieldOptionModel[], stringifyValues = false) {
    const options = stringifyValues
      ? values.map(el => ({...el, Value: this.convertObjectDropdownValue(el.Value)}))
      : [...values];

    if (options.some(el => el.Category)) {
      return this.groupByCategory(options) as GroupResult[];
    }
    return options;
  }

  convertObjectDropdownValue(value: any) {
    let formattedValue = value;
    if (value && typeof value === 'object') {
      formattedValue = value ? JSON.stringify(value) : null;
    }
    return formattedValue;
  }

  getData(url: string): Observable<FieldOptionModel[] | DefaultValueModel> {
    url = url?.indexOf('http') >= 0 ? url : `${this.http.gatewayModuleUrl('')}${url}`;

    return this.http.get(url) as Observable<FieldOptionModel[] | DefaultValueModel> ;
  }

  getTableData(url: string): Observable<TableModel> {
    url = url?.indexOf('http') >= 0 ? url : `${this.http.gatewayModuleUrl('')}${url}`;
    return this.http.get(url) as Observable<TableModel>;
  }

  parseDropdownValue(value: any) {
    if (typeof value !== 'string') {
      return value;
    }

    // Check if value is JSON that need to be parsed
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  getFieldComponent(
    formEl: FormGeneratorElModel,
    fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = []
  ) {
    return this.resolveFieldComponent(formEl.FieldType, fieldComponentOverrides) || NonExistingFieldComponent;
  }

  getFieldInputs(
    formEl: FormGeneratorElModel,
    form: UntypedFormGroup | AbstractControl,
    showElement: boolean = true,
    parentIsVisible: boolean = true,
    fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = []
  ) {
    const formGroup = form as UntypedFormGroup;
    return {
      formEl,
      control: formGroup.get(formEl.Name),
      parentIsVisible: !(!showElement || !parentIsVisible),
      fieldComponentOverrides
    };
  }

  private resolveFieldComponent(
    fieldType: FormGeneratorFieldType,
    fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = []
  ): Type<any> | null {
    return resolveFormGeneratorFieldComponent(
      fieldType,
      this.builtInFieldComponents,
      this.registeredFieldComponents,
      fieldComponentOverrides
    );
  }

  private groupByCategory(fieldOptionModels: FieldOptionModel[]) {
    const groupedResult = _.groupBy(fieldOptionModels, (el: FieldOptionModel) => { return el.Category || 'No Category'; });
    const result: GroupResult[] = Object.entries(groupedResult).reduce((acc: GroupResult[], el) => {
      return [...acc, {name: el[0], options: el[1]}];
    }, []);
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }

  /*
  Method returns string to be used as autocomplete attribute value to prevent Crome autocomplete
   */
  generateAutocomplete(name: string) {
    return `${name}-${Date.now()}`;
  }

  private addGroupDefaultValues(el: FormGeneratorElModel, defaultValues: any) {
    const values = defaultValues[el.Name];
    if (!values) {
      return;
    }
    Object.keys(values).forEach(key => {
      const child = el.Children?.find(c => c.Name === key);
      if (
        child
        && child.FieldSettings !== null
        && child.FieldSettings.DefaultValue !== undefined
        && values[key] !== undefined
      ) {
        child.FieldSettings.DefaultValue = values[key];
      }
    });
  }
}
