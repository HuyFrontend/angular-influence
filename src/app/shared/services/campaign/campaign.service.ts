import { Injectable } from '@angular/core';
import { BaseService } from '@services/index';
import { Config } from '@shared/config';
import { Subject } from 'rxjs/Subject';
import { Campaign } from '@models/index';

@Injectable()
export class CampaignService {
  private campaignListEndpoint: string;
  
  constructor (private base: BaseService) {
    this.campaignListEndpoint  = Config.serviceURL.campaign.list;
  }

  /**
   * get campaign list
   */
  public campaignList = (url: string = this.campaignListEndpoint, body: Object = {}) => {
    return this.base.postData(url, body);
  };
  /**
   * get running campaign list
   */
  public runningCampaignList = (body?: Object) => {
    const endpointRunningCampaignList = Config.serviceURL.campaign.runningList;
    return this.base.postData(endpointRunningCampaignList, body || {});
  };

  /**
   * delete campaign
   */
  public deleteCampaign = (campaignID) => {
    const url = `${Config.serviceURL.campaign.default}/${campaignID}`;
    return this.base.deleteData(url, {});
  };
  /**
   * update campaign
   */
  public updateCamapaign = (campaignID, body: Object = {}) => {
    const url = `${Config.serviceURL.campaign.default}/${campaignID}`;
    return this.base.updateData(url, body);
  };
   /**
   * add campaign
   */

  public addCamapaign = (campaignFormData: FormData) => {
    const url = `${Config.serviceURL.campaign.default}`;
    return this.base.postDataFormDataType(url, campaignFormData);
  };

}
