import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCustom'
})
export class CurrencyCustomPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return value;
    }
    const re = '\\d(?=(\\d{' + 3 + '})+' +  '$)';
    if (typeof value !== 'number') {
      value = parseInt(value, 10);
    }
    return value.toFixed(Math.max(0)).replace(new RegExp(re, 'g'), '$&,');
  }
}
