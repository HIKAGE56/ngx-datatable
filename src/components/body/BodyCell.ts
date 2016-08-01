import { Component, Input, PipeTransform, HostBinding, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { TableColumn } from '../../models/TableColumn';
import { deepValueGetter } from '../../utils/deepGetter';
import { TemplateWrapper } from '../../directives/TemplateWrapper';

@Component({
  selector: 'datatable-body-cell',
  template: `
    <div class="datatable-body-cell-label">
      <span
        *ngIf="!column.template"
        [innerHTML]="value">
      </span>
      <template
        *ngIf="column.template"
        [value]="value"
        [row]="row"
        [column]="column"
        [templateWrapper]="column.template">
      </template>
    </div>
  `,
  host: {
    '[style.width]': 'column.width + "px"',
    '[style.height]': 'column.height + "px"'
  },
  directives: [ TemplateWrapper ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableBodyCell {

  @Input() column: TableColumn;
  @Input() row: any;

  constructor(element: ElementRef) {
    element.nativeElement.add('datatable-body-cell');
  }

  get value() {
    if (!this.row) return '';
    const prop: any = deepValueGetter(this.row, this.column.prop);
    const userPipe: PipeTransform = this.column.pipe;
    return userPipe ? userPipe.transform(prop) : prop;
  }

}
