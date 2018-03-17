import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-content',
  styleUrls: ['./table-content.component.scss'],
  template: `
    <ng-content></ng-content>
  `
})
export class TableContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
