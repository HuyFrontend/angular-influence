import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-header',
  styleUrls: ['./table-header.component.scss'],
  template: `
      <tr>
        <th width="{{item.width}}" *ngFor="let item of tableColumns">{{item.name}}</th>
      </tr>
  `
})
export class TableHeaderComponent implements OnInit {

  @Input() tableColumns: Object[] = [{name: 'Col 1', width: '50%'}, {name: 'Col 2', width: '50%'}];
  constructor() {
    
  }

  ngOnInit() {
  }

}
