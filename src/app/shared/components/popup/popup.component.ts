import { Component, OnInit, HostListener, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import { UIRouter } from '@uirouter/angular';
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-popup',
  template: `
    <div *ngIf="showPopup" class="popup" [class.open]="showPopup">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  public showPopup: boolean;

  @Input() activeClass: string;
  @Input() elementClick: HTMLElement;
  @Output() onToggleOutSide: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private elementRef: ElementRef,
    private uiRouter: UIRouter
  ) {
    this.showPopup = false;
  }
  ngOnInit() {
  }
  /**
   * show or hide popup
   * click/touch event
   */
  public show = (itemClick?: HTMLElement) => {
    this.showPopup = !this.showPopup;
    console.log('itemClick', itemClick);
    if (itemClick) {
      this.elementClick = itemClick;
    }
  };
  /**
   * show or hide popup
   * click/touch event
   */
  public showHide = (isShow?: boolean) => {
    this.showPopup = isShow;
  };
  /**
   * hide pop up
   */
  public hide = () => {
    this.showPopup = false;
  };
  /**
   * mousedown so that it doesn't fire directly after the click has fired
   * check click in/out of content of popup to hide
   */
  @HostListener('document:mousedown', ['$event']) showThePopup(e: Event) {
    const element = e.target as HTMLElement;
    if (this.showPopup && !this.elementRef.nativeElement.contains(e.target) && element !== this.elementClick && !this.elementClick.contains(element) ) {
      this.hide();
      this.onToggleOutSide.next(true);
    }
  }
}
