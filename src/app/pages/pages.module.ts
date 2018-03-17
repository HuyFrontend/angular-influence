import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PaymentSummaryComponent } from './payment-summary/payment-summary.component';
import { LoginComponent } from './login/login.component';
import { CampaignDetailComponent } from './campaigns/campaign-detail/campaign-detail.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { MyDatePickerModule } from 'mydatepicker';

import { ComponentsModule } from '../shared/components/components.module';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { InfluencerComponent } from './influencers/influencer/influencer.component';
import { CreditComponent } from './credit/credit.component';
import { InfluencerListComponent } from './influencers/influencer-list/influencer-list.component';
import { MerchantCampaignListComponent } from './merchant/merchant-campaign-list/merchant-campaign-list.component';
import { MerchantCampaignDetailComponent } from './merchant/merchant-campaign-detail/merchant-campaign-detail.component';
import { InfluencerCampaignListComponent } from './influencers/influencer-campaign-list/influencer-campaign-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule,
    ComponentsModule,
    LayoutModule,
    MyDatePickerModule
  ],
  declarations: [
    HomeComponent, 
    RegistrationComponent,
    LoginComponent, 
    CampaignDetailComponent,
    LandingComponent,
    ProfileComponent, 
    InfluencerComponent, 
    CreditComponent, 
    InfluencerListComponent, 
    MerchantCampaignListComponent, 
    MerchantCampaignDetailComponent, InfluencerCampaignListComponent
  ],
  exports: [
    HomeComponent, 
    RegistrationComponent,
    LoginComponent, 
    CampaignDetailComponent, 
    LandingComponent,
    ProfileComponent,
    InfluencerComponent,
    CreditComponent,
    MerchantCampaignListComponent, 
    MerchantCampaignDetailComponent
  ]
})
export class PagesModule { }
