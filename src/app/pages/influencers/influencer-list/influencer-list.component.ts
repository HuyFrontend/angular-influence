import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfluencerService, UtilsService, BaseService } from '@services/index';
import { Subscription } from 'rxjs/Subscription';
import { Utils, Config } from '@shared/index';
@Component({
  selector: 'app-influencer-list',
  templateUrl: './influencer-list.component.html',
  styleUrls: ['./influencer-list.component.scss']
})
export class InfluencerListComponent implements OnInit, OnDestroy {
  private availableInfluencers: any[];
  private influencersSub: Subscription = new Subscription();
  private loginInfo: Object;

  constructor(
    private influencerSerivce: InfluencerService,
    private utilsService: UtilsService
  ) {
    this.loginInfo = {};
    this.availableInfluencers = [];
  }

  ngOnInit() {
    this.getLoginInformation();
    this.getAvailableInfluencers();
  };
  ngOnDestroy() {
    this.influencersSub.unsubscribe();
  };

  private getAvailableInfluencers = () => {
    this.influencersSub =  this.influencerSerivce.availableInfluencers().subscribe((res: any) => {
      this.availableInfluencers = res;
      console.log('this.availableInfluencers', this.availableInfluencers);
    }, (error: any) => {
      Utils.showAlert(Config.alert.type.error, Utils.formatErrorResponse(error));
    });
  };
  /**
   * get login information
   */
  private getLoginInformation = () => {
    this.loginInfo = Utils.getLoginAccountStorage();
    console.log('loginInfo', this.loginInfo);
  }
  /**
   * get login name
   */
  private getImgSrc = (src) => {
    return Utils.getFullPathOfImage(src);
  }
}
