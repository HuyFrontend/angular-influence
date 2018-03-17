import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialShareComponent } from './social-share.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SocialShareComponent],
  exports: [SocialShareComponent]
})
export class SocialShareModule { }
