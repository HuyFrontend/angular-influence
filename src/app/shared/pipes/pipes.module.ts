import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyCustomPipe } from './currency-custom.pipe';
import { SearchFilterPipe } from './search-filter.pipe';
import { CurrencyFixedTwoPipe } from './currency-fixed-two.pipe';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CurrencyCustomPipe, SearchFilterPipe, CurrencyFixedTwoPipe],
  exports: [CurrencyCustomPipe, SearchFilterPipe, CurrencyFixedTwoPipe]
})
export class PipesModule { }
