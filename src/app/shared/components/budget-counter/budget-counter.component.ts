import { Component, OnInit,Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-budget-counter',
  templateUrl: './budget-counter.component.html',
  styleUrls: ['./budget-counter.component.scss']
})
export class BudgetCounterComponent implements OnInit {

  @Input() counterTitle: string = '';
  @Input() counterValue: number = 0;
  @Input() minValue: number = 0;
  @Output() onCountingValue: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }
  /**
   * couting value and emit to parent
   * increase
  */
  public increaseValue = () => {
    this.counterValue++;
    this.onCountingValue.next(this.counterValue);
  };
    /**
   * couting value and emit to parent
   * decrease
  */
  public descreaseValue = () => {
    if (this.counterValue > this.minValue) {
      this.counterValue--;
      this.onCountingValue.next(this.counterValue);
    }
  };
}
