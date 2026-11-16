import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

/**
 * Group-level validator that ensures a control's value does not exceed its sibling's value.
 *
 * The error `{ siblingMax: { max: siblingValue } }` is set directly on the named control
 * so that per-field error display works without any additional wiring. Existing errors on
 * the control (e.g. `required`) are preserved.
 *
 * @param siblingName - The name of the sibling control whose value acts as the upper bound.
 * @param controlName - The name of the control being validated.
 * @returns A `ValidatorFn` intended to be attached to the parent `FormGroup`.
 *
 * @example
 * // Attach to the parent group so both controls are in scope:
 * parentGroup.addValidators(siblingMaxValidator('maxTemp', 'minTemp'));
 */
export function siblingMaxValidator(
  siblingName: string,
  controlName: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(controlName);
    const sibling = group.get(siblingName);

    if (!control || !sibling) return null;

    const isInvalid = control.value > sibling.value;

    if (isInvalid) {
      // Set the error on the specific field
      control.setErrors({ ...control.errors, siblingMax: {max: sibling.value || 0} });
    } else {
      // Logic to remove only our specific error without wiping others (like 'required')
      if (control.hasError('siblingMax')) {
        const errors = { ...control.errors };
        delete errors['siblingMax'];
        control.setErrors(Object.keys(errors).length ? errors : null);
      }
    }

    // Return null for the group itself so the error is confined to the control
    return null;
  };
}
/**
 * Group-level validator that ensures a control's value is not below its sibling's value.
 *
 * The error `{ siblingMin: { min: siblingValue } }` is set directly on the named control
 * so that per-field error display works without any additional wiring. Existing errors on
 * the control (e.g. `required`) are preserved.
 *
 * @param siblingName - The name of the sibling control whose value acts as the lower bound.
 * @param controlName - The name of the control being validated.
 * @returns A `ValidatorFn` intended to be attached to the parent `FormGroup`.
 *
 * @example
 * // Attach to the parent group so both controls are in scope:
 * parentGroup.addValidators(siblingMinValidator('minTemp', 'maxTemp'));
 */
export function siblingMinValidator(
  siblingName: string,
  controlName: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(controlName);
    const sibling = group.get(siblingName);

    if (!control || !sibling) return null;

    const isInvalid = control.value < sibling.value;

    if (isInvalid) {
      // Set the error on the specific field
      control.setErrors({ ...control.errors, siblingMin: {min: sibling.value} });
    } else {
      // Logic to remove only our specific error without wiping others (like 'required')
      if (control.hasError('siblingMin')) {
        const errors = { ...control.errors };
        delete errors['siblingMin'];
        control.setErrors(Object.keys(errors).length ? errors : null);
      }
    }

    // Return null for the group itself so the error is confined to the control
    return null;
  };
}

/**
 * Return corrected multiplied value
 * The problem is that in JS
 * 2.22 * (10 ** 2) = 222.00000000000003
 * So we need to make
 * 2.22 * (10 ** 3) / 10 = 222
 * @param value
 * @param decimalsLength
 */
function correctMultiplier(value: number, decimalsLength: number): number {
  return parseInt((value * (10 ** (decimalsLength + 1))).toFixed(4), 10) / 10;
}
/**
 * Validator that return error if input value % given operand !== 0
 * Because in JS
 * 2.02 % .02 = 0.019999999999999976
 * We need to implement
 * (2.02 * 100) % (.02 * 100) = 0
 * @param operand
 * @constructor
 */
export function RemainderValidator(operand: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const decimals = operand.toString().split('.')[1];
    const decimalsLength = decimals ? decimals.length : 0;
    if (control.value && correctMultiplier(control.value, decimalsLength) % correctMultiplier(operand, decimalsLength) !== 0) {
      return { remainder: operand };
    }
    return null;
  };
}
/**
 * Validator that return error if input value precision is below minimum
 * @param minPrecision
 * @constructor
 */
export function MinPrecisionValidator(minPrecision: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const decimalsLength = minPrecision ? minPrecision : 0;
    if (
      control.value
      && control.value.Precision
      && control.value.Precision < minPrecision
    ) {
      return { minPrecision };
    }
    return null;
  };
}
/**
 * Validator that return error if input value precision is above maximum
 * @param maxPrecision
 * @constructor
 */
export function MaxPrecisionValidator(maxPrecision: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      maxPrecision
      && control.value
      && control.value.Precision
      && control.value.Precision > maxPrecision
    ) {
      return { maxPrecision };
    }
    return null;
  };
}
/**
 * Validator that return error if input value have white space at the beginning or end of the string
 * @constructor
 */
export function TrimmedValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control?.value || '');
    const paragraphs = value.split(/\r?\n/);
    if (
      value && (
        value.startsWith(' ') ||
        value.endsWith(' ') ||
        paragraphs[0]?.length === 0 ||
        paragraphs[paragraphs.length - 1]?.length === 0
      )
    ) {
      return { whitespace: true };
    }
    return null;
  }
}

