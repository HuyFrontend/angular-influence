import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { UtilsService, BaseService } from '@services/index';
import { Config } from '@shared/config';
import { Subscription } from 'rxjs/Subscription';
import { Utils } from '@shared/utils';
import { CookieService } from 'angular2-cookie/core';
import { NotificationUser } from '@models/index';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnChanges, OnDestroy {

  @Input('isOpen') private isOpen: boolean;
  public notifications: NotificationUser[];
  private subscriptionNoti = new Subscription();
  constructor(private utilsService: UtilsService,
    private baseService: BaseService,
    private cookie: CookieService
    ) {
    this.notifications = [];
  }

  ngOnInit() {
    console.log('init noti');
    this.getNotifications();
  }
  ngOnChanges() {
    this.getNotifications();
  }
  ngOnDestroy() {
    this.subscriptionNoti.unsubscribe();
  }
  /**
   * get notifications
   */
  private getNotifications = () => {
    const userInfo = Utils.getLoginAccountStorage();
    if (this.isOpen && Object.keys(userInfo).length) {
      const userID = userInfo['Id'];
      const url = `${Config.serviceURL.notification.notificationListByUser}`;
      
      const body = {
        NotificationId: 1,
        IsRead: false,
        FromUserId: 17,
        ToUserId: userID
      };

      // this.subscriptionNoti = this.baseService.postData(url, body).subscribe( (res: any) => {
      this.subscriptionNoti = this.baseService.getData(url).subscribe( (res: any) => {
        this.notifications = res;
        console.log('notifications', this.notifications);
      }, (error: any) => {
        Utils.showAlert(Config.alert.type.error, Utils.formatErrorResponse(error))
      }, () => {
        
      })
    }
  };

}
