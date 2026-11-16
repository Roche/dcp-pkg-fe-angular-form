import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {FormGeneratorElModel} from "../form-generator.model";
import {AbstractControl, UntypedFormControl} from "@angular/forms";
import {ConditionsClass} from "../helpers/Conditions.class";
import {NgIf} from "@angular/common";
import {DcHttp} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-fg-text',
  standalone: true,
  template: `
    <p *ngIf="showElement" class="odcp-text">
      {{formEl.Label}}
    </p>
  `,
  styleUrls: [],
  imports: [
    NgIf
  ],
  encapsulation: ViewEncapsulation.None
})
export class DcFormGeneratorTextComponent extends ConditionsClass implements OnInit, OnDestroy, OnChanges {
  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({ required: true }) override control!: UntypedFormControl | AbstractControl;

  @Input() override parentIsVisible: boolean = true;

  constructor(
    _http: DcHttp
  ) {
    super(_http);
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
