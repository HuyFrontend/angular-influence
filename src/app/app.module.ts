import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppTranslation } from './app.translation';
// import { AppStoreModule } from './store/store.module';

import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';

// store
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer, } from '@ngrx/router-store';
// import { mainStoreReducer } from './state-management/reducers/main-reducers';
import { reducers, metaReducers } from './state-management/reducers/main-reducers';
import { StoreModule } from "@ngrx/store";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppTranslation,
    // AppStoreModule,
    FormsModule,
    LayoutModule,
    PagesModule,
    // StoreModule.forRoot(mainStoreReducer, ),
    StoreModule.forRoot(reducers, { metaReducers }),
    
    // StoreRouterConnectingModule, /** @ngrx/router-store keeps router state up-to-date in the store.*/
    !environment.production ? StoreDevtoolsModule.instrument({}) : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
