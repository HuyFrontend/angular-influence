
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

const pageStates = [
];

@NgModule({
  imports: [
    UIRouterModule.forChild({ states: pageStates})
  ],
  exports: [
    UIRouterModule
  ]
})
export class PagesRoutingModule {}
