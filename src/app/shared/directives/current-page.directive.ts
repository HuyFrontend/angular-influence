import { Directive, Input } from '@angular/core';
import { UtilsService } from '@shared/services';
import { CURRENT_PAGE } from '@shared/constants';
@Directive({
  selector: '[appCurrentPage]'
})
export class CurrentPageDirective {

  @Input() appCurrentPage: string;
  constructor(private utilsService: UtilsService) {
    console.log('current directive', this.appCurrentPage);
    //if (this.appCurrentPage === CURRENT_PAGE[CURRENT_PAGE.landingPage]) {
      this.utilsService.setCurrentPage(this.appCurrentPage);
    //}
  }

}
