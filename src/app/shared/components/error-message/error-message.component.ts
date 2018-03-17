import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-error-message',
  styleUrls: ['./error-message.component.scss'],
  template: `
    <label *ngIf="hasErrors()" class="error" for=""> {{getFirstError()}} </label>
    <label *ngIf="isShowCustomError && !getFirstError()" class="error" for=""> {{customMessage}} </label>
  `
})
export class ErrorMessageComponent {

  constructor() { }

  private static readonly errorMessages = {
    'required': () => 'This field is required.',
    'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
    'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.message,
    'invalidEmail': () => 'Email wrong format.'
  };
 
  @Input() private control: AbstractControlDirective | AbstractControl;
  @Input() private isFormSubmit?: boolean = false;
  @Input() public isShowCustomError?: boolean = false;
  @Input() public customMessage?: string = '';
 
  public hasErrors = (): boolean => {
    return this.control && this.control.errors && (this.control.dirty || this.control.touched || this.isFormSubmit);
  };
 
  public listOfErrors = (): string[] => {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  };
 
  private getMessage = (type: string, params: any) => {
    return ErrorMessageComponent.errorMessages[type](params);
  };

  public getFirstError = (): string => {
    let errorStr = '';
    const firstError = this.control.errors && Object.keys(this.control.errors)[0];
    if (firstError) {
      errorStr = this.getMessage(firstError, this.control.errors[firstError]);
    }
    return errorStr;
  };
  
}
