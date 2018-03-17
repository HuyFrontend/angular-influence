import { Component, OnInit, OnDestroy } from '@angular/core';
import { Utils } from '@shared/utils';
import { UtilsService } from '@services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  private userTypeID: number = 0;
  constructor(private utilsService : UtilsService) {
  }

  ngOnInit() {
    if (Utils.isLoggedIn()) {
      const userStorage = Utils.getLoginAccountStorage();
      this.userTypeID = userStorage['UserTypeId'];
    }
  }
  ngOnDestroy() {
  }
}