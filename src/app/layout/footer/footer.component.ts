import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../shared/services/utils.service';
import { Config } from '../../shared/config';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public isHidden: boolean;
  
  constructor(
    private utilsService: UtilsService
  ) { 
    this.isHidden = false;
    this.utilsService.getHeaderConfig.subscribe( (res: Object) => {
      if (res && Object.keys(res).length) {
        // this.isHidden = res[Config.components.header.hidden.key];
      }
    });
  }

  ngOnInit() {
  }

}
