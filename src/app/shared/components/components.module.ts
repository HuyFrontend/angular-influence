import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UIRouterModule } from '@uirouter/angular';
import { MyDatePickerModule } from 'mydatepicker';

import { PopupComponent } from './popup/popup.component';
import { FacebookAuthComponent } from './facebook-auth/facebook-auth.component';
import { InstagramAuthComponent } from './instagram-auth/instagram-auth.component';

import { TabContainerComponent } from './tab-container/tab-container.component';
import { TabHeaderComponent } from './tab-container/tab-header/tab-header.component';
import { TabContentComponent } from './tab-container/tab-content/tab-content.component';

import { TableContainerComponent } from './table-container/table-container.component';
import { TableHeaderComponent } from './table-container/table-header/table-header.component';
import { TableContentComponent } from './table-container/table-content/table-content.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { BudgetItemComponent } from './budget-item/budget-item.component';

import { PipesModule } from './../pipes/pipes.module';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ModalCustomComponent } from './modal-custom/modal-custom.component';
import { CategoryComponent } from './category/category.component';
import { BudgetCounterComponent } from './budget-counter/budget-counter.component';
import { CustomPickerComponent } from './custom-picker/custom-picker.component';
import { ImageFormfieldComponent } from './image-formfield/image-formfield.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NgxCarouselModule } from 'ngx-carousel';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    UIRouterModule.forChild({}),
    MyDatePickerModule,
    NgxCarouselModule
  ],
  declarations: [
    PopupComponent, 
    FacebookAuthComponent, 
    InstagramAuthComponent, 
    TabContainerComponent, 
    TabHeaderComponent, 
    TabContentComponent, 
    TableContainerComponent, 
    TableHeaderComponent, 
    TableContentComponent, 
    ErrorMessageComponent, 
    BudgetItemComponent, 
    ConfirmModalComponent, 
    ModalCustomComponent, 
    CategoryComponent,
    BudgetCounterComponent, 
    CustomPickerComponent, 
    ImageFormfieldComponent, 
    CarouselComponent
  ],
  exports: [
    UIRouterModule,
    PopupComponent, 
    FacebookAuthComponent, 
    InstagramAuthComponent,
    TabContainerComponent, 
    TabHeaderComponent, 
    TabContentComponent, 
    TableContainerComponent, 
    TableHeaderComponent, 
    TableContentComponent, 
    ErrorMessageComponent, 
    BudgetItemComponent, 
    ConfirmModalComponent, 
    ModalCustomComponent, 
    CategoryComponent,
    BudgetCounterComponent,
    CustomPickerComponent,
    ImageFormfieldComponent,
    CarouselComponent
  ]
})
export class ComponentsModule { }
