import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AuthServiceProvider } from '../core/auth';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    NgxIntlTelInputModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginPage],
  providers: [
    AuthServiceProvider,
    FirebaseX,
  ]
})
export class LoginPageModule {}
