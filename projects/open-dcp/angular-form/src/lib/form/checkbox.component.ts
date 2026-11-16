import {Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {takeUntil} from "rxjs/operators";
import {OnDestroySubject} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-checkbox',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, ReactiveFormsModule],
  template: `
    <mat-checkbox
      [formControl]="control"
      color="primary"
      [indeterminate]="indeterminate"
      (change)="onCheckboxClick($event)">
      <ng-content/>
    </mat-checkbox>`,
  styles: ``
})
/**
 * Form-layer checkbox component.
 *
 * Supports either an external `FormControl` or internal state via `modelValue`.
 * Emits value updates through `onModelValueChange` and user interactions via `onCheckboxClicked`.
 */
export class CheckboxComponent extends OnDestroySubject implements OnInit, OnDestroy, OnChanges {
  @Input() control!: FormControl<boolean | null>;
  @Input() modelValue: boolean | null = false;
  @Input() indeterminate: boolean = false;
  @Input() disabled: boolean = false;

  @Output() onModelValueChange = new EventEmitter<boolean | null>();
  @Output() onCheckboxClicked = new EventEmitter<MatCheckboxChange>();

  ngOnInit() {
    if (!this.control) {
      this.control = new FormControl<boolean | null>(this.modelValue);
    }
    if (this.disabled) {
      this.control.disable();
    }

    this.control.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(v => {
      this.onModelValueChange.emit(v);
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

  onCheckboxChange(event: MatCheckboxChange): void {
    this.onModelValueChange.emit(event.checked);
  }

  onCheckboxClick(event: any): void {
    this.onCheckboxClicked.emit(event);
  }
}
