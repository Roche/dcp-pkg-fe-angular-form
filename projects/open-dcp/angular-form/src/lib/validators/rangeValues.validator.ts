import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function RangeValuesValidator(rangeStart: string, rangeEnd: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const start = control.get(rangeStart)?.value;
    const end = control.get(rangeEnd)?.value;

    if (!isNaN(parseFloat(start)) && !isNaN(parseFloat(end))) {
      return start < end
        ? null
        : { range: true };
    }
    return null;
  };
}
