import {AfterViewInit, Component, ElementRef, Input, OnDestroy, Renderer2} from '@angular/core';
import {AbstractControl, UntypedFormControl} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {JsonPipe, NgIf} from "@angular/common";
import {RemoveHost} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-form-generator-error',
  standalone: true,
  templateUrl: './dc-form-generator-error.component.html',
  imports: [
    TranslateModule,
    NgIf,
    JsonPipe
  ],
  styleUrls: []
})
export class DcFormGeneratorErrorComponent extends RemoveHost implements AfterViewInit, OnDestroy {

  @Input({ required: true }) control!: UntypedFormControl | AbstractControl;

  constructor(
    _elRef: ElementRef,
    _renderer: Renderer2
  ) {
    super(_elRef, _renderer);
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  getErrorKey(errors: any): string {
    return Object.keys(errors)[0] || '';
  }

}
