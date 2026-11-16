import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

const VALIDATION_TRANSLATIONS = {
  en: {
    ODCP: {
      FORM: {
        VALIDATIONS: {
          required: "This field can't be empty",
          max: 'Max value can be {{max.max}}',
          min: 'Min value can be {{min.min}}',
          maxlength: 'Max length can be {{maxlength.requiredLength}}',
          maxLength: 'Max length can be {{maxlength.requiredLength}}',
          minlength: 'Min length can be {{minlength.requiredLength}}',
          minLength: 'Min length can be {{minlength.requiredLength}}',
          whitespace: "Can't use spaces at the beginning or at the end of the field value."
        }
      }
    }
  },
  de: {
    ODCP: {
      FORM: {
        VALIDATIONS: {
          required: 'Dieses Feld darf nicht leer sein',
          max: 'Maximalwert: {{max.max}}',
          min: 'Minimalwert: {{min.min}}',
          maxlength: 'Max length can be {{maxlength.requiredLength}}',
          maxLength: 'Max length can be {{maxlength.requiredLength}}',
          minlength: 'Min length can be {{minlength.requiredLength}}',
          minLength: 'Min length can be {{minlength.requiredLength}}',
          whitespace: 'Die Eingabe darf keine Leerzeichen am Anfang oder Ende haben.'
        }
      }
    }
  }
};

@Component({
  selector: 'odcp-form-validation-error',
  standalone: true,
  imports: [NgIf, TranslateModule, ReactiveFormsModule],
  template: `
    <ng-container *ngIf="control?.errors && (control?.touched || control?.dirty)">
      <div [innerHTML]="translationPrefix + '.' + getErrorKey(control.errors) | translate: control.errors"></div>
    </ng-container>
  `,
  styles: ``
})
/**
 * Renders the first validation error for a form control.
 *
 * The translation key is resolved as `${translationPrefix}.${errorKey}` and shown
 * only when the control is touched or dirty.
 */
export class FormValidationErrorComponent {
  constructor(private readonly translate: TranslateService) {
    this.translate.setTranslation('en', VALIDATION_TRANSLATIONS.en, true);
    this.translate.setTranslation('de', VALIDATION_TRANSLATIONS.de, true);
  }

  @Input({ required: true }) control!: FormControl | AbstractControl;

  /**
   * Translation namespace used to resolve the validation message.
   *
   * Defaults to the built-in catalog under `ODCP.FORM.VALIDATIONS`, but can be
   * overridden to use application-specific validation translations instead.
   */
  @Input() translationPrefix = 'ODCP.FORM.VALIDATIONS';

  getErrorKey(errors: Record<string, unknown> | null): string {
    return errors ? Object.keys(errors)[0] || '' : '';
  }
}
