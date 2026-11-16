import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation,} from '@angular/core';
import { FormGeneratorElModel} from "../form-generator.model";
import {AbstractControl, ReactiveFormsModule, UntypedFormControl} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MatCheckbox} from "@angular/material/checkbox";
import {NgIf} from "@angular/common"
import {DataLoadingWatcherService} from "../helpers/DataLoadingWatcher.service";
import {DataLoaderClass} from "../helpers/DataLoader.class";
import {DcHttp} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-fg-checkbox',
  standalone: true,
  templateUrl: './dc-checkbox.component.html',
  styles: ``,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    MatCheckbox,
    NgIf
  ],
  encapsulation: ViewEncapsulation.None
})
export class DcCheckboxComponent extends DataLoaderClass implements OnInit, OnDestroy, OnChanges {

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
  }
}
