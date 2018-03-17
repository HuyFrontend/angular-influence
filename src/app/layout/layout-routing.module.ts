import { NgModule } from '@angular/core';
import { UIRouterModule, UIRouter } from '@uirouter/angular';


/*const layoutStates = [
  { name: 'about', url: '/about',  component: '' }
];*/

@NgModule({
  imports: [
    UIRouterModule.forChild({ /*states: layoutStates*/ })
  ],
  exports: [
    UIRouterModule
  ]
})
export class LayoutRoutingModule {}
