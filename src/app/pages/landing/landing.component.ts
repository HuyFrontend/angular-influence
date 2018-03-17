import { Component, OnInit } from '@angular/core';
import { CURRENT_PAGE } from '@shared/constants';
import { UtilsService } from '@shared/services';
import { UIRouter } from '@uirouter/angular';
import { Utils } from '@shared/utils';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private utilsService: UtilsService, private uiRouter: UIRouter) {
  }

  ngOnInit() {
    Utils.isLoggedIn() && this.uiRouter.stateService.go('homePage');
    this.utilsService.setCurrentPage(CURRENT_PAGE[CURRENT_PAGE.landingPage]);
  }
}
