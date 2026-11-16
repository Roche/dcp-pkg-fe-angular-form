import {Directive, HostListener, Input} from "@angular/core";
import {NumberService} from "../services/number.service";

@Directive({
  selector: '[numericInputValidation]',
  standalone: true,
  providers: [NumberService]
})
export class NumericInputValidation {
  @Input() isFloat: boolean = false;
  @HostListener('paste', ['$event']) onPaste(event: any) {
    const clipboardData = event.clipboardData || null;

    if (clipboardData) {
      const newValue = this.currentValueAfterPaste(event, clipboardData);
      if (newValue) {
        if (this.isFloat) {
          if ((
            newValue.indexOf('-') > -1
            && newValue.indexOf('.') < 2
          ) || (
            newValue.indexOf('-') === -1
            && newValue.indexOf('.') < 1
          )) {
            return false;
          }
          return !isNaN(Number(newValue));
        }
        return !isNaN(Number(newValue)) && newValue.indexOf('.') < 0;
      }
      return false
    }
    return false;
  }
  @HostListener('keydown', ['$event']) isNumericValue(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    // Cut/Copy/Paste with buttons OR delete button
    if (
        (event.ctrlKey && event.key === 'x')
        || (event.ctrlKey && event.key === 'c')
        || (event.ctrlKey && event.key === 'v')
        || charCode === 46
    ) {
      return true;
    }
    const insertPosition = event.target.selectionStart;
    const currentValue = this.currentValueAfterSelection(event);
    if (this.isFloat) {
      return this.numberService.floatNumberOnly(charCode, currentValue, insertPosition);
    }
    return this.numberService.floatNumberOnly(charCode, currentValue, insertPosition)
      && currentValue.indexOf('.') === -1
      && (charCode !== 190 && charCode !== 110 && charCode !== 46);
  }
  constructor(
    private readonly numberService: NumberService
  ) {}

  private currentValueAfterSelection(event: any) {
    const selectionStart = event.target.selectionStart;
    const selectionEnd = event.target.selectionEnd;
    const value: string = event.target.value;
    if (selectionStart === selectionEnd) {
      return value;
    }
    return value.substring(0, selectionStart) + value.substring(selectionEnd);
  }

  private currentValueAfterPaste(event: any, clipboardData: any): string {
    const currentValue = this.currentValueAfterSelection(event);
    const pastedText = clipboardData.getData('text');
    if (!currentValue) {
      return pastedText;
    }
    const pasteIndex = event.target.selectionStart;
    return currentValue.substring(0, pasteIndex) + pastedText + currentValue.substring(pasteIndex);
  }
}
