
//

import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CampaignService, UtilsService } from '@services/index';
import { Utils, Config } from '@shared/index';
import { UIRouterGlobals, UIRouter } from '@uirouter/angular';
import { Campaign } from '@shared/models';
@Component({
  selector: 'app-influencer-campaign-list',
  templateUrl: './influencer-campaign-list.component.html',
  styleUrls: ['./influencer-campaign-list.component.scss']
})
export class InfluencerCampaignListComponent implements OnInit {

  public campaigns: any[];
  private campaignSubscription: Subscription = new Subscription();
  private targetCampaignID: string = '';
  public campaignType: string = 'discover';
  @ViewChild('confirmModal') confirmModal;
  constructor(
    private utilsService: UtilsService,
    private campaignService: CampaignService,
    private uiRouter: UIRouter,
    private uiGlobals: UIRouterGlobals
  ) {
    this.campaigns = [];
  }

  ngOnInit() {

    this.utilsService.checkAuthorized(Utils.isLoggedIn());
    this.storageCampaignGroup();
    this.getCampaigns();
  }
  private getCampaigns = () => {
    this.utilsService.setOverlay(true);
    let url = Config.serviceURL.campaign.list;
    let body = {};
    console.log('this campaign type', this.campaignType);
    this.arrayCampaigns(url, body);
  };
  private getCampaignType = (): string => {
    return this.campaignType;
  };
  // return array of campaigns
  private arrayCampaigns = (url: string, body: Object = {}) => {
    this.campaignService.campaignList(url, body).subscribe((res: any) => {
        this.campaigns = res;
        this.utilsService.setOverlay(false);
      }, (error: any) => {
        // Utils.showAlert(Config.alert.type.error, Utils.formatErrorResponse(error));
        this.utilsService.setOverlay(false);
        this.campaigns = Config.campaignListTest;
      });
  };

  public onAddFavoriteCampaign = (event: boolean) => {
    console.log('confirm favorite campaign', this.targetCampaignID);
    // this.campaignService.deleteCampaign(this.targetCampaignID).subscribe((res: any) => {
    //   console.log('Delete Campaign', res);
    // }, (error) => {
    //   console.log('error');
    // }, ()=> {
    //   this.getCampaigns();
    // });
  };

  private confirmFavoriteCampaign = (campaign: Campaign) => {
    if (campaign) {
      this.confirmModal.show();
      this.targetCampaignID = campaign.Id;
    }
  };

  /**
   * open campaign details
   */
  private campaignDetails = (campaign: Campaign) => {
    Utils.setCampaignStorage(campaign);
    this.uiRouter.stateService.go('merchantCampaignDetailPage', {id: campaign.Id});
  };
  /**
   * campaign group
   */
  private storageCampaignGroup = () => {
    this.campaignType = (this.uiGlobals && this.uiGlobals.params && this.uiGlobals.params.type) ? this.uiGlobals.params['type'] : this.campaignType;
    localStorage.setItem(Config.storageAndCookies.campaignGroup, this.campaignType);
  }
}
