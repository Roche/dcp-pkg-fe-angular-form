import {AbstractControl} from '@angular/forms';

export function MinLengthArrayValidator(min: number) {
  return (c: AbstractControl): ({[key: string]: any} | null) => {
    if (c.value.length >= min) {
      return null;
    }
    return { 'minlength': {requiredLength: min, left: min - c.value.length}};
  };
}
