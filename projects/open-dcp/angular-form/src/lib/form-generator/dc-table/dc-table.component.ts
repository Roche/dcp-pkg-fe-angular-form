import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormGeneratorElModel, TableColumnModel} from "../form-generator.model";
import {AbstractControl, ReactiveFormsModule, UntypedFormControl} from "@angular/forms";
import {DcFormGeneratorErrorComponent} from "../dc-form-generator-error/dc-form-generator-error.component";
import {MatError, MatLabel} from "@angular/material/form-field";
import {MatTableModule} from '@angular/material/table';
import {TranslateModule} from "@ngx-translate/core";
import {MatInput} from "@angular/material/input";
import {CommonModule, NgIf} from "@angular/common";
import { DataLoadingWatcherService } from '../helpers/DataLoadingWatcher.service';
import { TableDataLoaderClass } from '../helpers/TableDataLoader.class';
import { DcHttp } from '@open-dcp/angular-services';
import { MatIcon } from '@angular/material/icon';
import { SidePanelComponent } from '@open-dcp/angular-basic-components';
import { DcTableMetaDataComponent } from '../dc-table-metadata/dc-table-metadata.component';

@Component({
  selector: 'odcp-fg-table',
  standalone: true,
  templateUrl: './dc-table.component.html',
  styles: [`
    .dc-table th {
      font-weight: 600 !important;
    }
  `],
  imports: [
    CommonModule,
    DcFormGeneratorErrorComponent,
    DcTableMetaDataComponent,
    ReactiveFormsModule,
    MatLabel,
    MatIcon,
    MatTableModule,
    TranslateModule,
    MatInput,
    MatError,
    NgIf,
    SidePanelComponent
  ],
  encapsulation: ViewEncapsulation.None
})
export class DcTableComponent extends TableDataLoaderClass implements OnInit, OnDestroy, OnChanges {
  
  @ViewChild('sidePanel') sidePanel?: SidePanelComponent;

  @Input({ required: true }) override formEl!: FormGeneratorElModel;

  @Input({ required: true }) override control!: UntypedFormControl | AbstractControl;

  @Input() override parentIsVisible: boolean = true;

  selectedMetaData: any;

  constructor(
    _http: DcHttp,
    _dataLoadingWatcher: DataLoadingWatcherService
  ) {
    super(_http, _dataLoadingWatcher);
  }

  override ngOnInit(): void {
    super.ngOnInit();    
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

  getCellColor(row: any, column: TableColumnModel): string | null {
    return row.Cells[column.OrderIndex]?.Color ?? null;
  }

  hasMetaData(metaData: any) {
    return Object.keys(metaData ?? {}).length > 0;
  }

  onInfoClick(metaData: any) {
    this.selectedMetaData = metaData;
    this.sidePanel?.openDrawer();
  }
}
