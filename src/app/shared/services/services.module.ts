import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from './utils.service';
import { BaseService } from './base.service';
import { CampaignService } from './campaign/campaign.service';
import { InfluencerService } from './influencer/influencer.service';
import { UserService } from './user/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    UtilsService, 
    BaseService,
    CampaignService,
    InfluencerService,
    UserService
  ],
  exports: []
})
export class ServicesModule { }
