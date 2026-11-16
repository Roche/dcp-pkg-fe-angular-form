import {AbstractControl, ValidationErrors} from "@angular/forms";

export function NumericTrailingDotValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value && control.value.length > 0 && control.value.indexOf('.') === control.value.length - 1) {
    return { trailingDot: true };
  }
  return null;
}
export function NumericStartingDotValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value && control.value.length > 0 && control.value.indexOf('.') === 0) {
    return { startingDot: true };
  }
  return null;
}
