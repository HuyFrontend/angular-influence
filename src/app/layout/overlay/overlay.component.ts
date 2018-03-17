import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  @Input() isShow: boolean;
  constructor() { }

  ngOnInit() {
  }

}
