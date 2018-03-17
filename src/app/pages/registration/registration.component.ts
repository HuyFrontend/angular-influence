import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { UIRouter } from '@uirouter/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterModel } from '@models/index';
import { Config } from '@shared/config';
import { Utils } from '@shared/utils';
import { UserService, UtilsService } from '@services/index';
import { Subscription } from 'rxjs/Subscription';
import { countryList } from '@shared/constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit, OnDestroy {
  
  @ViewChild('autoLocation') autoLocation: ElementRef;
  public countryList = countryList;
  
  public registerModel: RegisterModel;
  public registerForm: FormGroup;
  // form field step 0
  public userName: FormControl;
  public email: FormControl;
  public password: FormControl;
  public passwordConfirm: FormControl;
  // form field step 1
  public name: FormControl;
  public gender: FormControl;
  // public birthDay: FormControl;
  public language: FormControl;
  public location: FormControl;
  public country: FormControl;
  public about: FormControl;
  public mobiphone: FormControl;

  // form field step 2
  public cityTag: FormControl;
  public isSubmit: boolean;
  public currentStep: number;
  public tempStep: number;
  public customError: boolean;

  private registerSubscription: Subscription = new Subscription();
  constructor(
    private utilsService: UtilsService,
    private userService: UserService,
    private uiRouter: UIRouter
  ) { 
    this.registerModel = new RegisterModel();
    this.isSubmit = false;
    this.currentStep = 0;
    this.tempStep = 0;
    this.customError = false;

    this.hideHeader(true);
    this.initForm();
  }

  ngOnInit() {
    // this.utilsService.
  }
  ngOnDestroy() {
    this.registerSubscription.unsubscribe();
  }
  private hideHeader = (isHidden?: boolean) => {
    const hidden = Config.components.header.hidden;
    const config = { hidden: isHidden };
    this.utilsService.setHeaderConfig(config);
  };
  
  /**
   * init form field and valid fields
   */
  private initForm = () => {
    this.userName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.passwordConfirm = new FormControl('');

    this.name = new FormControl('', [Validators.required]);
    this.gender = new FormControl('');
    // this.birthDay = new FormControl('');
    this.language = new FormControl('');
    this.location = new FormControl('');
    this.country = new FormControl('');
    this.about = new FormControl('');
    this.mobiphone = new FormControl('');

    this.cityTag = new FormControl('');
    

    const formFieldStep0 = {
      userName: this.userName,
      email: this.email,
      password: this.password,
      passwordConfirm: this.passwordConfirm
    };
    const formFieldStep1 = {
      name: this.name,
      gender: this.gender,
      // birthDay: this.birthDay,
      language: this.language,
      location: this.location,
      country: this.country,
      about: this.about,
      mobiphone: this.mobiphone
    };
    const formFieldStep2 = {
      cityTag: this.cityTag
    };

    this.registerForm = new FormGroup({
      registerStep0: new FormGroup(formFieldStep0),
      registerStep1: new FormGroup(formFieldStep1),
      registerStep2: new FormGroup(formFieldStep2)
    });
  }
  
  /**
   * go back to previous step
   */
  private previousStep = () => {
    if (this.currentStep !== 0) {
      this.tempStep = this.currentStep;
      this.currentStep = this.currentStep - 1;
    }
  }
  /**
   * form submit
   */
  public onSubmit = (form) => {
    console.log('register process');
    const stepForm = form.controls[`registerStep${this.currentStep}`];
    this.isSubmit = true;
    if (!this.isMatchPassword() && this.currentStep === 0) {
      // stepForm.valid = false;
      this.customError = true;
    }

    if (stepForm.valid) {
      this.tempStep = this.currentStep;
      this.currentStep = this.currentStep + 1;
      this.isSubmit = false;
      if (this.currentStep === 2) {
        this.fetchRegister();
      }
    }
  };
  /**
   * fetch register
   */
  private fetchRegister = () => {
    let response = {};
    this.utilsService.setOverlay(true);
    
    console.log('Post Data', this.postData());
    this.registerSubscription = this.userService.register(this.postData()).subscribe( (res: any) => {
      response = res;
    }, (error: any) => {
      this.utilsService.setOverlay(false);
      const { error_id, error_msg } = error;
      const message = `${error_id} ${error_msg}`;
      Utils.showAlert('error', message);
    },() => {
      this.utilsService.setOverlay(false);
      if (response['status']) {
        // Utils.showAlert('success', response['success_msg']);
        Utils.showAlert('success', Config.alert.message.success.register);
        this.uiRouter.stateService.go('homePage');
      }
    });
  };
  private postData = () => {
    return {
      Id: null,
      UserLoginName: this.registerModel.UserLoginName,
      "GoogleLoginName":"",
      "FbLoginName":"",
      Password: this.registerModel.Password,
      ConfirmPassword: this.registerModel.ConfirmPassword,
      Name: this.registerModel.Name,
      Email: this.registerModel.Email,
      Mobile: this.registerModel.Phone,
      // "Dob":"02/14/1995",
      "Profession":"",
      Gender: this.registerModel.Gender,
      Languange: this.registerModel.Language,
      Location: this.registerModel.Location,
      Country: this.registerModel.Country,
      
      "Designation":"",
      "CompanyName":"",
      "CompanyNature":"",
      "CompanyNo":"",
      "CompanyLocation":"",
      "UserTypeId":"1",
      "AccountTypeId":"1",
      "PhotoId":null,
      "UserPhoto":null,
      "UserPayment":{  
        "PaymentAccNo":"",
        "PaymentHolderName":"",
        "PaymentExpiryDate":"",
        "PaymentSecurityCode":"",
        "PaymentIssuerName":"",
        "PaymentIssuerCategory":"",
        "PaymentType":""
      },
      "UserInfluence":{  
        "IsBanned":false,
        "TotalSuccessfulCampaign":0,
        "TotalFailedCampaign":0,
        "TotalFollowerFb":0,
        "TotalFollowerInstagram":0,
        "TotalFollowerTwitter":0,
        "TotalFollowerVine":0,
        "PageAuthority":0,
        "PageRank":0,
        "ReplyRatio":0,
        "AverageShared":0
      },
      "PreferredAccNo":"",
      "PreferredAccName":"",
      "PreferredBankName":"",
      "Summary":"H",
      "LoginType":"NORMAL",
      "UserTag":""
    };
  };

  /**
   * match password
   */
  public isMatchPassword = () => {
    if (!this.registerModel.Password || !this.registerModel.ConfirmPassword ) {
      return false;
    } else {
      return true;
    }
  };
}
