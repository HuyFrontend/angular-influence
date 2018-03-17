import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseService, CampaignService } from '@services/index';
import { Campaign } from '@models/index';
import { error } from 'util';
import { OnChanges, SimpleChanges, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Utils } from '@shared/utils';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { UIRouterGlobals, UIRouter, } from '@uirouter/angular';
import { Config } from '@shared/config';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss']
})
export class CampaignDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() campaignItem;

  public categories: string[];
  public campaign: Campaign;
  public imageSrc: string = Config.imagePlacehold.default;
  
  private isSubmit: boolean;
  private campaignName: string;
  private myDatePickerOptions: IMyDpOptions = { dateFormat: 'dd/mm/yyyy', };

  private initDateFrom: Date;
  private initDateTo: Date;
  
  constructor(private campaignService: CampaignService,
    private uiGlobals: UIRouterGlobals,
    private uiRouter: UIRouter,
    private baseService: BaseService
  ) {
    this.categories = [];
    this.campaign = new Campaign();
    this.initDateFrom = new Date();
    this.initDateTo = new Date();
    this.isSubmit = false;
    this.campaignName = '';
  }

  ngOnInit() {
    !Utils.isLoggedIn() && this.uiRouter.stateService.go('landingPage');
    this.campaign = Utils.getCampaignStorage();
    console.log('campaign', this.campaign);
    this.campaignName = this.campaign['Name'];
    if (!this.campaign.Id && this.uiGlobals.params.id) {
      this.uiRouter.stateService.go('merchantCampaignListPage');
    } else {
      this.initDateFrom = this.campaign.FromDate ? new Date(this.campaign.FromDate) : this.initDateFrom;
      this.initDateTo = this.campaign.ToDate ? new Date(this.campaign.ToDate) : this.initDateTo;

      this.campaign.FromDate = Utils.dateToString(this.initDateFrom, Config.dateFormatType.yearMonthDayDash);
      this.campaign.ToDate = Utils.dateToString(this.initDateTo, Config.dateFormatType.yearMonthDayDash);

      if (this.campaign.Id) {
        this.campaign.Mode = 'EDIT';
      }
    }
  }
  ngOnChanges(change: SimpleChanges) {
  }
  ngOnDestroy() {
    Utils.removeCampaignStorage();
  }
  public onSelectedDate = (event) => {
    console.log('onSelectedDate', event);
    if (event && event.valid) {
      this.campaign.FromDate = Utils.dateToString(event.date, Config.dateFormatType.yearMonthDayDash);
    }
  };
  public onSelectedDateTo = (event) => {
    if (event && event.valid) {
      this.campaign.ToDate = Utils.dateToString(event.date, Config.dateFormatType.yearMonthDayDash);
    }
  };

  public getCategories = (list) => {
    this.categories = list;
    console.log('cat', this.categories);
  };

  public onSubmit = (form) => {
    console.log('for', form.controls);
    this.isSubmit = true;
    if (form.valid) {
      this.submitData();
    }
  };
  
  private getTotlaCost = () => {
    const price = Math.round(this.campaign.Price);
    this.campaign.TotalCost = price + (price * 10 / 100);
  };

  private validate = () => {
    let isValid = true;
    return isValid;
  };
  private submitData = () => {
    // add total cost
    this.getTotlaCost();
    if (this.campaign && this.campaign.Mode && this.campaign.Mode === 'ADD') {

      this.baseService.postData(Config.serviceURL.campaign.default, this.campaign).subscribe( (res: any) => {
        Utils.showAlert(Config.alert.type.success, Config.alert.message.success.addData);
      }, (error) => {
        Utils.showAlert(Config.alert.type.error, Utils.formatErrorResponse(error));
      });
    } else if (this.campaign && this.campaign.Mode && this.campaign.Mode === 'EDIT') {
      this.campaignService.updateCamapaign(this.campaign.Id, this.campaign).subscribe((res: any) => {
        console.log('updated status', res);
        Utils.showAlert(Config.alert.type.success, Config.alert.message.success.updateData);
      }, (error: any) => {
        Utils.showAlert(Config.alert.type.error, Utils.formatErrorResponse(error));
      });
    }
  };
}
