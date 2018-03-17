import { Injectable } from '@angular/core';
import { BaseService } from '@services/index';
import { Config } from '@shared/config';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class InfluencerService {

  constructor(private base: BaseService) { }


  /**
   * get available influencers
   */
  public availableInfluencers = () => {
    const urlAvailableInfluencers = Config.serviceURL.influencer.listing;
    return this.base.postData(urlAvailableInfluencers, {});
  };
}
