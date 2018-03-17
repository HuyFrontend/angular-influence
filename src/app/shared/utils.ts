import * as Crypto from 'crypto-js';
import * as Alertify from 'alertifyjs';
import { Config } from './config';
import { Campaign } from '@shared/models';

export class Utils {
  /**
   * save param for search tour
   */
  public static parameSearchString =  '';
  public static unAuthorized = 'Unauthorized';

  /**
   * show warning emessage
  **/
  public static warningMessage = (message: string, element: Element) => {
    element.innerHTML = message;
    setTimeout (function () {
      element.innerHTML = '';
    }, 3000);
  }
  /**
   * format date time to dd/mm/yyyy
  **/
  public static dateToString = (inputDate?: Date, formatType?: string): string => {
    inputDate = inputDate && new Date(inputDate);
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1;
    const year = inputDate.getFullYear();
    
    const seconds = inputDate.getSeconds();
    const minutes = inputDate.getMinutes();
    const hours = inputDate.getHours();

    const strDay = (day < 10) ? `0${day}` : day;
    const strMonth = (month < 10) ? `0${month}` : month;

    const strHours = hours < 10 ? `0${hours}` : hours;
    const strMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const strSeconds = seconds < 10 ? `0${seconds}` : seconds;

    let returnValue: string = '';
    const type = Config.dateFormatType;

    switch (formatType) {
      
      case type.defaultDate:
        returnValue = `${strMonth}/${strDay}/${year}`;
        break;
      
      case type.asiaDateDash:
        returnValue = `${strDay}-${strMonth}-${year}`;
        break;
      
      case type.yearMonthDayDash:
        returnValue = `${year}-${strMonth}-${strDay}`;
        break;

      case type.asiaDate:
        returnValue = `${strDay}/${strMonth}/${year}`;
        break;
      case type.dateTime:
        returnValue = `${strDay}/${strMonth}/${year} ${strHours}:${strMinutes}:${strSeconds}`;
        break;
      default:
        returnValue = `${strDay}/${strMonth}/${year}`;
        break;
    }
    return returnValue;
  };
  /**
   * parse date to date object
   */
  public static parseDate = (inputDate: any) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return { year: year, month: month, day: day }
  };

  /**
   * return random backgourd color
   */
  public static randomColor = (): string => {
    const array = ['bg-violet', 'bg-orange', 'bg-blue', 'bg-green', 'bg-yellow'];
    return array[ Math.floor(Math.random() * array.length) ];
  }
  /**
   * return stand for name/member/user
   */
  public static standForName = (firstName?: string, lastName?: string): string => {
    let standFor = '';
    if (firstName) {
      standFor = firstName.charAt(0);
    }
    if (lastName) {
      standFor = `${standFor}${lastName.charAt(0)}`;
    }
    return standFor;
  }
  /**
   * check user logged in or not
   */
  public static isLoggedIn = (): boolean => {
    const token = localStorage.getItem(Config.storageAndCookies.token);
    if (token && token.length) {
      return true;
    }
    return false;
  };
  /**
   * return difference time (hours) between 2 time points
  */
  public static differentTime = (time: string): number => {
    const prevTime = new Date(time).valueOf();
    const currentTime = new Date().valueOf();
    const differentHours = ( currentTime - prevTime ) / ( 1000 * 3600 );
    return differentHours;
  }
  /**
   * validate email
   */
  public static validateEmail = (email: string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  /**
   * open register modal
   */
  public static openRegisterModal = () => {
    const openModal = <HTMLElement>document.querySelector('[data-target="#modal-signUp"]');
    openModal.click();
  }
  public static scrollElement = (element: Element) => {
    element.scrollIntoView(true);
  }
  public static scrollToTop = () => {
    const element = document.querySelector('#page-top');
    element.scrollIntoView({ behavior: 'smooth' });
  }

  /* Format password or some thing via crypto*/
  public static cryptoFormat = (value: string): string => {
    let result = '';
    if (value) {
      const newString = `pepper${value}salt`;
      const sha256String = Crypto.HmacSHA256(newString, 'secret');
      const resultString = Crypto.enc.Base64.stringify(sha256String);
      result = resultString;
    }
    return result;
  };
  /* Format error response */ //public static errorMessage 
  public static formatErrorResponse = (error?: { error_id?: string, error_msg?: string }): string => {
    let errorString = 'Error';
    if (Object.keys(error).length) {
      if ('error_id' in error) {
        errorString = error.error_id;
      }
      if ('error_msg' in error) {
        errorString += ` | ${error.error_msg}`;
      }
    }
    return errorString;
  };

  /* Show alertify */
  public static showAlert = (alertType?: string, message?: string) => {
    switch (alertType) {
      case 'success':
        Alertify.success(message);
        break;
      case 'error':
        Alertify.error(message);
        break;
      default:
        Alertify.success(message);
        break;
    }
  };

  /**
   * Minus dates
   */
  public static differentDates = (dateFrom: Date, dateTo: Date) => {
    dateFrom = new Date(dateFrom);
    dateTo = new Date(dateTo);
    const timeFrom = dateFrom.getTime();
    const timeTo = dateTo.getTime();
    return Math.round( (timeTo - timeFrom ) / (1000 * 60 * 60 * 24) );
  };
  /**
   * get campaign detail from storage
   */
  public static getCampaignStorage = (): Campaign => {
    let campaign = new Campaign();
    const storageCampaignStr = localStorage.getItem(Config.storageAndCookies.campaignDetail);
    if (storageCampaignStr) {
      campaign = JSON.parse(storageCampaignStr);
    }
    return campaign;
  };
  /**
   * set campaign detail to storage
   */
  public static setCampaignStorage = (campaign: Campaign = new Campaign()) => {
    if (campaign) {
      const campaignStr = JSON.stringify(campaign);
      localStorage.setItem(Config.storageAndCookies.campaignDetail, campaignStr);
    }
  };
  /**
   * remove campaign detail to storage
   */
  public static removeCampaignStorage = () => {
    localStorage.removeItem(Config.storageAndCookies.campaignDetail);
  };
  /**
   * return file data
   */
  public static getImageData = (file, onLoad) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = onLoad;
    // fileReader.onload = function (e) {
    //   const result = e['target']['result'];
    // };
  };

  /**
   * return object of account that logged in
   */
  public static getLoginAccountStorage = (): Object => {
    let storageAccountObj = {};
    if (Utils.isLoggedIn()) {
      const storageAccountStr = localStorage.getItem(Config.storageAndCookies.userInfo);
      if (storageAccountStr) {
        storageAccountObj = JSON.parse(storageAccountStr);
      }
    }
    return storageAccountObj;
  };

  /**
   * return object of account that logged in
   */
  public static setLoginAccountStorage = (userData) => {
    localStorage.setItem(Config.storageAndCookies.userInfo, JSON.stringify(userData));
  };


  /**
   * return full url of image src
   */
  public static getFullPathOfImage = (imageSrc: string) => {
    return `${Config.IFLUENCE_DOMAIN}${imageSrc}`;
  };
}