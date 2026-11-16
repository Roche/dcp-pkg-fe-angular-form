import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberService {

  constructor() { }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    return !(charCode > 31
      && (charCode < 48 || charCode > 57)
      && (charCode === 190 || charCode === 110 || charCode === 46) // Possible codes for dot (.)
      && charCode === 45 // Code for minus (-)
    );
  }

  /**
   * Validation for input with Float numbers (DataType === Double or Single)
   * @param charCode - chart code from keydown event.which or event.keyCode
   * @param inputValue - value from keydown event.target.value
   * @params insertPosition - insert position
   *
   * It will allow to navigate with left/right arrows, add minus at the beginning of value, and add dot or numbers
   */
  floatNumberOnly(charCode: number, inputValue: string, insertPosition: number) {
    // Arrows for navigation
    if (charCode === 39 || charCode === 37) {
      return true;
    }
    if (this.isDotCharCode(charCode)) {
      return !(inputValue.indexOf('.') > -1
        || (
          inputValue.indexOf('-') > -1
          && insertPosition < 2
        ) || (
          inputValue.indexOf('-') === -1
          && insertPosition < 1
        ));
    }
    // Minus case
    if (charCode === 189) {
      return !(inputValue.indexOf('-') > -1 || insertPosition !== 0);

    }
    return !(charCode > 31 && (charCode < 48 || charCode > 57));

  }

  /**
   * To be used to check if value is number
   * newFiledValue: the value to be checked
   * checkNumberFieldValue('10.00') - true
   * checkNumberFieldValue('10.22.3') - false
   * checkNumberFieldValue('10.e') - false
   */
  checkNumberFieldValue(value: string | number): boolean {
    // Handle typing minus sign
    if (value === '-') {
      value = `-0`;
    }
    if (isNaN(Number(value))) {
      return false;
    }
    return true;
  }

  private isDotCharCode(charCode: number) {
    // Dot case. Possible codes for dot (.)
    return charCode === 190 || charCode === 110 || charCode === 46;
  }
}
