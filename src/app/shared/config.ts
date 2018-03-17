import { environment } from '../../environments/environment';
export class Config {
  
  public static components = {
    header: {
      hidden: 'hidden'
    }
  };

  /* Config URL */
  public static serviceURL = {
    reviewList: `${environment.baseAPI}ReviewListing`,
    // notification: `${environment.baseAPI}NotificationTransaction?ToId={userID}`,
    notificationNew: `${environment.baseAPI}Notification`,
    notification: {
      notificationListByUser: `${environment.baseAPI}NotificationTransaction`
    },
    
    campaign: {
      default: `${environment.baseAPI}Campaign`, // use for campaign update and delete endpoint: Campaign/[campaignID]
      list: `${environment.baseAPI}CampaignListing`,
      runningList: `${environment.baseAPI}CampaignRunningList`,
      runningCampaign: `${environment.baseAPI}CampaignRunning`
    },

    influencer: {
      listing: `${environment.baseAPI}InfluencerListing`,
    },
    user: {
      profile: `${environment.baseAPI}UserProfile`,
      login: `${environment.baseAPI}Login`,
    },
    googlePlace: `http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places&key=AIzaSyCjmIL9_9nGSMtt5uJddAPHVGKzkz1IyoA`,
    gooleSearchText: `http://maps.googleapis.com/maps/api/place/textsearch/json?&key=AIzaSyCjmIL9_9nGSMtt5uJddAPHVGKzkz1IyoA&keyword={key}`
  };

  /* Const header */
  public static defaultHeader = {
    contentType: {
      key: 'Content-Type',
      value: 'application/json;charset=utf-8'
    },
    inflKey: {
      key: 'Infl-Key',
      value: '945bdc67cd0e3fc4975eed8e3895cd8e'
    }
  };

  /* Const storage keys */
  public static storageAndCookies = {
    token: 'userToken',
    userInfo: 'userInfo',
    userType: {
      key: 'userType'
    },
    campaignDetail: 'campaignDetail',
    merchantCampaignGroup: 'merchantCampaignGroup',
    influencerCampaignGroup: 'influencerCampaignGroup',
    campaignGroup: 'campaignGroup'
  };
  
  public static IFLUENCE_DOMAIN = environment.webClient;
  
  /** Default images size */
  public static imagePlacehold = {
    default: 'assets/img/noimage150x150.png'
  };

  /** Definition date type format */
  public static dateFormatType = {
    defaultDate: 'mm/dd/yyyy',
    asiaDate: 'dd/mm/yyyy',
    asiaDateDash: 'dd-mm-yyyy',
    dateTime: 'yyyy/mm/dd hh:mm:ss',
    yearMonthDayDash: 'yyyy-mm-dd'
  };
  /** Alert config */
  public static alert = {
    type: {
      success: 'success',
      error: 'error'
    },
    message: {
      error: {
        defaul: 'Error',
        logout: 'Logout error',
      },
      success: {
        default: 'Success',
        logout: 'Logout successfully',
        login: 'Login successfully',
        updateData: 'Update successfully',
        addData: 'Add successfully',
        register: 'Register successfully, waiting for approval'
      }
    }
  };
  public static campaignListTest = [{"Id":"2","Name":"Cooling Fan Portable Desk","Description":"Allows you to cool your laptop and work anywhere.","Price":"12000.00","NoOfInfluencer":"5","NoOfPosting":"5","Charges1":"0.00","Charges1Desc":"gst","Charges2":"0.00","Charges2Desc":"-","Charges3":"0.00","Charges3Desc":"-","TotalCost":"12600.00","PhotoIdList":"1","TagIdList":"","IsActive":"1","FromDate":"2017-03-06 00:00:00","ToDate":"2017-05-05 00:00:00","DaysLeft":"-60","CreatedBy":"17","PromoTitle":"X Gear Tech","PromoCaption":null,"PromoDescription":null,"CreatedDate":"2017-03-05 14:48:47","Running":[{"Id":"1","CampaignId":"2","InfluencerId":"18","AgreedTotalCost":"3.00","AgreedNoOfPosting":"1","StatusId":"19","CampaignPaymentId":"0","CreatedBy":"17","CreatedDate":"2017-05-02 17:33:14"},{"Id":"2","CampaignId":"2","InfluencerId":"2","AgreedTotalCost":"3.00","AgreedNoOfPosting":"1","StatusId":"18","CampaignPaymentId":"0","CreatedBy":"2","CreatedDate":"2017-08-01 08:28:28"}],"PhotoList":[{"id":"1","Url":"uploads\/2017-03-05\/\/xgear3DOTjpg-148869652758bbb4cf778a62017-03-05.jpeg","Blob":"-","CreatedBy":"APIv1","CreatedDate":"2017-03-05 14:48:47"}],"FacebookStat":{"TotalPostComment":0,"TotalLike":0,"TotalPostShare":0}},{"Id":"3","Name":"Campaign2","Description":"Campaign2 is about campaign2 details","Price":"2000.00","NoOfInfluencer":"5","NoOfPosting":"5","Charges1":"0.00","Charges1Desc":"gst","Charges2":"0.00","Charges2Desc":"-","Charges3":"0.00","Charges3Desc":"-","TotalCost":"2100.00","PhotoIdList":"","TagIdList":"","IsActive":"1","FromDate":"2017-07-31 00:00:00","ToDate":"2017-08-31 00:00:00","DaysLeft":"-31","CreatedBy":"17","PromoTitle":"X Gear Tech","PromoCaption":null,"PromoDescription":null,"CreatedDate":"2017-07-30 13:21:43","Running":[{"Id":"3","CampaignId":"3","InfluencerId":"2","AgreedTotalCost":"3.00","AgreedNoOfPosting":"1","StatusId":"17","CampaignPaymentId":"0","CreatedBy":"2","CreatedDate":"2017-08-12 11:07:17"}],"PhotoList":[],"FacebookStat":{"TotalPostComment":0,"TotalLike":0,"TotalPostShare":0}}];
};

