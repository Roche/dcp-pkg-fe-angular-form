import {AfterViewInit, Component, ElementRef, Input, OnDestroy, Renderer2} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {NgIf} from "@angular/common";
import {RemoveHost} from "@open-dcp/angular-services";

@Component({
  selector: 'odcp-form-generator-hint',
  standalone: true,
  template: `<span class="odcp-hint" *ngIf="description" [innerHTML]="description"></span>`,
  imports: [
    TranslateModule,
    NgIf
  ],
  styleUrls: []
})
export class DcFormGeneratorHintComponent extends RemoveHost implements AfterViewInit, OnDestroy {

  @Input({ required: true }) description!: string | null | undefined;

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
}
