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
import { MatIconButton } from "@angular/material/button";
import {MatError, MatFormField} from "@angular/material/form-field";
import {DataLoaderClass} from "../helpers/DataLoader.class";
import {DataLoadingWatcherService} from "../helpers/DataLoadingWatcher.service";
import {DcHttp} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-fg-time-range',
  standalone: true,
  templateUrl: './dc-time-range.component.html',
  styleUrl: './dc-time-range.component.scss',
  imports: [
    DcFormGeneratorErrorComponent,
    AsyncPipe,
    TranslateModule,
    ReactiveFormsModule,
    MatInput,
    MatLabel,
    MatIconButton,
    MatError,
    NgIf,
    MatFormField
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None
})
export class DcTimeRangeComponent extends DataLoaderClass implements OnInit, OnDestroy, OnChanges {

  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({ required: true }) override control!: UntypedFormControl | AbstractControl;

  @Input() override parentIsVisible: boolean = true;

  get formControl(): UntypedFormControl {
    return this.control as UntypedFormControl;
  }

  timeRange: ITimeRange = {
      StartTime: moment().subtract(4, 'hours').toISOString() ?? '',
      EndTime: moment().toISOString() ?? ''
  };

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

    this.control.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
         this.timeRange = value;
      });

    if (this.control.value) {
      this.timeRange = this.control.value;
    }
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.uiUnsubscribe();
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

  timeRangeSelected(event: Event) {
    const data = (event as CustomEvent).detail;
    if (data?.StartTime !== this.timeRange?.StartTime || data?.EndTime !== this.timeRange?.EndTime) {
      this.formControl.patchValue(data);
    }
  }
}

export interface ITimeRange {
  StartTime: string;
  EndTime: string;
}
