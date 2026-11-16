import {AsyncPipe, NgIf} from "@angular/common";
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, ReactiveFormsModule, UntypedFormControl } from "@angular/forms";
import { MatInput, MatLabel } from "@angular/material/input";
import { TranslateModule } from '@ngx-translate/core';
import { uiStore } from '@open-dcp/services';
import { BehaviorSubject, takeUntil } from "rxjs";
import moment from 'moment';
import { DcFormGeneratorErrorComponent } from "../dc-form-generator-error/dc-form-generator-error.component";
import { FormGeneratorElModel } from "../form-generator.model";
import {MatError} from "@angular/material/form-field";
import {DataLoadingWatcherService} from "../helpers/DataLoadingWatcher.service";
import {DataLoaderClass} from "../helpers/DataLoader.class";
import {DcHttp} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-fg-date-time',
  standalone: true,
  templateUrl: './dc-date-time.component.html',
  imports: [
    DcFormGeneratorErrorComponent,
    AsyncPipe,
    TranslateModule,
    ReactiveFormsModule,
    MatInput,
    MatLabel,
    MatError,
    NgIf
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None
})
export class DcDateTimeComponent extends DataLoaderClass implements OnInit, OnDestroy, OnChanges {

  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({ required: true }) override control!: UntypedFormControl | AbstractControl;

  @Input() override parentIsVisible: boolean = true;

  formControl = new UntypedFormControl();

  timeZoneBs$ = new BehaviorSubject<string>('');
  isLoadingBs$ = new BehaviorSubject<boolean>(false);
  languageBs$ = new BehaviorSubject<string>('en');

  timeZone$ = this.timeZoneBs$.asObservable();
  isLoading$ = this.isLoadingBs$.asObservable();
  language$ = this.languageBs$.asObservable();
  private uiUnsubscribe = () => {};

  constructor(
    _http: DcHttp,
    _dataLoadingWatcher: DataLoadingWatcherService
  ) {
    super(_http, _dataLoadingWatcher);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.uiUnsubscribe = uiStore.subscribe(state => {
      this.timeZoneBs$.next(state.site.timeZone || '');
      this.isLoadingBs$.next(Object.keys(state.loading).length > 0);
      this.languageBs$.next(state.language);
    });

    if (this.control.disabled) {
      this.formControl.disable();
    }

    if (this.control.value) {
      const formattedDate = moment(this.control.value).local().format("YYYY-MM-DDTHH:mm");
      this.formControl.patchValue(formattedDate);
    }

    this.formControl.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(value => {
      const formattedValue = this.formatValue(value);
      if (formattedValue !== this.control.value) {
        this.control.patchValue(formattedValue);
      }
    });

    this.control.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        const formattedDate = moment(value).local().format("YYYY-MM-DDTHH:mm");
        if (formattedDate !== this.formControl.value) {
          this.formControl.patchValue(value);
        }
        if (this.control.disabled !== this.formControl.disabled) {
          if (this.control.disabled) {
            this.formControl.disable();
          } else {
            this.formControl.enable();
          }
        }
      });
  }

  get value() {
    return this.control.value || [];
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.uiUnsubscribe();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

  dateTimeChange(dateTime: string) {
    this.control.patchValue(dateTime);
  }

  eventDateTime(event: any) {
    return event as {detail: string};
  }

  private formatValue(value: string): string {
    if (!value) {
      return "";
    }
    return new Date(value).toISOString();
  }
}
