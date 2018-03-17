
import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
	selector: 'app-merchant-campaign-detail',
  	templateUrl: './merchant-campaign-detail.component.html',
  	styleUrls: ['./merchant-campaign-detail.component.scss']
})
export class MerchantCampaignDetailComponent implements OnInit, OnChanges, OnDestroy {
  	private campaignType: string = 'all';
  
  	@Input() campaignItem;

	public categories: string[];
	public campaign: Campaign;
  
	private isSubmit: boolean;
	private campaignName: string;
	private myDatePickerOptions: IMyDpOptions = { dateFormat: 'dd/mm/yyyy', };

	private initDateFrom: Date;
	private initDateTo: Date;
	
	// new
	private tabItems: { name?: string, activeTab?: number, customClass?: string }[];
	private activeTab: string = '';
	private tabItemsOfInfluencers: { name?: string, activeTab?: number, customClass?: string }[];
	private activeTabOfInFluencers: string = '';
	private acctionForInfluence: string = 'accept';
	private campaignPhotos: {Url: string}[] = [];
	private dialogMessage: string = '';
	private imageDefault: string = Config.imagePlacehold.default;
	@ViewChild('confirmModal') confirmModal;

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
		this.tabItems = [ 
			{ name: 'Campaign Details', activeTab: 0, customClass: 'col-md-4 col-sm-4'}, 
			{ name: 'List of Influencers', activeTab: 1, customClass: 'col-md-4 col-sm-4' }, 
			{ name: 'Report', activeTab: 2, customClass: 'col-md-4 col-sm-4' }
		];

    	this.tabItemsOfInfluencers = [
			{ name: 'Applied', activeTab: 0, customClass: ''}, 
			{ name: 'Accepted', activeTab: 1, customClass: '' }
		];
  	}

  	ngOnInit() {
		!Utils.isLoggedIn() && this.uiRouter.stateService.go('landingPage');
		this.getCampaignGroup();
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
	/**
   * get campaign group storage
   */
	private getCampaignGroup = () => {
		const campaignGroup = localStorage.getItem(Config.storageAndCookies.merchantCampaignGroup);
		this.campaignType = campaignGroup ? campaignGroup : this.campaignType;
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

  /**
   * popup event
   */
  	public onConfirmedDeleteCampaign = (event: boolean) => {
		console.log('event', event, 'this.acctionForInfluence', this.acctionForInfluence);
		
		if (this.acctionForInfluence === 'accept') {
			const body = {
				Id: '2', 
				CampaignId: '2', 
				MerchantId: '3', 
				StatusId: '18', 
				StatusCode: '18', 
				InfluencerId: '2', 
				Step: '1'
			};
			this.baseService.postData(Config.serviceURL.campaign.runningCampaign, body).subscribe((data: any) => {
			
			}, (error: any) => {

			});
		} else if (this.acctionForInfluence === 'reject') {
			const campaignID = '2';
			this.baseService.deleteData(Config.serviceURL.campaign.runningCampaign + `/${campaignID}`, {}).subscribe((data: any) => {

			}, (error: any) => {

			});
		}
	};

	private poupActionForInfluence = (id?: string, action?: string) => {
		if (id && action) {
			this.dialogMessage = (action === 'accept') ? 'You want to accept this item' : 'You want to reject this item';
			this.confirmModal.show();
			this.acctionForInfluence = action;
		}
	};

	/**
	 * get image full path
	 */
    private getImageFullPath = (relativePath: string): string => {
		if(relativePath) {
			return Utils.getFullPathOfImage(relativePath);
		} else {
			return Config.imagePlacehold.default;
		}
	};

}
