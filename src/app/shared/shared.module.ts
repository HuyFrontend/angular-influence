import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { ServicesModule } from './services/services.module';
@NgModule({
  imports: [
    CommonModule,
    SlimLoadingBarModule.forRoot(),
    DirectivesModule,
    PipesModule,
    ServicesModule
  ],
  declarations: [],
  exports: [
    CommonModule, 
    SlimLoadingBarModule, 
    DirectivesModule, 
    PipesModule, 
    ServicesModule
  ],
  providers: []
})
export class SharedModule { }
