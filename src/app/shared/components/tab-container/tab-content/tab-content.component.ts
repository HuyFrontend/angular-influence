import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-content',
  styleUrls: ['./tab-content.component.scss'],
  template: `
    <div class="panel panel-transparent">
      <div class="tab-content">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class TabContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
