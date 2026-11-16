import {Component, Input, ViewEncapsulation} from '@angular/core';
import {MatError, MatLabel} from "@angular/material/form-field";
import {MatTableModule} from '@angular/material/table';
import {TranslateModule} from "@ngx-translate/core";
import {MatInput} from "@angular/material/input";
import {CommonModule, NgIf} from "@angular/common";
import { MatIcon } from '@angular/material/icon';
import { SidePanelComponent } from '@open-dcp/angular-basic-components';

@Component({
  selector: 'odcp-table-metadata',
  standalone: true,
  templateUrl: './dc-table-metadata.component.html',
  styles: [`
    .action-container {
      padding: 16px;
    }
    .meta-data-container {
      padding-left: 16px;
    }
    .meta-data-field-value-list {
      padding: 0;
    }
    .meta-data-field-value-list li {
      display: list-item;
      list-style-type: disc;
    }
  `],
  imports: [
    CommonModule,
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
export class DcTableMetaDataComponent {

  @Input() data: any;
  
  isObject(value: any) {
    return !!value && typeof value === 'object' && !Array.isArray(value);
  }

  isArray(value: any) {
    return Array.isArray(value);
  }

  isPrimitive(value: any) {
    return value === null || typeof value !== 'object';
  }

  objectEntries(value: Record<string, any>) {
    return Object.entries(value);
  }

  displayValue(value: any) {
    if (value === null) {
      return '';
    }

    if (value === undefined) {
      return '';
    }

    return String(value);
  }
}
