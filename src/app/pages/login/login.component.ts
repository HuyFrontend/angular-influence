import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Config } from '@shared/config';
import { UtilsService, UserService } from '@services/index';
import { LoginModel } from './login.model';
import { Subscription } from 'rxjs/Subscription';
import { UIRouter } from '@uirouter/angular';
import { Utils } from '@shared/utils';
import { CookieService } from 'angular2-cookie/core';
import { CURRENT_PAGE } from '@shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public isSubmit: boolean;
  public loginModel: LoginModel;
  private subscriptionLogin = new Subscription();

  constructor(private utilsService: UtilsService,
    private userService: UserService,
    private uiRouter: UIRouter,
    private cookie: CookieService,
  ) {
    this.loginModel = new LoginModel();
    this.isSubmit = false;
    this.hideHeader(true);
    this.initForm();
  }

  ngOnInit() {
    this.utilsService.setCurrentPage(CURRENT_PAGE[CURRENT_PAGE.loginPage]);
    Utils.isLoggedIn() && this.uiRouter.stateService.go('homePage');
  }
  ngOnDestroy() {
    this.subscriptionLogin.unsubscribe();
  }

  private hideHeader = (isHide: boolean) => {
    const hidden = Config.components.header.hidden;
    const config = { hidden: isHide };
    this.utilsService.setHeaderConfig(config);
  };

  private initForm = () => {
    const formControlObj = {
      username: new FormControl('username', [Validators.required]),
      password: new FormControl('password')
    };
    this.loginForm = new FormGroup(formControlObj);
  }

  public login = (form?: any) => {
    if (this.isSubmit) {
      return;
    }
    this.isSubmit = true;
    if (form.valid) {
      this.fetchLogin();
    }
  }

  private fetchLogin = () => {
    this.loginModel.LoginType = 'NORMAL';
    const data = {
      LoginType: this.loginModel.LoginType,
      UserName: this.loginModel.UserName,
      Password: Utils.cryptoFormat(this.loginModel.Password)
    };
    let response = {};
    this.utilsService.setOverlay(true);
    this.subscriptionLogin = this.userService.login(data).subscribe( (res: any) => {
      response = res;
      this.utilsService.setOverlay(false);
    }, (error: any) => {
      Utils.showAlert('error', Utils.formatErrorResponse(error));
    }, () => {
      if (response['trxStatus'] === 'SUCCESS') {
        const token = response['userRec']['SessionKey'];
        const userInfo = response['userRec'];
        localStorage.setItem(Config.storageAndCookies.token, token);
        this.hideHeader(false);
        
        this.cookie.put(Config.storageAndCookies.userInfo, JSON.stringify(userInfo));
        Utils.setLoginAccountStorage(userInfo);
        
        this.uiRouter.stateService.go('homePage');
        Utils.showAlert('success', Config.alert.message.success.login);
        this.utilsService.setLoginStatus(true);
      }
    });
  }
}
