import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthWebService {

  private appVerifier;
  private widgetId;

  constructor(
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController
  ) { }

  async renderRecaptcha() {
    this.appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible'
    });
    // Turn off phone auth app verification.
    // this.afAuth.auth.settings.appVerificationDisabledForTesting = true;
    this.widgetId = this.appVerifier.render();
  }

  async presentAlertPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Prompt!',
      inputs: [
        {
          name: 'verificationCode',
          type: 'number',
          placeholder: 'Verification code'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();
    return result;
  }

  async verifyNumber(phone: string) {
    this.afAuth.auth.signInWithPhoneNumber(phone, this.appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        // expected a object with `confirm` method and `verificationId` property
        console.log(confirmationResult);
        const alert = this.presentAlertPrompt();
        alert.then(result => {
          const verificationCode = result.data.values.verificationCode;
          console.log('Verification code: ', verificationCode);
          confirmationResult.confirm(verificationCode).then((data) => {
            // User signed in successfully.
            const user = data.user;
            console.log(user);
            // ...
          }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            // {code: "auth/invalid-verification-code", message: "The SMS verification code used to create the phone…e use the verification code provided by the user."}
            console.log(error);
          });
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log(error);
          this.appVerifier.reset(this.widgetId);
        });
      });
  }
}
