
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CampaignService, UtilsService } from '@services/index';
import { Utils, Config } from '@shared/index';
import { UIRouterGlobals, UIRouter } from '@uirouter/angular';
import { Campaign } from '@shared/models';
@Component({
  selector: 'app-merchant-campaign-list',
  templateUrl: './merchant-campaign-list.component.html',
  styleUrls: ['./merchant-campaign-list.component.scss']
})
export class MerchantCampaignListComponent implements OnInit {

  public campaigns: any[];
  private campaignSubscription: Subscription = new Subscription();
  private targetCampaignID: string = '';
  private campaignType: string = 'all';

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

    const campaignListType = localStorage.getItem(Config.storageAndCookies.merchantCampaignGroup);
    switch (campaignListType) {
      case 'all':
      case '':
        break;
      
      case 'draft':
        body = { IsActive: '00' };
        break;
      
      case 'completed':
      case 'running':
        url = Config.serviceURL.campaign.runningList;
        body = { IsActive: '01' };
        break;
      default:
        break;
    };
    this.arrayCampaigns(url, body);
  };
  // return array of campaigns
  private arrayCampaigns = (url: string, body: Object = {}) => {
    this.campaignService.campaignList(url, body).subscribe((res: any) => {
        this.campaigns = res;
        console.log('Campaign List', res);
        this.utilsService.setOverlay(false);
      }, (error: any) => {
        // Utils.showAlert(Config.alert.type.error, Utils.formatErrorResponse(error));
        this.utilsService.setOverlay(false);
        this.campaigns = Config.campaignListTest;
      });
  };

  public onConfirmedDeleteCampaign = (event: boolean) => {
    console.log('this.targetCampaignI', this.targetCampaignID);
    this.campaignService.deleteCampaign(this.targetCampaignID).subscribe((res: any) => {
      console.log('Delete Campaign', res);
    }, (error) => {
      console.log('error');
    }, ()=> {
      this.getCampaigns();
    });
  };

  private poupDeleteCampaign = (campaign: Campaign) => {
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
    localStorage.setItem(Config.storageAndCookies.merchantCampaignGroup, this.campaignType);
  }
}
