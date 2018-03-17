import { Component, OnInit } from '@angular/core';
import { Utils } from '../../utils';
import { CookieService } from 'angular2-cookie/core';
import { BaseService } from '../../services/base.service';
import { Config } from '../../config';

declare const FB: any;

@Component({
  selector: 'app-facebook-auth',
  // templateUrl: './facebook-auth.component.html',
  styleUrls: ['./facebook-auth.component.css'],
  template: `<a class="text-info facebook-login" on-click="loginFB()">Facebook</a>`
})
export class FacebookAuthComponent implements OnInit {

  public facebookAccountInfo: { accessToken?: string, userID?: string, firstName?: string, lastName?: string, name?: string, email?: string, pictureURL?: string };
  constructor(
    private baseService: BaseService
  ) {
    this.facebookAccountInfo = {};
  }

  ngOnInit() {
    this.initFB();
  }
  /**
   * initialize facebook sdk
  **/
  private initFB = () => {
    FB.init({
      appId: '1371936979592613',
      cookie: false,
      xfbml: true,
      version: 'v2.5',
      status: true
    });
  };
  /**
   * click to login facebook
   */
  public loginFB = () =>{
    FB.getLoginStatus( (response: any) => {
      if (response.status === 'connected') {
        this.requestMe();
      } else {
        this.requestLogin();
      }
    });
  };

  public requestLogin = () => {
    FB.login( (response: any) => {
      if (response.authResponse) {
        this.facebookAccountInfo.accessToken = response.authResponse.accessToken;
        this.requestMe();
      } else {
        Utils.showAlert('error', 'error');
      }
    }, { scope: 'user_friends' } );
  };

  public requestMe = () => {
    FB.api('/me',
      { fields: 'name, first_name, picture, email, last_name' },
      (response: any) => {
        console.log('Res', response);
        if (response) {
          this.facebookAccountInfo.userID = response.id;
          this.facebookAccountInfo.firstName = response.first_name;
          this.facebookAccountInfo.lastName = response.last_name;
          this.facebookAccountInfo.email = response.email;
          this.facebookAccountInfo.name = response.name;
          this.facebookAccountInfo.pictureURL = response.picture && response.picture.data ? response.picture.data.url : '';
          this.checkFacebookAccount();
        }
      }
    );
  };

  /**
   * check facebook account is registered or not
   */
  checkFacebookAccount() {
    const body = {
      'LoginType': 'FB',
      'UserName': this.facebookAccountInfo.userID,
      'Email': this.facebookAccountInfo.email,
      'Name': this.facebookAccountInfo.name,
      'SessionKey': this.facebookAccountInfo.accessToken,
      'UserTypeId': '',
      'Password': this.facebookAccountInfo.name
    };
    const url = Config.serviceURL.user.login;
    this.baseService.postData(url, body).subscribe( (res: any) => {
      if (res && res.Success === false) {
        //this.facebookAuth();
      } else if (res && res.Success) {
        //this.saveCookieToken(res.Data.SessionTokenId, JSON.stringify(res.Data.MemberInfo));
      }
    }, error => {
      //this.errorMessage = <any> error;
      //Alertify.error(this.errorMessage);
    })
  }
}

/*{
    "LoginType": "FB",
    "UserName": userName,
    "Password": password,
    "Email": email,
    "Name": name,
    "UserTypeId": userTypeId,
    "SessionKey": accessToken
}*/
