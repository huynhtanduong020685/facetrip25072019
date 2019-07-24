import { ContactPage } from './../contact/contact';
import { Component } from '@angular/core';
import { NavController, Events, Platform, AlertController, App, ModalController } from 'ionic-angular';
import { GlobalVariables } from '../../global/global_variable';
import { EditProfilePage } from '../edit-profile/edit-profile';
//import { HomestayDetailPage } from '../homestay-detail/homestay-detail';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { HomestayViewPage } from '../homestay-view/homestay-view';
//import { ChatsPage } from '../chats/chats';
import { AppProvider } from '../../providers/app/app';
//import { UtilProvider } from '../../providers/util/util';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';

import { Storage } from '@ionic/storage';

declare var cordova;

@Component({
  selector: 'page-local-detail',
  templateUrl: 'local-detail.html',
})
export class LocalDetailPage {
  private itemsCollection: AngularFirestoreCollection<any>;

  homestayList: Array<any> = [];
  user = GlobalVariables.selectedUser;
  myUser: any;
  localList: Array<any> = [];
  reviews: Array<any> = [];
  comment: string = '';
  pictures = [];
  listComment: any;

  ratingCheck: number = 0;

  countStar: number = 0;
  oneStar = 0;
  twoStar = 0;
  threeStar = 0;
  fourStar = 0;
  fiveStar = 0;


  constructor(
    public app: App,
    public alertCtrl: AlertController,
    private storage: Storage,
    public navCtrl: NavController,
    public platform: Platform,
    public navParams: NavParams,
    private db: AngularFirestore,
    private events: Events,
    //private util: UtilProvider,
    private appProvider: AppProvider,
    public modalCtrl: ModalController
  ) {
    this.loadRating();
    this.myUser = this.navParams.get('myUser');

    // if (this.navParams.get('user')) {
    //   this.user = this.navParams.get('user');
    //   GlobalVariables.selectedUser = this.user;
    // }
    // this.user = GlobalVariables.selectedUser;
    if (!this.user['pictures']) {
      this.user['pictures'] = '';
    } else {
      this.pictures = this.user['pictures'].split('|');
    }



    this.itemsCollection = this.db.collection<any>('users');
    // this.itemsCollection.doc(this.user['base64']).collection("items").snapshotChanges().subscribe(() => {
    //   this.getHomeStayList();
    // })

  }

  ionViewDidEnter() {
    // this.user = GlobalVariables.selectedUser;
    // if(!this.user['base64'])
    // {
    //   this.back();
    //   return;
    // }else{
    //   this.itemsCollection = this.db.collection<any>('homestays');
    //   this.itemsCollection.doc(this.user['base64']).collection("items").snapshotChanges().subscribe(()=>{
    //     this.getHomeStayList();
    //   })
    //   this.events.publish('tab_changed_1');
    // }
  }

  editProfile() {
    this.navCtrl.push(EditProfilePage, { user: this.user });
  }

  viewDetail(item) {
    this.navCtrl.push(HomestayViewPage, { homestay: item });
  }

  getHomeStayList() {
    // this.homestayList = [];
    // this.itemsCollection.doc(this.user['base64']).collection('items').get().subscribe(snap => {
    //   snap.forEach((doc) => {
    //     var obj = doc.data();
    //     obj['id'] = doc.id;
    //     if (this.homestayList.length <= 0) {
    //       this.homestayList.push(obj);
    //     }
    //   });
    //   this.getHomestayReviews();
    // })
  }

  goToChat() {
    this.storage.get('checkUser').then((val) => {
      if (val == true) {
        GlobalVariables.selectedUser = this.user;
        this.events.publish('tab_changed_2');
        this.navCtrl.setRoot(ContactPage, { receiver: this.user, user: GlobalVariables.user });
        // this.app.getRootNav().push(ContactPage, { receiver: this.user, user: GlobalVariables.user });
      } else {
        this.showConfirm();
      }
    });

    console.log(this.user);

  }

  getPictures(strs) {
    return strs.split('|');
  }
  back() {
    this.events.publish('tab_changed_0');

  }
  openBrowser(fb_id) {

    this.storage.get('checkUser').then((val) => {
      if (val == true) {
        if (this.platform.is('cordova')) {
          cordova.InAppBrowser.open('https://fb.com/' + fb_id, '_blank', 'location=yes');
        }
      } else {
        this.showConfirm();
      }
    });
  }

  getHomestayReviews() {
    this.appProvider.getHomestayReviews(this.homestayList[0]).then((data: any) => {
      this.reviews = data;
    })
  }

  addReview() {
    this.storage.get('checkUser').then((val) => {
      if (val == true) {
        if (this.ratingCheck > 0) {
          let currentTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
          var reviewRef = this.itemsCollection.doc(this.user['base64']).collection("rating");
          reviewRef.add({
            star: this.ratingCheck,
            name: this.myUser['name'],
            time: currentTimestamp.toDate().toLocaleDateString() + ' ' + currentTimestamp.toDate().toLocaleTimeString(),
            comment: this.comment
          }).then(() => {
            this.ratingCheck = 0;
            this.comment = '';
            this.loadRating();
          });
        }
      } else {
        this.showConfirm();
      }
    });
  }
  clickStar(number) {
    this.ratingCheck = number;
  }
  loadRating() {
    var list = [];
    var ratingRef = this.db.collection("users").doc(this.user['base64']).collection("rating");
    ratingRef.get().toPromise().then((doc) => {
      doc.forEach((doc) => {
        list.push(doc.data());
      });
    }).then(() => {
      this.listComment = list;
    })
  }
  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Login',
      message: 'Please login to continue !!!',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            // this.navCtrl.push(HomePage);
            this.app.getRootNav().push(TabsPage);
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.app.getRootNav().push(LoginPage);
          }
        }
      ]
    });
    confirm.present();
  }

}
