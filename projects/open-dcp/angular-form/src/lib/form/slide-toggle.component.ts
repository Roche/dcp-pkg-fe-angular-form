import {Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {takeUntil} from "rxjs/operators";
import {OnDestroySubject} from "@open-dcp/angular-services";
import {MatSlideToggle, MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'odcp-slide-toggle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSlideToggle],
  template: `
    <mat-slide-toggle
      [formControl]="control"
      class="bca-list_toggle-is-public"
      (change)="onToggleClick($event)">
      <ng-content/>
    </mat-slide-toggle>`,
  styles: ``
})
/**
 * Form-layer slide toggle component.
 *
 * Supports either an external `FormControl` or internal state via `modelValue`.
 * Emits value updates through `onModelValueChange` and user interactions via `onToggleClicked`.
 */
export class SlideToggleComponent extends OnDestroySubject implements OnInit, OnDestroy, OnChanges {
  @Input() control!: FormControl<boolean | null>;
  @Input() modelValue: boolean | null = false;
  @Input() disabled: boolean = false;

  @Output() onModelValueChange = new EventEmitter<boolean | null>();
  @Output() onToggleClicked = new EventEmitter<MatSlideToggleChange>();

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

  onToggleClick(event: any): void {
    this.onToggleClicked.emit(event);
  }
}
