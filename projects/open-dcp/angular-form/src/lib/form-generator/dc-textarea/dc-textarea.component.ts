import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation,} from '@angular/core';
import { FormGeneratorElModel} from "../form-generator.model";
import {AbstractControl, ReactiveFormsModule, UntypedFormControl} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {TranslateModule} from "@ngx-translate/core";
import {MatInput} from "@angular/material/input";
import {DcFormGeneratorErrorComponent} from "../dc-form-generator-error/dc-form-generator-error.component";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {NgIf} from "@angular/common";
import {DataLoaderClass} from "../helpers/DataLoader.class";
import {DataLoadingWatcherService} from "../helpers/DataLoadingWatcher.service";
import {DcHttp} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-fg-textarea',
  standalone: true,
  templateUrl: './dc-textarea.component.html',
  styleUrls: [],
  imports: [
    MatFormField,
    TranslateModule,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    DcFormGeneratorErrorComponent,
    MatError,
    CdkTextareaAutosize,
    NgIf
  ],
  encapsulation: ViewEncapsulation.None
})
export class DcTextareaComponent extends DataLoaderClass implements OnInit, OnDestroy, OnChanges {

  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({ required: true }) override control!: UntypedFormControl | AbstractControl;

  @Input() override parentIsVisible: boolean = true;

  get formControl(): UntypedFormControl {
    return this.control as UntypedFormControl;
  }

  constructor(
    _http: DcHttp,
    _dataLoadingWatcher: DataLoadingWatcherService
  ) {
    super(_http, _dataLoadingWatcher);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (changes['control']?.currentValue?.value && typeof this.control?.value === 'object') {
      this.control.patchValue(JSON.stringify(this.control.value, undefined, 4), {emitEvent: false});
    }
  }
}
