import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  styleUrls: ['./confirm-modal.component.scss'],
  template: `
    <div id="{{modalID}}" class="modal fade" role="dialog">
      <div class="modal-dialog">

        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title" *ngIf="modalTitle">{{modalTitle}}</h4>
          </div>
          <div class="modal-body">
            <p *ngIf="modalContent">{{modalContent}}</p>
          </div>
          <div class="modal-footer" *ngIf="modalType=='default'">
            <button type="button" class="btn btn-primary" id="yesBtn">Yes</button>
            <button type="button" class="btn btn-primary" id="noBtn" data-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConfirmModalComponent implements OnInit {
  @Input() modalID: string = 'confirmModal';
  @Input() modalType: string = 'default';
  @Input() modalTitle: string = '';
  @Input() modalContent: string = 'Do you want to delete this record?'
  constructor() { }

  ngOnInit() {
  }

}
