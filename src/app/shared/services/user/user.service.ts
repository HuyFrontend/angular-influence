import { Injectable } from '@angular/core';
import { BaseService } from '@services/index';
import { Config } from '@shared/config';
import { Subject } from 'rxjs/Subject';
import { User } from '@models/index';

@Injectable()
export class UserService {

  constructor(private base: BaseService) { }

  /**
   * register
   * @param {data} : User
   */
  public register = (data: Object) => {
    return this.base.postData(Config.serviceURL.user.profile, data);
  };
  /**
   * login
   */
  public login = (data: {LoginType: string, UserName: string, Password: string}) => {
    return this.base.postData(Config.serviceURL.user.login, data);
  };
  /**
   * logout
   */
  public logout = () => {
    return this.base.updateData(Config.serviceURL.user.login, '');
  };
  /**
   * get user profile
   */
  public userProfile = () => {
    return this.base.getData(Config.serviceURL.user.profile);
  };
  /**
   * get user profile
   * @param {data} : User
   */
  public updateProfile = (userID: number, data: Object) => {
    const url = `${Config.serviceURL.user.profile}/${userID}`;
    return this.base.updateData(url, data);
  };
}