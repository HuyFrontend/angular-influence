import { Component, OnInit, Input } from '@angular/core';
import { Budget } from '@models/index';
@Component({
  selector: 'app-budget-item',
  templateUrl: './budget-item.component.html',
  styleUrls: ['./budget-item.component.scss']
})
export class BudgetItemComponent implements OnInit {

  @Input() budgetInfo: Budget;
  
  constructor() { }

  ngOnInit() {
  }

}
