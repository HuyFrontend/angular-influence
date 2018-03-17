import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  
  public selectedList: string[];
  @Output() onSelectedMulti = new EventEmitter<Object>();
  @Input() listMulti: { id: string, name: string }[] = [{id: 'itemID', name: 'Item'}];
  @Input() listSelectedInit: { id: string, name: string }[] = [{ id: 'tech', name: 'Tech' }];
  constructor() {
    this.selectedList = [];
  }

  ngOnInit() {
    this.listSelectedInit = [{ id: 'tech', name: 'Tech' }];
  }
  public selectCategory = (id, item) => {
    const isChecked = item.checked;
    console.log(item.value);
    if (!isChecked) {
      //item.closest('label').classList.remove('active');
      this.selectedList = this.selectedList.filter((category) => {
        return category !== id;
      });
    } else {
      //item.closest('label').classList.add('active');
      this.selectedList.push(id);
    }
    this.onSelectedMulti.emit(this.selectedList);
  };

}
