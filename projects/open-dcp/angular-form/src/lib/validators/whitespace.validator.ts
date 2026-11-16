import {AbstractControl} from '@angular/forms';

export function NoLRWhitespaceValidator(control: AbstractControl) {
  if (control.value && (typeof control.value === 'string' || control.value instanceof String)) {
    const paragraphs = control?.value?.split(/\r?\n/);
    if (
      control.value.startsWith(' ')
      || control.value.endsWith(' ')
      || paragraphs[0]?.length === 0
      || paragraphs[paragraphs.length - 1]?.length === 0
    ) {
      return { whitespace: true };
    }
  }
  return null;
}

export function NoDoubleQuotesValidator(control: AbstractControl) {
  if (control.value && control.value.indexOf('"') > -1) {
    return { doublequotes: true };
  }
  return null;
}
