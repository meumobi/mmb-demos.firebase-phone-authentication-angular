import { Platform, AlertController } from '@ionic/angular';
import { AuthNativeService } from './auth-native.service';
import { AuthWebService } from './auth-web.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

export abstract class AuthService {
  abstract verifyNumber(phone: string): Promise<void>;
  abstract renderRecaptcha(): Promise<void>;
  abstract presentAlertPrompt(): Promise<string>;
}

const authFactory = (
  platform: Platform,
  afAuth: AngularFireAuth,
  fbX: FirebaseX,
  alertCtrl: AlertController
) => {
  if (platform.is('cordova')) {
    return new AuthNativeService();
  } else {
    return new AuthWebService(afAuth, alertCtrl);
  }
};

export let AuthServiceProvider = {
  provide: AuthService,
  useFactory: authFactory,
  deps: [Platform, AngularFireAuth, FirebaseX, AlertController]
};
