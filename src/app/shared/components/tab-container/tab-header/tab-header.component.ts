import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab-header',
  styleUrls: ['./tab-header.component.scss'],
  template: `
  <ul *ngIf="tabItems && tabItems.length" class="nav nav-tabs nav-tabs-linetriangle">
    <li *ngFor="let item of tabItems; let index = index;" class="tab-header-item" [ngClass]="{'active': selectedIndex == index}">
      <a on-click="changeTab(item.activeTab, index)" data-toggle="tab"><span>{{item.name}}</span></a>
    </li>
  </ul>
  `
})
export class TabHeaderComponent implements OnInit {
  
  public selectedIndex: number;
  @Input() tabItems: Object[] = [{name: 'Tab header 1', activeTab: '0' }, {name: 'Tab header 2', activeTab: '1' }];
  @Output() onTabChanged: EventEmitter<number> = new EventEmitter<number>();
  constructor() {
    this.selectedIndex = 0;
  }

  ngOnInit() {
  }
  public changeTab = (activeTab, index) => {
    this.selectedIndex = index;
    this.onTabChanged.emit(activeTab);
  };
}
