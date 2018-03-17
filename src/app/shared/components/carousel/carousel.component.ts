import { Component, OnInit, Input } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-carousel',
  // templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  template: `
    <ngx-carousel
      [inputs]="carouselBanner"
      [moveToSlide]="1"
      (onMove)="onmoveFn($event)">
        <ngx-item NgxCarouselItem class="bannerStyle">
            <h1>1</h1>
        </ngx-item>

        <ngx-item NgxCarouselItem class="bannerStyle">
            <h1>2</h1>
        </ngx-item>

        <ngx-item NgxCarouselItem class="bannerStyle">
            <h1>3</h1>
        </ngx-item>

        <button NgxCarouselPrev class='leftRs'>&lt;</button>
        <button NgxCarouselNext class='rightRs'>&gt;</button>
    </ngx-carousel>`
})
export class CarouselComponent implements OnInit {
  @Input() imageSources: string[] = ['assets/img/noimage150x150.png', 'assets/img/noimage150x150.png'];
  @Input() carouselConfig: { delay: number, autoPlay: boolean } = { delay: 3000, autoPlay: false};

  constructor() {
    
  }

  ngOnInit() {
  }

}
