import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFixedTwo' // return 12,000.00
})
export class CurrencyFixedTwoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return value;
    }
    if (typeof value !== 'number') {
      value = parseInt(value, 10);
    }
    return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }

}