import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {FormGeneratorElModel} from "../form-generator.model";
import {AbstractControl, FormControl, ReactiveFormsModule, UntypedFormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipEditedEvent, MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {DcFormGeneratorErrorComponent} from "../dc-form-generator-error/dc-form-generator-error.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {NgFor, NgIf} from "@angular/common";
import {ConditionsClass} from "../helpers/Conditions.class";
import {DcHttp} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-fg-multistring-input',
  standalone: true,
  templateUrl: './dc-multistring-input.component.html',
  styleUrls: [],
  imports: [
    ReactiveFormsModule,
    MatChipInput,
    DcFormGeneratorErrorComponent,
    TranslateModule,
    MatChipRow,
    MatChipGrid,
    MatChipRemove,
    MatIcon,
    MatLabel,
    MatFormField,
    MatInput,
    MatError,
    NgIf,
    NgFor
  ],
  encapsulation: ViewEncapsulation.None
})
export class DcMultistringInputComponent extends ConditionsClass implements OnInit, OnDestroy, OnChanges {

  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({ required: true }) override control!: UntypedFormControl | AbstractControl;

  @Input() override parentIsVisible: boolean = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  formulaCtrl = new FormControl<string>('');

  get formControl(): UntypedFormControl {
    return this.control as FormControl<string[]>;
  }

  get value() {
    return this.formControl.value || [];
  }

  get elements(): string[] {
    return this.value;
  }

  constructor(
    _http: DcHttp,
    private cdr: ChangeDetectorRef
  ) {
    super(_http);
  }

  override ngOnInit() {
    super.ngOnInit();
    // Initialize form control with default values if empty
    if (!this.formControl.value || this.formControl.value.length === 0) {
      const defaultValue = this.formEl?.FieldSettings?.DefaultValue;
      if (defaultValue && Array.isArray(defaultValue)) {
        this.formControl.patchValue(defaultValue, { emitEvent: false });
        this.cdr.markForCheck();
      }
    }
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.value.includes(value)) {
      const newValues = [...this.value, value];
      this.formControl.patchValue(newValues);
      this.formControl.markAsTouched();
    }
    this.formulaCtrl.reset();
  }

  remove(element: string): void {
    const index = this.value.indexOf(element);
    if (index >= 0) {
      const newValues = this.value.filter((_: string, i: number) => i !== index);
      this.formControl.patchValue(newValues);
      this.formControl.markAsTouched();
    }
  }

  edit(element: string, $event: MatChipEditedEvent) {
    const newValue = $event.value.trim();

    if (!newValue) {
      this.remove(element);
      return;
    }

    const index = this.value.indexOf(element);
    if (index >= 0) {
      const newValues = this.value.map((el: string, i: number) => i === index ? newValue : el);
      this.formControl.patchValue(newValues);
      this.formControl.markAsTouched();
    }
  }
}
