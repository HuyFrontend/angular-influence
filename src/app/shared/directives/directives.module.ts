import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from './only-number.directive';
import { NospaceValidatorDirective } from './validators/nospace-validator.directive';
import { EmailValidatorDirective } from './validators/email-validator.directive';
import { CurrentPageDirective } from './current-page.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OnlyNumberDirective, NospaceValidatorDirective, EmailValidatorDirective, CurrentPageDirective],
  exports: [OnlyNumberDirective, NospaceValidatorDirective, EmailValidatorDirective, CurrentPageDirective]
})
export class DirectivesModule { }
