import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { TabsPage } from '../tabs/tabs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
//import { User } from '../../models/user';
import { GlobalVariables } from '../../global/global_variable';
import { AppProvider } from '../../providers/app/app';
//import { EditProfilePage } from '../edit-profile/edit-profile';
import { SelectCountryComponent } from '../../components/select-country/select-country';

import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var facebookConnectPlugin;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private itemsCollection: AngularFirestoreCollection<any>;
  countries: Array<any> = [];
  country: string = null;
  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private util: UtilProvider,
    private db: AngularFirestore,
    private zone: NgZone,
    private appProvider: AppProvider,
    private af_auth: AngularFireAuth, ) {
  }

  ionViewDidLoad() {
    this.itemsCollection = this.db.collection<any>('users');
    this.util.presentLoading();
    this.getCountryList().then(() => {
      this.util.stopLoading();
    });
  }

  getCountryList() {
    return new Promise(resolve => {
      this.appProvider.getContryList().subscribe((data: any) => {
        if (data) {
          this.countries = data;
          GlobalVariables.countries = data;
        }
        resolve();
      }, err => resolve());
    })

  }
  facebookLogin() {
    facebookConnectPlugin.login(["public_profile", "email"], obj => {
      this.util.presentLoading();
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(obj.authResponse.accessToken);
      this.af_auth.auth.signInWithCredential(facebookCredential).then(res => {
        var obj = res.toJSON();
        let user: any = {};
        user['email'] = obj['email'];
        user['name'] = obj['displayName'];
        user['picture'] = obj['photoURL'];
        user['base64'] = btoa(user['email']);
        user['fb_id'] = obj['providerData'][0]['uid'];
        user['online'] = true;
        GlobalVariables.user = user;
        var docRef = this.itemsCollection.doc(user['base64']);
        docRef.get().subscribe(doc => {
          this.storage.set('checkUser', true);
          if (!doc.exists) {
            this.itemsCollection.doc(user['base64']).set(user).then(() => {
              this.util.setLocal('user', user);
              this.storage.set('checkUser', true);
            });
          } else {
            GlobalVariables.user = doc.data();
            this.util.setLocal('user', doc.data());
            this.storage.set('checkUser', true);
          }

          this.util.stopLoading();
          if (GlobalVariables.user['country'] || GlobalVariables.user['country'] != '') {
            this.zone.run(() => {
              this.storage.set('checkUser', true);
              this.navCtrl.setRoot(TabsPage);
            });
          } else {
            this.util.showModal(SelectCountryComponent).then(data => {
              this.storage.set('checkUser', true);
            })
          }
        })
      }, err => {
      })
    }, fail => {
    })
  }
}
