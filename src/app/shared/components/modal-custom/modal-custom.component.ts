import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-custom',
  styleUrls: ['./modal-custom.component.scss'],
  template: `
    <div (click)="onContainerClicked($event)" class="modal fade" tabindex="-1" [ngClass]="{'in': visibleAnimate}"
        [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <ng-content select=".app-modal-header"></ng-content>
          </div>
          <div class="modal-body">
            <ng-content select=".app-modal-body"></ng-content>
          </div>
          <div class="modal-footer">
            <ng-content select=".app-modal-footer"></ng-content>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ModalCustomComponent implements OnInit {
  public visible: boolean = false;
  public visibleAnimate: boolean = false;
  @Output() onConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
  private confirm = () => {
    console.log('confirm');
    this.onConfirmed.emit(true);
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }
}
