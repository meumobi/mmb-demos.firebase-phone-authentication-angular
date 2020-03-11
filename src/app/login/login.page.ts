import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  SearchCountryField,
  TooltipLabel,
  CountryISO
} from 'ngx-intl-tel-input';
import { AuthService } from '../core/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Brazil, CountryISO.Portugal, CountryISO.UnitedStates];
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required])
  });

  constructor(
    private authService: AuthService
  ) { }

  ngAfterViewInit() {
    this.authService.renderRecaptcha();
  }

  promptCode() {
    this.authService.presentAlertPrompt();
  }

  verifyNumber() {
    this.authService.verifyNumber(this.phoneForm.get('phone').value.internationalNumber);
  }
}
