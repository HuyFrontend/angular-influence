
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { CampaignDetailComponent } from './pages/campaigns/campaign-detail/campaign-detail.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MerchantCampaignListComponent } from './pages/merchant/merchant-campaign-list/merchant-campaign-list.component';
import { MerchantCampaignDetailComponent } from './pages/merchant/merchant-campaign-detail/merchant-campaign-detail.component';
import { InfluencerCampaignListComponent } from './pages/influencers/influencer-campaign-list/influencer-campaign-list.component';

import { ProfileComponent } from './pages/profile/profile.component';
import { InfluencerComponent } from './pages/influencers/influencer/influencer.component';
import { InfluencerListComponent } from './pages/influencers/influencer-list/influencer-list.component';
import { CreditComponent } from './pages/credit/credit.component';

let mainStates = [
  { name: 'main', url: '/', redirectTo: 'homePage' },
  { name: 'homePage', url: '', component: HomeComponent },

  { name: 'landingPage', url: '/landing', component: LandingComponent },
  { name: 'loginPage', url: '/login', component: LoginComponent },

  { name: 'merchantCampaignListPage', url: 'merchant/campaigns?type', component: MerchantCampaignListComponent },
  { name: 'merchantCampaignDetailPage', url: 'merchant/campaign/:id', component: MerchantCampaignDetailComponent },
  
  { name: 'influencerCampaignListPage', url: 'influencer/campaigns?type', component: InfluencerCampaignListComponent },

  { name: 'campaignDetailPage', url: '/campaign/:id', component: CampaignDetailComponent },

  { name: 'registerPage', url: '/register', component: RegistrationComponent },
  { name: 'newCampaign', url: '/campaign/new', component: CampaignDetailComponent },

  { name: 'profilePage', url: '/profile', component: ProfileComponent },
  { name: 'influencerPage', url: '/influencer', component: InfluencerComponent },
  { name: 'availavleInfluencerPage', url: '/influencers/available', component: InfluencerListComponent },

  { name: 'creditPage', url: '/credit', component: CreditComponent },

]

@NgModule({
  imports: [
    UIRouterModule.forRoot({ states: mainStates })
  ],
  exports: [
    UIRouterModule
  ]
})
export class AppRoutingModule {
  constructor() {
  }
}
