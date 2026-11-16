import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatOptgroup, MatOption, MatSelect, MatSelectChange} from '@angular/material/select';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {OnDestroySubject} from '@open-dcp/angular-services';
import {FieldOptionModel, GroupResult} from '../form-generator/form-generator.model';
import {FormValidationErrorComponent} from './form-validation-error.component';
import {TranslateModule} from '@ngx-translate/core';
import * as _ from 'underscore';

/**
 * Form-layer searchable single-select component.
 *
 * Accepts `FieldOptionModel[]` options and supports grouped rendering by `Category`.
 * Emits value updates through `onModelValueChange` and selection interactions via `onDropdownSelectClicked`.
 * Pass `translationPrefix` to override the validation translation namespace used by
 * the nested `odcp-form-validation-error` component.
 */
@Component({
  selector: 'odcp-dropdown-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatOptgroup,
    MatInput,
    MatIcon,
    MatIconButton,
    MatError,
    FormValidationErrorComponent,
    TranslateModule
  ],
  template: `
    <mat-form-field class="full-width">
      <mat-label *ngIf="label">{{ label | translate }}</mat-label>
      <mat-select
        [formControl]="control"
        [compareWith]="compareOptionValues"
        (selectionChange)="onDropdownSelectClick($event)"
        (openedChange)="onOpenedChange($event)">
        <mat-form-field class="mat-select-filter_wrap">
          <input
            matInput
            [formControl]="filterInput"
            placeholder="Search"
            class="mat-select-filter_input"/>
        </mat-form-field>
        @for (element of groupedOptions; track element) {
          @if (groupOption(element).name) {
            <mat-optgroup [label]="groupOption(element).name">
              @for (option of groupOption(element).options; track option) {
                <mat-option [value]="option.Value">
                  <span>{{ option.Label }}</span>
                </mat-option>
              }
            </mat-optgroup>
          } @else {
            <mat-option [value]="fieldOption(element).Value">
              <span>{{ fieldOption(element)?.Label }}</span>
            </mat-option>
          }
        }
      </mat-select>

      <button *ngIf="hasValue && !isRequired"
              matSuffix
              mat-icon-button
              aria-label="Clear selection"
              (click)="deselect($event)">
        <mat-icon>close</mat-icon>
      </button>

      <mat-error>
        <odcp-form-validation-error [control]="control" [translationPrefix]="translationPrefix"/>
      </mat-error>
    </mat-form-field>
  `,
  styles: ``
})
export class DropdownSelectComponent extends OnDestroySubject implements OnInit, OnDestroy, OnChanges {
  @Input() control!: FormControl<any | null>;
  @Input() modelValue: any | null = null;
  @Input() options: FieldOptionModel[] = [];
  @Input() disabled = false;
  @Input() label = '';

  /**
   * Validation translation namespace forwarded to `odcp-form-validation-error`.
   */
  @Input() translationPrefix = 'ODCP.FORM.VALIDATIONS';

  @Output() onModelValueChange = new EventEmitter<any | null>();
  @Output() onDropdownSelectClicked = new EventEmitter<MatSelectChange>();

  filterInput = new FormControl<string>('');
  groupedOptions: (GroupResult | FieldOptionModel)[] = [];

  get hasValue(): boolean {
    return this.control?.value !== null && this.control?.value !== undefined && this.control?.value !== '';
  }

  get isRequired(): boolean {
    return this.control?.hasValidator?.(Validators.required) === true;
  }

  /**
   * Deep-equal comparator so object option values can be bound directly to `mat-select`.
   */
  compareOptionValues = (a: any, b: any): boolean => a === b || (
    a !== null && b !== null && typeof a === 'object' && typeof b === 'object' && _.isEqual(a, b)
  );

  ngOnInit() {
    if (!this.control) {
      this.control = new FormControl<any | null>(this.modelValue);
    }

    if (this.disabled) {
      this.control.disable();
    }

    this.setGroupedOptions(this.options);

    this.control.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        this.onModelValueChange.emit(value);
      });

    this.filterInput.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe(searchTerm => {
        this.handleFilter(searchTerm || '');
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

    if (changes['options']) {
      this.handleFilter(this.filterInput.value || '');
    }
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  onDropdownSelectClick(event: MatSelectChange): void {
    this.onDropdownSelectClicked.emit(event);
  }

  onOpenedChange(opened: boolean): void {
    if (!opened) {
      this.filterInput.setValue('', { emitEvent: false });
      this.setGroupedOptions(this.options);
    }
  }

  deselect($event: MouseEvent): void {
    $event.stopPropagation();
    this.control.patchValue(null);
  }

  handleFilter(value: string): void {
    const normalizedSearch = value.trim().toLowerCase();

    if (!normalizedSearch) {
      this.setGroupedOptions(this.options);
      return;
    }

    const filteredOptions = this.options.filter(option => {
      const label = (option.Label || '').trim().toLowerCase();
      return label.includes(normalizedSearch);
    });

    this.setGroupedOptions(filteredOptions);
  }

  groupOption(group: GroupResult | FieldOptionModel): GroupResult {
    return group as GroupResult;
  }

  fieldOption(fieldOption: GroupResult | FieldOptionModel): FieldOptionModel {
    return fieldOption as FieldOptionModel;
  }

  private setGroupedOptions(options: FieldOptionModel[]): void {
    const grouped = new Map<string, FieldOptionModel[]>();
    const ungrouped: FieldOptionModel[] = [];

    options.forEach(option => {
      const category = (option.Category || '').trim();

      if (!category) {
        ungrouped.push(option);
        return;
      }

      if (!grouped.has(category)) {
        grouped.set(category, []);
      }

      grouped.get(category)?.push(option);
    });

    this.groupedOptions = [
      ...Array.from(grouped.entries()).map(([name, groupOptions]) => ({
        name,
        options: groupOptions
      })),
      ...ungrouped
    ];
  }
}
