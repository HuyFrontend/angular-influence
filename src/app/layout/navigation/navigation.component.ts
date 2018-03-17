import { Component, OnInit, ElementRef, ViewChild, HostListener, Input, SimpleChange, Output, EventEmitter } from '@angular/core';
import { UIRouter } from '@uirouter/angular';
import { UtilsService } from '@shared/services';
import { Utils } from '@shared/utils';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnChanges {

  public hasNavigation: boolean = false;
  public isActive: boolean = false;
  
  public userTypeID: number = 0;

  @ViewChild('navElement') navElement: ElementRef;
  @Input() isMobileNavigation: boolean = false;  
  @Input() refHeader;
  @Output() onOpenNavigation: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private utilsService: UtilsService, private elementRef: ElementRef) {
    this.utilsService.isLoggedIn.subscribe((value) => {
      this.hasNavigation = value;
    });
  }

  ngOnInit() {
    if (Utils.isLoggedIn()) {
      this.hasNavigation = true;
      const userStorage = Utils.getLoginAccountStorage();
      this.userTypeID = userStorage['UserTypeId'];
    } else {
      this.hasNavigation = false;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.isMobileNavigation) {
      this.isMobileNavigation = changes.isMobileNavigation.currentValue;
    }
  }
  public showNavigation = (value?: boolean) => {
    // this.isActive = value !== null ? value : !this.isActive;
    this.isActive = !this.isActive;
    this.onOpenNavigation.emit(this.isActive);
  };
  /**
   * show/hide navigation on moblie version
   */
  public showMobileNavigation = (isShow: boolean) => {
    this.isMobileNavigation = isShow;
  };

  /**
   * mousedown so that it doesn't fire directly after the click has fired
   * check click in/out of content of navigation to hide it
   */
  @HostListener('document:mousedown', ['$event']) hideNavigation(e: Event) {
    if (this.isActive && !this.elementRef.nativeElement.contains(e.target)) {
      this.isActive = false;
    }
  };
}
