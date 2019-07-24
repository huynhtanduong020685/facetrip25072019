import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AppProvider } from '../providers/app/app';
import { GlobalVariables } from '../global/global_variable';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UtilProvider } from '../providers/util/util';

import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  countryList: Array<any> = [];


  itemsCollections: AngularFirestoreCollection<any>;
  constructor(private storage: Storage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private util: UtilProvider,
    private appProvider: AppProvider, private db: AngularFirestore) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      this.getCountryList().then(() => { });
      this.itemsCollections = this.db.collection('users');
      this.util.getLocal('user').then(user => {
        if (user) {
          this.itemsCollections.doc(btoa(user['email'])).get().subscribe(snap => {
            splashScreen.hide()
            if (snap.exists) {
              GlobalVariables.user = snap.data();
              var usr = snap.data();
              usr['online'] = true; 
              this.itemsCollections.doc(GlobalVariables.user['base64']).update(usr).then(() => {
              });
              storage.set('checkUser', true);
              this.rootPage = TabsPage;
            }
            else {
              // this.rootPage = LoginPage;
              storage.set('checkUser', false);
              this.rootPage = TabsPage;
            }
          })
        } else {
          storage.set('checkUser', false);
          this.rootPage = TabsPage;
        }
      })
    });
  }
  getCountryList() {
    return new Promise(resolve => {
      this.appProvider.getContryList().subscribe((data: any) => {
        if (data) {
          this.countryList = data;
          GlobalVariables.countries = data;
        }
        resolve();
      }, err => resolve());
    })
  }
}
