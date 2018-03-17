import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value, keys: string, term: string): any {
    if (!term) {
      return value;
    } else {
      return (value || []).filter( (item) => {
        return keys.split(',').some( (key) => {
          return ( item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key]));
        });
      });
    }
  }
}
