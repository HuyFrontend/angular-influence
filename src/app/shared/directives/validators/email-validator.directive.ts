import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator], [email-valid]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidatorDirective), multi: true }
  ]
})
export class EmailValidatorDirective implements Validator {

  constructor() {

  }
  validate = (control: AbstractControl): { [s: string]: boolean } => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const value = control && control.value || '';
    if (!re.test(value.trim())) {
      return { invalidEmail: true };
    } else {
      //return { invalidEmail: false };
      return null;
    }
  }
}
