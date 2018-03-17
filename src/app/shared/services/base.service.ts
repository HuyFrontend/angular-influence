import { Injectable } from '@angular/core';
import { Config } from '../config';
import { Http, Response, Request, Headers, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { UtilsService } from './utils.service';
import { CookieService } from 'angular2-cookie/core';
import { UIRouter } from '@uirouter/angular';

@Injectable()
export class BaseService {
  private headers: Headers;
  private options: RequestOptions;
  private headerObj: {};
  private token: string;

  constructor(private http: Http,
    private utilsService: UtilsService,
    private cookie: CookieService,
    private uiRouter: UIRouter) {
    this.initDefaultHeader();
  }

  private initDefaultHeader = () => {
    const headerObj = {
      [Config.defaultHeader.contentType.key] : [Config.defaultHeader.contentType.value],
      // [Config.defaultHeader.inflKey.key] : [Config.defaultHeader.inflKey.value]
    };
    this.headers = new Headers(headerObj);
    this.options = new RequestOptions({ headers: this.headers });
  };

  /* check token change and update to header */
  private updateTokenHeader = (value?: string) => {
    if (value) {
      this.headers.set(Config.defaultHeader.inflKey.key, value);
      this.options.merge({ headers: this.headers });
    } else {
      const token = localStorage.getItem(Config.storageAndCookies.token);
      if (token) {
        this.headers.set(Config.defaultHeader.inflKey.key, token);
        this.options.merge({ headers: this.headers });
      }
    }
  };
  /**
   *handle error when call api
  */
  private handleError = (error: Response | any) => {
    if (error.status === 401) {
      this.utilsService.setLoginStatus(false);
      // return Observable.throw('Unauthorized');
    }
    return Observable.throw(error.json() || 'Server error');
  };
  /**
   * method GET
   * get data from web service with observable
   * @param url: {string}
   */
  getData(url: string): Observable<any[]> {
    this.updateTokenHeader();
    return this.http.get(url, this.options)
      .map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  };
  /**
   * method POST
   * post data to web service with observable
   * use in case body is string/object
   * @param url: {string}
   * @param body: {Object}
   */
  postData(url: string, body: {}, isNoHeader?: boolean): Observable<any[]> {
    const bodyString = JSON.stringify(body);
    this.updateTokenHeader();
    if (!isNoHeader) {
      return this.http.post(url, bodyString, this.options)
        .map((response: Response) => {
          return response.json();
        }).catch(this.handleError);
    } else {
      return this.http.post(url, bodyString)
        .map((response: Response) => {
          return response.json();
        }).catch(this.handleError);
    }
  };

  /**
   * method POST
   * post data to web service with observable
   * use in case body is FormData
   * @param url: {string}
   * @param body: {FormData}
   */
  postDataFormDataType(url: string, body: FormData) {
    this.updateTokenHeader();
    return this.http.post(url, body, this.options)
      .map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }

  /**
   * method PUT - Body Object Data
   * post data to web service with observable
   * @param url: {string}
   * @param body: {Object}
   */
  updateData(url: string, body: {}): Observable<any[]> {
    const bodyString = JSON.stringify(body);
    this.updateTokenHeader();
    return this.http.put(url, bodyString, this.options)
      .map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  };

  /**
   * method PUT - Body FormData
   * post data to web service with observable
   * @param url: {string}
   * @param body: {FormData}
   */
  putDataFormDataType(url: string, body: FormData) {
    this.updateTokenHeader();
    return this.http.put(url, body, this.options)
      .map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  };

  /**
   * method DELETE
   * 
   * 
   */
  deleteData(url: string, body: {}): Observable<any[]> {
    const bodyString = JSON.stringify(body);
    this.updateTokenHeader();
    return this.http.delete(url, this.options)
      .map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  };
}
