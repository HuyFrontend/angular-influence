export interface INotificationUser {
  Id: string;
  FromUserId: string;
  ToUserId: string;
  FromUserName: string;
  ToUserName: string;
  Description: string;
  FromLocation: string;
  ToLocation: string;
  NotificationId: string;
  NotificationCode: string;
  FollowUpId: string;
  CreatedBy: string;
  CreatedDate: Date
};
export class NotificationUser implements INotificationUser {
  Id: string;
  FromUserId: string;
  ToUserId: string;
  FromUserName: string;
  ToUserName: string;
  Description: string;
  FromLocation: string;
  ToLocation: string;
  NotificationId: string;
  NotificationCode: string;
  FollowUpId: string;
  CreatedBy: string;
  CreatedDate: Date;
  constructor(noti: any) {
    this.Id = noti && noti.Id || '';
    this.FromUserName = noti && noti.FromUserId || '';
    this.ToUserId = noti && noti.ToUserId || '';
    this.FromUserName = noti && noti.FromUserName || '';
    this.ToUserName = noti && noti.ToUserName || '';
    this.Description = noti && noti.Description || '';
    this.FromLocation = noti && noti.FromLocation || '';
    this.ToLocation = noti && noti.ToLocation || '';
    this.NotificationId = noti && noti.NotificationId || '';
    this.NotificationCode = noti && noti.NotificationCode || '';
    this.FollowUpId = noti && noti.FollowUpId || '';
    this.CreatedBy = noti && noti.CreatedBy || '';
    this.CreatedDate = noti && noti.CreatedDate || null;
  }
}
