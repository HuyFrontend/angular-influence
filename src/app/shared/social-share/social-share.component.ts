import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.css']
})
export class SocialShareComponent implements OnInit {
  @Input() shareLink: string;
  @Input() shareTitle: string;
  @Input() shareImg: string;
  @Input() isHideLabel: boolean;
  public googleURL = 'https://plus.google.com/share?';
  public facebookURL = 'https://www.facebook.com/sharer.php?';
  public twitterURL = 'https://twitter.com/share?';

  public currentURL = window.location.href;
  public updateShareLink = '';
  constructor() { }

  ngOnInit() {
    this.getShareLink();
  }
  /**
   * get link to sharing
   */
  getShareLink() {
    if (this.shareLink) {
      this.updateShareLink = encodeURIComponent(this.shareLink);
    } else {
      this.updateShareLink = encodeURIComponent(this.currentURL);
    }
  }
  /**
   * twitter sharing
   */
  shareTwitter() {
    let url = `${this.twitterURL}url=${this.updateShareLink}`;
    if (this.shareTitle) {
      url = `${url};text=${this.shareTitle}`;
    }
    window.open(url, 'twitter-share-dialog', 'width=626,height=436');
    return false;
  }
  /**
   * facebook sharing
   */
  shareFacebbok() {
    let url = `${this.facebookURL}u=${this.updateShareLink}`;
    if (this.shareImg) {
      url = `{url}?img=${this.shareImg}`;
    }
    window.open(url, 'facebook-share-dialog', 'width=626,height=436');
    return false;
  }
  /**
   * google+ sharing
   */
  shareGooglePlus() {
    const url = `${this.googleURL}url=${this.updateShareLink}`;
    window.open(url, 'google-share-dialog', 'width=626,height=436');
    return false;
  }
}
