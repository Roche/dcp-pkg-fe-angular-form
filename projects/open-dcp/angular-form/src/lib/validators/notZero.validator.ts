import {AbstractControl} from '@angular/forms';

export function NotZeroValidator(control: AbstractControl) {
  if (control.value === 0) {
    return { notZero: true };
  }
  return null;
}
