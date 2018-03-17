import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { Utils } from '@shared/utils';
import { Obj } from '@uirouter/angular';

@Component({
  selector: 'app-custom-picker',
  templateUrl: './custom-picker.component.html',
  styleUrls: ['./custom-picker.component.scss']
})
export class CustomPickerComponent implements OnInit {

  @Input() label: string = '';
  @Input() minDate: Date = null;
  @Input() dateFormat: string = 'dd/mm/yyyy';
  @Input() initDate: Date = new Date();

  @Output() onSelectedDate: EventEmitter<Object> = new EventEmitter<Object>();

  private myDatePickerOptions: IMyDpOptions;
  private dateModel: Object;
  private dateObj: { year: number, month: number, day: number };
  
  constructor() {
  }

  ngOnInit() {
    console.log('this.dateFormat', this.dateFormat, this.initDate);
    this.myDatePickerOptions = { dateFormat: this.dateFormat, showTodayBtn: false };
    this.dateObj = Utils.parseDate(this.initDate); 
    this.dateModel = {
      date: {
        ...this.dateObj
      }
    }
  }

  public onDateChanged = (event) => {
    let outData: { valid: boolean, date: Date };
    let date = new Date();
    if (event.jsdate) {
      date = new Date(event.jsdate);
      const timeOfDate = date.getTime();
      const timeOfMinDate = this.minDate && new Date(this.minDate).getTime();
      

      if (!this.minDate || timeOfMinDate <= timeOfDate) {
        outData = { valid: true, date: date };
      } else {
        outData = { valid: false, date: date };
      }
     
    } else {
      outData = { valid: false, date: null };
    }
    this.onSelectedDate.next(outData);
    console.log('date', date, 'outData', outData);
  };
}
