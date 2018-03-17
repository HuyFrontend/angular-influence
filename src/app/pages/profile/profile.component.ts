import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from '@shared/config';
import { UserService } from '@shared/services';
import { User } from '@shared/models';
import { Utils } from '@shared/utils';
import { interests } from '@shared/constants';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public selectedInterests: string[];
  public imageSrc: string = Config.imagePlacehold.default;
  public user: User;
  
  private allInterest: Object[] = interests;
  private initInterests: Object[];
  private subscriptUpdateProfile: Subscription = new Subscription();
  private subscriptGetProfile: Subscription = new Subscription();
  constructor(
    private domSanitizer: DomSanitizer,
    private userSerivce: UserService
  ) {
    this.selectedInterests = [];
    this.user = new User();
    this.initInterests = [];
  }

  ngOnInit() {
    this.getUserProfile();
  }
  ngOnDestroy() {
    this.subscriptGetProfile.unsubscribe();
    this.subscriptUpdateProfile.unsubscribe();
  }
  /**
   * get profile
   */
  private getUserProfile = () => {
    this.subscriptGetProfile = this.userSerivce.userProfile().subscribe((data: any) => {
      this.user = data;
      if (this.user && this.user.UserPhoto && this.user.UserPhoto.length ) {
        this.imageSrc = Utils.getFullPathOfImage(this.user.UserPhoto[0]['Url']);
      }
      if (this.user && this.user.UserTag) {
        this.initInterests = this.user.UserTag;
      }
    }, (error: any) => {
      Utils.showAlert(Config.alert.type.error, Utils.formatErrorResponse(error));
    });
  };
  /**
   * update profile
   */
  public onSubmit = (form) => {
    const userID = this.user.Id;
    this.subscriptUpdateProfile = this.userSerivce.updateProfile(userID, this.user).subscribe((res: any) => {
      if (res && res['status']) {
        Utils.showAlert(Config.alert.type.success, Config.alert.message.success.updateData);
      }
    }, (error: any) => {
      Utils.showAlert(Config.alert.type.error, Utils.formatErrorResponse(error));
    });
  };

  // push item to interest list
  public getselectedInterests = (list) => {
    this.selectedInterests = list;
    console.log('selectedInterests', this.selectedInterests);
    this.user.UserTag = list;
  }
  
  public onImageChanged = ({file, result}) => {
    this.user.UserPhoto = {
      FileName: file.name,
      FileType: file.type,
      FileSize: file.size,
      DataSource: result
    };
  };
}
