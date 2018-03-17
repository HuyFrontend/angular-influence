import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-container',
  styleUrls: ['./table-container.component.scss'],
  template: `
  <table class="table table-hover demo-table-search">
    <ng-content></ng-content>
  </table>
  `
})
export class TableContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
