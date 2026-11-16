import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {OnDestroySubject} from '@open-dcp/angular-services';
import {takeUntil} from 'rxjs/operators';
import {FormValidationErrorComponent} from './form-validation-error.component';
import {TranslateModule} from '@ngx-translate/core';

/**
 * Form-layer single-line text input component.
 *
 * Supports either an external `FormControl` or internal state via `modelValue`.
 * Emits value updates through `onModelValueChange` and click interactions via `onInputStringClicked`.
 * Pass `translationPrefix` to override the validation translation namespace used by
 * the nested `odcp-form-validation-error` component.
 */
@Component({
  selector: 'odcp-input-string',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    FormValidationErrorComponent,
    TranslateModule
  ],
  template: `
    <mat-form-field class="full-width">
      <mat-label *ngIf="label">{{ label | translate }}</mat-label>
      <input
        matInput
        [formControl]="control"
        (click)="onInputStringClick($event)"/>
      <mat-error>
        <odcp-form-validation-error [control]="control" [translationPrefix]="translationPrefix"/>
      </mat-error>
    </mat-form-field>
  `,
  styles: ``
})
export class InputStringComponent extends OnDestroySubject implements OnInit, OnDestroy, OnChanges {
  @Input() control!: FormControl<string | null>;
  @Input() modelValue: string | null = '';
  @Input() disabled = false;
  @Input() label = '';

  /**
   * Validation translation namespace forwarded to `odcp-form-validation-error`.
   */
  @Input() translationPrefix = 'ODCP.FORM.VALIDATIONS';

  @Output() onModelValueChange = new EventEmitter<string | null>();
  @Output() onInputStringClicked = new EventEmitter<Event>();

  ngOnInit() {
    if (!this.control) {
      this.control = new FormControl<string | null>(this.modelValue);
    }

    if (this.disabled) {
      this.control.disable();
    }

    this.control.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        this.onModelValueChange.emit(value);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['disabled'] && this.control) {
      if (this.disabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }

    if (changes['modelValue'] && this.control && !changes['modelValue'].firstChange) {
      this.control.setValue(changes['modelValue'].currentValue, { emitEvent: false });
    }
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  onInputStringClick(event: Event): void {
    this.onInputStringClicked.emit(event);
  }
}
