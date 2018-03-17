import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab-container',
  styleUrls: ['./tab-container.component.scss'],
  template: `
    <div class="panel panel-transparent tab-container" data-content="container">
      <div class="row">
        <ul *ngIf="tabItems && tabItems.length" class="nav nav-tabs tab-header" data-content="header">
          <li *ngFor="let item of tabItems; let index = index;" class="tab-header-item {{item.customClass}}" [ngClass]="{'selected': selectedIndex == index}">
            <a on-click="changeTab(item.activeTab, index)" data-toggle="tab"><span>{{item.name}}</span></a>
          </li>
        </ul>
      </div>
      <div class="tab-content" data-content="detail">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class TabContainerComponent implements OnInit {

  private selectedIndex: number = 0;
  @Input() tabItems: Object[] = [
    {name: 'Tab 1', activeTab: 0, customClass: '' },
    {name: 'Tab 2', activeTab: 1, customClass: '' }
  ];
  @Output() onTabChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
    // init first tab
    this.onTabChanged.emit(0);
  }
  // tab click event
  public changeTab = (activeTab, index) => {
    this.selectedIndex = index;
    this.onTabChanged.emit(activeTab);
  };
}