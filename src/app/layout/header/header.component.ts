import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Config } from '@shared/config';
import { BaseService , UtilsService, UserService } from '@shared/services';
import { Subscription } from 'rxjs/Subscription';
import { Utils } from '@shared/utils';
import { CookieService } from 'angular2-cookie/core';
import { UIRouter } from '@uirouter/angular';
import { CURRENT_PAGE } from '@shared/constants';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isHiddenHeader: boolean;

  public isOpenProfilePopup: boolean;
  public userInfo: { name?: string, avatar?: string };
  public loginStatus: boolean;
  private subscriptionLogOut = new Subscription();
  public isShowNavigation: boolean;
  private userTypeID: number = 0;
  private isShowSubCampaignMenu: boolean = false;
  private isOpenCreditSub: boolean = false;

  @Input() notificationMessage?: string;
  @Input() notificationType?: string;
  @Input() currentPage: string;

  // scroll and fixed header position
  @ViewChild('header') header: ElementRef;
  @HostListener('window:scroll', ['$event']) onScrollEvent() {
    if (document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0) {
      this.header.nativeElement.classList.add('affix');
    } else {
      this.header.nativeElement.classList.remove('affix');
    }
  };

  constructor(
    private utilsService: UtilsService,
    private userService: UserService,
    private cookie: CookieService,
    private uiRouter: UIRouter,
    private elementRef: ElementRef
  ) {
    this.isHiddenHeader = false;
    this.isOpenProfilePopup = false;
    this.userInfo = { name: '', avatar: '' };
    this.loginStatus = false;
    this.isShowNavigation = false;
    
    this.utilsService.getHeaderConfig.subscribe( (res: Object) => {
      if (res && Object.keys(res).length) {
        this.isHiddenHeader = res[Config.components.header.hidden];
      }
    });

    this.utilsService.isLoggedIn.subscribe((value: boolean) => {
      if (value) {
        this.loginStatus = value;
      } else {
        this.loginStatus = false;
      }
      this.getUserInfo(this.loginStatus);
    });

    // get current page
    this.utilsService.getCurrentPage.subscribe((res: string) => {
      this.currentPage = res;
      console.log('this.currentPage', this.currentPage);
      if (this.currentPage === CURRENT_PAGE[CURRENT_PAGE.loginPage]) {
        this.isHiddenHeader = true;
      } else {
        this.isHiddenHeader = false;
      }
    });

  }

  ngOnInit() {
    this.loginStatus = Utils.isLoggedIn();
    this.getUserInfo(this.loginStatus);
  }
  ngOnDestroy() {
    this.subscriptionLogOut.unsubscribe();
  }

  /**
   * logout button click
   */
  public logout = () => {
    this.fetchLogOut();
    this.isOpenProfilePopup = !this.isOpenProfilePopup;
  };
  /**
   * call api to log out
   */
  private fetchLogOut = () => {
    let response: Object = {};
    
    this.utilsService.setOverlay(true);
    this.subscriptionLogOut = this.userService.logout().subscribe ( (res: any) => {
      response = res;
    }, (error: any) => {
      Utils.showAlert(Config.alert.type.error, Utils.formatErrorResponse(error));
      this.utilsService.setOverlay(false);
    }, () => {
      this.utilsService.setOverlay(false);
      if (response && response['status']) {
        Utils.showAlert(Config.alert.type.success, Config.alert.message.success.logout);
        this.utilsService.setLoginStatus(false);
      }
    })
  };
  /**
   * avatar icon click
   */
  public showHideProfilePopup = () => {
    this.isOpenProfilePopup = !this.isOpenProfilePopup;
  };

  /**
   * show name and avatar user login
   */
  getUserInfo (isLogin: boolean) {
    const userStorage = Utils.getLoginAccountStorage();
    if (isLogin && Object.keys(userStorage).length) {
      const imgSrc = userStorage['UserPhoto'] && userStorage['UserPhoto'].length && Utils.getFullPathOfImage(userStorage['UserPhoto'][0]['Url']);
      this.userInfo.name = userStorage['Name'];
      this.userInfo.avatar = imgSrc;
      this.userTypeID = userStorage['UserTypeId'];
    }
  };
  /**
   * show navigation
   */
  public showNavigation = () => {
    this.isShowNavigation = true;
  };

  //
  public closeMenu = () => {
    this.isShowNavigation = false;
  }
  
  /**
   * mousedown so that it doesn't fire directly after the click has fired
   * check click in/out of content of navigation to hide it
   */
  @HostListener('document:mousedown', ['$event']) hideNavigation(e: Event) {
    if (this.isShowNavigation && !this.elementRef.nativeElement.contains(e.target)) {
      this.isShowNavigation = false;
    }
  };
  
  /**
   * click on main menu item
   */
  private showAndHideSubmenu = () => {
    this.isShowSubCampaignMenu = !this.isShowSubCampaignMenu;
  };
  private getCampaignType = () => {
    return localStorage.getItem(Config.storageAndCookies.campaignGroup);
  }
}
