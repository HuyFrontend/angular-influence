import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, AbstractControl, Validator } from '@angular/forms';
@Directive({
  selector: '[appNospaceValidator], [nospace][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => NospaceValidatorDirective), multi: true }
  ]
})
export class NospaceValidatorDirective implements Validator {

  constructor() { }
  validate = (control: AbstractControl): { [s: string]: boolean } => {
    if (control.value && control.value.trim() === '') {
      return { required: true };
    } else {
      return null;
    }
  }
}
