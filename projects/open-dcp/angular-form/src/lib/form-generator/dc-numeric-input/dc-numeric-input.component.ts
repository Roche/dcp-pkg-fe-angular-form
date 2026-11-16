import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {FormGeneratorElModel} from "../form-generator.model";
import {AbstractControl, ReactiveFormsModule, UntypedFormControl} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {DcFormGeneratorErrorComponent} from "../dc-form-generator-error/dc-form-generator-error.component";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {TranslateModule} from "@ngx-translate/core";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {DataLoaderClass} from "../helpers/DataLoader.class";
import {DataLoadingWatcherService} from "../helpers/DataLoadingWatcher.service";
import {DcHttp} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-fg-numeric-input',
  standalone: true,
  templateUrl: './dc-numeric-input.component.html',
  styleUrls: [],
  imports: [
    DcFormGeneratorErrorComponent,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    TranslateModule,
    MatInput,
    MatError,
    NgIf
  ],
  encapsulation: ViewEncapsulation.None
})
export class DcNumericInputComponent extends DataLoaderClass implements OnInit, OnDestroy, OnChanges {

  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({ required: true }) override control!: UntypedFormControl | AbstractControl;

  @Input() override parentIsVisible: boolean = true;

  decimals = 0;

  constructor(
    _http: DcHttp,
    _dataLoadingWatcher: DataLoadingWatcherService
  ) {
    super(_http, _dataLoadingWatcher);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.setDecimals(this.control.value);
    this.control.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe( (value) => {
        this.setDecimals(value);
      });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

  get formControl(): UntypedFormControl {
    return this.control as UntypedFormControl;
  }

  setDecimals(value: number) {
    if (value === undefined || value === null) {
      this.decimals = 0;
      return;
    }

    const decimalsNumber = value.toString().split('.');
    this.decimals =  decimalsNumber[1] ? decimalsNumber[1].length : 0;
  }
}
