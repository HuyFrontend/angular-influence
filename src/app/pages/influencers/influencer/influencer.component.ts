import { Component, OnInit } from '@angular/core';
import { CampaignService, UtilsService } from '@services/index';
import { Utils, Config } from '@shared/index';
import { Campaign } from '@models/index';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-influencer',
  templateUrl: './influencer.component.html',
  styleUrls: ['./influencer.component.scss']
})
export class InfluencerComponent implements OnInit {
  private tabItems: Object[];
  private indexActive: number;
  private activeTab: string;
  private campaigns: Campaign[];
  private runningCampaigns: any[];
  private completedCampaigns: any[];

  constructor(
    private utilsService: UtilsService,
    private campaignService: CampaignService,
    private domSanitizer: DomSanitizer,
  ) {
    this.tabItems = [ { name: 'All', activeTab: 'tabAll' }, { name: 'Applied', activeTab: 'tabRunning' }, { name: 'Running', activeTab: 'tabRunning' }, { name: 'Completed', activeTab: 'tabCompleted' } ];
    this.indexActive = 0;
    this.activeTab = '';
    this.campaigns = [];
    this.runningCampaigns = [];
    this.completedCampaigns = [];
  }

  ngOnInit() {
    this.utilsService.checkAuthorized(Utils.isLoggedIn());
    this.getCampaigns();
    this.getRunningCampaigns();
  }

  /**
   * get campaign list
   */
  private getCampaigns = () => {
    this.campaignService.campaignList().subscribe((res: any) => {
      this.campaigns = res;
      console.log('cam', this.campaigns);
    }, (error: any) => {
      Utils.showAlert(Config.alert.type.error, Utils.formatErrorResponse(error));
    });
  };
  /**
   * get running campaign list
   */
  private getRunningCampaigns = () => {
    this.campaignService.runningCampaignList().subscribe((res: any) => {
      this.runningCampaigns = res;
      console.log('runningCampaigns', this.runningCampaigns);
    }, (error: any) => {
      Utils.showAlert(Config.alert.type.error, Utils.formatErrorResponse(error));
    });
  };

  /**
   * get source link image
   */
  private getImgLink = (campaign: Campaign) => {
    if (campaign && campaign['PhotoList'] && campaign['PhotoList'].length) {
      return Utils.getFullPathOfImage(campaign['PhotoList'][0]['Url']);
    } else {
      return Config.imagePlacehold.default;
    }
  };
  
  /**
   * durations
   */
  private getDuration = (fromDate, toDate) => {
    return Utils.differentDates(fromDate, toDate);
  };
}
