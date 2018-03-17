import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { UIRouter } from '@uirouter/angular';
import { Config } from '@shared/config';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class UtilsService {

  private headerConfig = new Subject<Object>();
  private isShowOverlay = new Subject<boolean>();
  private loginStatus = new Subject<boolean>();
  
  private currentPage = new Subject<string>();

  /* get values - use in target components */
  public getHeaderConfig = this.headerConfig.asObservable();
  public getOverlay = this.isShowOverlay.asObservable();
  public isLoggedIn = this.loginStatus.asObservable();

  public getCurrentPage = this.currentPage.asObservable();

  constructor(private uiRouter: UIRouter,
    private cookieService: CookieService
    ) {
  }

  /* end get values */

  public setHeaderConfig = (value: Object) => {
    this.headerConfig.next(value);
  };
  public setOverlay = (value: boolean) => {
    this.isShowOverlay.next(value);
  };

  public setLoginStatus = (value: boolean) => {
    this.loginStatus.next(value);
    if (!value) {
      this.checkAuthorized(value);
    }
  };

  public checkAuthorized = (loginStatus: boolean = true) => {
    if (!loginStatus) {
      this.cookieService.removeAll();
      localStorage.removeItem(Config.storageAndCookies.token);
      this.uiRouter.stateService.go('landingPage');
    }
  };

  public setCurrentPage = (page?: string) => {
    this.currentPage.next(page);
  };
}

