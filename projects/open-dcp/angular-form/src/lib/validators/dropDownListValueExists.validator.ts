import {AbstractControl, UntypedFormArray, ValidationErrors, ValidatorFn} from '@angular/forms';
import * as _ from 'underscore';

export function DropDownListValueExistsValidator(values: UntypedFormArray | any[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newOption = control.value;
    if (values && newOption) {
      const existing: any[] = values instanceof UntypedFormArray
        ? values.value.map((el: any) => el.value)
        : values;
      return existing.some(el => el === newOption || _.isEqual(el, newOption))
        ? { exists: true }
        : null;
    }
    return null;

  };
}
