import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { LayoutRoutingModule } from './layout-routing.module';
import { ComponentsModule } from '../shared/components/components.module';

import { HeaderComponent } from './header/header.component';
import { OverlayComponent } from './overlay/overlay.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { NotificationComponent } from './notification/notification.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2PageScrollModule.forRoot(),
    LayoutRoutingModule,
    SlimLoadingBarModule.forRoot(),
    ComponentsModule
  ],
  declarations: [HeaderComponent, OverlayComponent, LoadingBarComponent, NotificationComponent, FooterComponent, NavigationComponent],
  providers: [
    CookieService, { provide: CookieOptions, useValue: {} }
  ],
  exports: [HeaderComponent, LayoutRoutingModule, OverlayComponent, LoadingBarComponent, SlimLoadingBarModule, FooterComponent, NavigationComponent]
})
export class LayoutModule { }
