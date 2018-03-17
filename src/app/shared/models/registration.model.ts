export interface IRegisterModel {
    Id: string;
    UserLoginName: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    LoginType: string;
    
    Name: string;
    Gender: string;
    Dob: Date;

    Location: string;
    Language: string;
    Country: string;
    About: string;
    Phone: string;

    // GoogleLoginName: string;
    // FbLoginName: string;
    // Password
    // "Id":null,
    // "UserLoginName":"huyvo",
    // "GoogleLoginName":"",
    // "FbLoginName":"",
    // "Password":"1234567",
    // "Name":"Huy Le",
    // "Email":"huy.vo@yopmail.com",
    // "Mobile":"09123450",
    // "Dob":"02/14/1995",
    // "Profession":"",
    // "Gender":"F",
    // "Designation":"",
    // "CompanyName":"",
    // "CompanyNature":"",
    // "CompanyNo":"",
    // "CompanyLocation":"",
    // "UserTypeId":"1",
    // "AccountTypeId":"1",
    // "PhotoId":null,
    // "UserPhoto":null,
    // "UserPayment":{  
    //    "PaymentAccNo":"",
    //    "PaymentHolderName":"",
    //    "PaymentExpiryDate":"",
    //    "PaymentSecurityCode":"",
    //    "PaymentIssuerName":"",
    //    "PaymentIssuerCategory":"",
    //    "PaymentType":""
    // },
    // "UserInfluence":{  
    //    "IsBanned":false,
    //    "TotalSuccessfulCampaign":0,
    //    "TotalFailedCampaign":0,
    //    "TotalFollowerFb":0,
    //    "TotalFollowerInstagram":0,
    //    "TotalFollowerTwitter":0,
    //    "TotalFollowerVine":0,
    //    "PageAuthority":0,
    //    "PageRank":0,
    //    "ReplyRatio":0,
    //    "AverageShared":0
    // },
    // "ConfirmPassword":"1234567",
    // "Languange":"english",
    // "Location":"Vietnam",
    // "Country":"Vietnam",
    // "PreferredAccNo":"773422222",
    // "PreferredAccName":"Lee",
    // "PreferredBankName":"VietBank",
    // "Summary":"Hello Malaysia",
    // "LoginType":"NORMAL",
    // "UserTag":"

  };
  
  export class RegisterModel implements IRegisterModel {
    Id: string;
    UserLoginName: string;
    Email: string
    Password: string;
    LoginType: string;
    ConfirmPassword: string;
    Name: string;
    Gender: string;
    Dob: Date;

    Location: string;
    Language: string;
    Country: string;
    About: string;
    Phone: string;
    constructor(obj?: any) {
      this.Id = obj && obj.Id || null;
      this.UserLoginName = obj && obj.UserLoginName || '';
      this.Email = obj && obj.Email || '';
      this.LoginType = obj && obj.LoginType || 'NORMAL';
      this.Password = obj && obj.Password || '';
      this.ConfirmPassword = obj && obj.ConfirmPassword || '';
      this.Name = obj && obj.Name || '';
      
      this.Gender = obj && obj.Gender || 'M';
      this.Dob = obj && obj.Dob || null;
      this.Location = obj && obj.Location || '';
      this.Country = obj && obj.Country || '';
      this.About = obj && obj.About || '';
      this.Phone = obj && obj.Phone || '';
      this.Language = obj && obj.Language || '';
    }
  }

  //
//   {  
//     "Id":null,
//     "UserLoginName":"huyvo",
//     "GoogleLoginName":"",
//     "FbLoginName":"",
//     "Password":"1234567",
//     "Name":"Huy Le",
//     "Email":"huy.vo@yopmail.com",
//     "Mobile":"09123450",
//     "Dob":"02/14/1995",
//     "Profession":"",
//     "Gender":"F",
//     "Designation":"",
//     "CompanyName":"",
//     "CompanyNature":"",
//     "CompanyNo":"",
//     "CompanyLocation":"",
//     "UserTypeId":"1",
//     "AccountTypeId":"1",
//     "PhotoId":null,
//     "UserPhoto":null,
//     "UserPayment":{  
//        "PaymentAccNo":"",
//        "PaymentHolderName":"",
//        "PaymentExpiryDate":"",
//        "PaymentSecurityCode":"",
//        "PaymentIssuerName":"",
//        "PaymentIssuerCategory":"",
//        "PaymentType":""
//     },
//     "UserInfluence":{  
//        "IsBanned":false,
//        "TotalSuccessfulCampaign":0,
//        "TotalFailedCampaign":0,
//        "TotalFollowerFb":0,
//        "TotalFollowerInstagram":0,
//        "TotalFollowerTwitter":0,
//        "TotalFollowerVine":0,
//        "PageAuthority":0,
//        "PageRank":0,
//        "ReplyRatio":0,
//        "AverageShared":0
//     },
//     "ConfirmPassword":"1234567",
//     "Languange":"english",
//     "Location":"Vietnam",
//     "Country":"Vietnam",
//     "PreferredAccNo":"773422222",
//     "PreferredAccName":"Lee",
//     "PreferredBankName":"VietBank",
//     "Summary":"Hello Malaysia",
//     "LoginType":"NORMAL",
//     "UserTag":""
//  }

// {"userId":23,"userTagId":null,"userInfluenceId":8,"userUsageId":7,"userPaymentId":8,"success_msg":"Successfuly registered you as user!","status":true} 