import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function UniqueValueValidator(values: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newOption = control.value;
    if (values && newOption) {
      return values.includes(newOption)
        ? { unique: true }
        : null;
    }
    return null;

  };
}
