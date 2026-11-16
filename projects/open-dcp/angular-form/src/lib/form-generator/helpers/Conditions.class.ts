import {inject, Injectable, Input, OnChanges, OnDestroy, SimpleChanges} from "@angular/core";
import {
  ActionType,
  Condition,
  ConditionGroup,
  ConditionOperator,
  FormGeneratorElModel,
  LogicalOperator
} from "../form-generator.model";
import {AbstractControl, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {merge, Subject} from "rxjs";
import {ODCPFormGeneratorService} from "../dc-form-generator.service";
import {DcHttp, OnDestroySubject} from "@open-dcp/angular-services";
import {takeUntil} from "rxjs/operators";
import {FormGeneratorFieldComponentConfig} from "../form-generator.tokens";

/**
 * Normalizes a logical operator value that may come from different API formats:
 * - String:  'And' | 'Or'
 * - Numeric: 1 (And) | 2 (Or)
 */
export function resolveLogicalOperator(operator: LogicalOperator | string | number): LogicalOperator {
  if (operator === 1 || operator === LogicalOperator.and || String(operator).toLowerCase() === 'and') {
    return LogicalOperator.and;
  }
  return LogicalOperator.or;
}

export interface ControlCheck {
  control: UntypedFormControl | AbstractControl<any, any>;
  condition: Condition;
}

@Injectable()
export class ConditionsClass extends OnDestroySubject implements OnDestroy, OnChanges {

  @Input({ required: true }) formEl!: FormGeneratorElModel;

  @Input({ required: true }) control!: UntypedFormControl | AbstractControl;

  @Input({ required: true }) parentIsVisible: boolean = true;

  @Input() fieldComponentOverrides: FormGeneratorFieldComponentConfig[] = [];

  showElement = true;

  formGenerator = inject(ODCPFormGeneratorService);
  readonly formGeneratorService = this.formGenerator;

  private clearExistingSubscriptions = new Subject<void>();
  private validationEnabledState: boolean | null = null;

  constructor(
    public readonly http: DcHttp
  ) {
    super();
  }

  ngOnInit() {
    if (this.formEl?.ConditionGroups && this.formEl?.ConditionGroups?.length > 0) {
      this.initConditions(this.formEl?.ConditionGroups && this.formEl?.ConditionGroups);
    } else {
      this.showElement = true;
    }
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.clearExistingSubscriptions.next();
    this.clearExistingSubscriptions.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['parentIsVisible']) {
      if (changes['parentIsVisible'].currentValue) {
        this.setValidationEnabled(true);
      } else {
        this.setValidationEnabled(false);
      }
    }
    if (changes['control']) {
      if (this.control && this.formEl?.ConditionGroups && this.formEl?.ConditionGroups?.length > 0) {
        this.clearExistingSubscriptions.next();
        this.clearExistingSubscriptions.complete();
        this.clearExistingSubscriptions = new Subject();
        this.initConditions(this.formEl?.ConditionGroups && this.formEl?.ConditionGroups);
      }
    }
  }

  findDependent(fieldName: string, formGroup: UntypedFormGroup, innerAttribute = false): null | UntypedFormControl | AbstractControl {
    if (formGroup === null) {
      return null;
    }
    const fieldNameArr = fieldName.split('.');
    if (fieldNameArr.length > 1) {
      const levelGroup = formGroup.get(fieldName.split('.')[0]);
      fieldNameArr.shift()
      return this.findDependent(fieldNameArr.join('.'), levelGroup as UntypedFormGroup, true);
    }
    const control = formGroup.get(fieldName);
    if (control === null) {
      if (innerAttribute) {
        this.subscribeToInnerParrent(formGroup, fieldName);
        return null;
      }
      if (formGroup.parent) {
        return this.findDependent(fieldName, formGroup.parent as UntypedFormGroup);
      }
      return null;
    }
    return control;
  }

  private subscribeToInnerParrent(formGroup: UntypedFormGroup, fieldName: string) {
    formGroup.valueChanges.pipe(takeUntil(this.clearExistingSubscriptions)).subscribe(v => {
      if (v[fieldName] !== undefined) {
        this.initConditions(this.formEl?.ConditionGroups as ConditionGroup[]);
      }
    })
  }

  private initConditions(conditionGroups: ConditionGroup[]) {
    conditionGroups.forEach(conditionGroup => {
      this.checkConditionGroup(conditionGroup);
    })
  }

  private checkConditionGroup(conditionGroup: ConditionGroup) {
    const controlsToCheck = conditionGroup.Conditions.map(condition => {
      const control = this.findDependent(condition.DependentOn, this.control.parent as UntypedFormGroup);
      if (control === null) {
        return null;
      }
      return {control, condition};
    }).filter(control => control !== null) as ControlCheck[];
    if (controlsToCheck.length === 0) {
      return this.applyAction(conditionGroup, []);
    }

    const result = this.checkResults(controlsToCheck);
    this.applyAction(conditionGroup, result);

    merge(
      ...controlsToCheck.map(el => el.control.valueChanges)
    )
      .pipe(takeUntil(this.onDestroy$), takeUntil(this.clearExistingSubscriptions))
      .subscribe({
        next: () => {
          const result = this.checkResults(controlsToCheck);
          this.applyAction(conditionGroup, result);
        },
        error: err => console.error(err)
      });
  }

  private applyAction(conditionGroup: ConditionGroup, result: boolean[] = []) {
    const logicalOperator = resolveLogicalOperator(conditionGroup.Operator);
    switch (conditionGroup.Action) {
      case ActionType.Hide:
        if (result.length === 0) {
          this.toggleElement(true);
          this.showElement = true;
        } else {
          this.toggleElement(logicalOperator === LogicalOperator.and ? result.every(v => !v) : result.some(v => !v));
        }
        break;
      case ActionType.Show:
        if (result.length === 0) {
          this.toggleElement(true);
        } else {
          this.toggleElement(logicalOperator === LogicalOperator.and ? result.every(v => v) : result.some(v => v));
        }
        break;
      case ActionType.DisableValidation:
        if (result.length === 0) {
          this.toggleValidation(true);
        } else {
          this.toggleValidation(logicalOperator === LogicalOperator.and ? result.every(v => !v) : result.some(v => !v));
        }
        break;
      case ActionType.EnableValidation:
        if (result.length === 0) {
          this.toggleValidation(true);
        } else {
          this.toggleValidation(logicalOperator === LogicalOperator.and ? result.every(v => v) : result.some(v => v));
        }
        break;
      default:
        this.toggleElement(true);
        break;
    }
  }

  private checkResults(controlsToCheck: ControlCheck[]) {
    return controlsToCheck.map(el => this.checkValue(el.control.value, el.condition))
  }

  private checkValue(value: any, condition: Condition) {
    const equals = (a: any, b: any) => this.formGeneratorService.compareOptionValues(a, b);
    const contains = (values: any[], item: any) => values.some(v => equals(v, item));
    switch (condition.Operator) {
      case ConditionOperator.equal:
        if (Array.isArray(value)) {
          return condition.Values.some(el => contains(value, el));
        } else {
          return condition.Values.some(el => equals(el, value));
        }
      case ConditionOperator.in:
        return condition.Values.some(el => equals(el, value));
      case ConditionOperator.notEqual:
        if (Array.isArray(value)) {
          return condition.Values.every(el => contains(value, el));
        } else {
          return condition.Values.every(el => !equals(el, value));
        }
      case ConditionOperator.hasValue:
        if (Array.isArray(value)) {
          return condition.Values[0] ? value.length > 0 : value.length === 0;
        } else {
          return condition.Values[0] ? value : !value;
        }
      case ConditionOperator.greaterOrEqual:
        return condition.Values[0] <= value;
      case ConditionOperator.lessOrEqual:
        return condition.Values[0] >= value;
      case ConditionOperator.greaterThen:
        return condition.Values[0] < value;
      case ConditionOperator.lessThen:
        return condition.Values[0] > value;
      case ConditionOperator.countEqualTo:
      case ConditionOperator.countGreaterOrEqualTo:
      case ConditionOperator.countLessOrEqualTo:
        let length = 0;
        if (Array.isArray(value)) {
          length = value.length;
        } else  if (typeof value === 'number') {
          length = value;
        } else {
          length = value.toString().length;
        }
        if (condition.Operator === ConditionOperator.countGreaterOrEqualTo) {
          return condition.Values[0] <= length;
        }
        if (condition.Operator === ConditionOperator.countLessOrEqualTo) {
          return condition.Values[0] >= length;
        }
        // As default condition.Operator === ConditionOperator.countEqualTo
        return condition.Values.some(el => el === length);
      default:
        return false;
    }
  }

  private toggleElement(b: boolean) {
    this.showElement = b;
    if (this.showElement) {
      this.setValidationEnabled(true);
      if (!this.formEl.FieldSettings?.IsReadOnly) {
        this.control?.enable({ emitEvent: true });
      }
    } else {
      this.setValidationEnabled(false);
      this.control?.disable({ emitEvent: true });
    }
  }

  private toggleValidation(b: boolean) {
    this.setValidationEnabled(b);
  }

  private setValidationEnabled(enabled: boolean) {
    if (this.validationEnabledState === enabled) {
      return;
    }

    this.validationEnabledState = enabled;
    if (enabled) {
      this.addValidation();
    } else {
      this.removeValidation();
    }
  }

  addValidation() {
    const validators = this.formGenerator.getValidators(
      this.formEl,
      this.control.parent as unknown as UntypedFormGroup
    );
    const hasCurrentValidators = !!this.control.validator;
    const hasNewValidators = Array.isArray(validators) && validators.length > 0;

    if (!hasNewValidators || hasCurrentValidators) {
      return;
    }

    this.control.setValidators([...validators]);
    this.control.updateValueAndValidity({ emitEvent: false, onlySelf: true });
  }

  removeValidation() {
    if (!this.control.validator) {
      return;
    }

    this.control.clearValidators();
    this.control.clearAsyncValidators();
    this.control.setErrors(null);
    this.control.setValidators(null);
    this.control.updateValueAndValidity({ emitEvent: false, onlySelf: true });
  }
}
