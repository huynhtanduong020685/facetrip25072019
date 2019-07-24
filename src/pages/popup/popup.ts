import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Content, ToastController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
//import { GlobalVariables } from '../../global/global_variable';
//import { UtilProvider } from '../../providers/util/util';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'page-popup',
  templateUrl: 'popup.html',
})
export class PopupPage {

  @ViewChild(Content) content: Content;
  itemsCollection: AngularFirestoreCollection<any>;

  message: string = '';
  receiver: any = {};
  myUser: any = {};
  msgList: Array<any> = [];

  listUser: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public db: AngularFirestore,
   // private util: UtilProvider,
    private appProvider: AppProvider,
    public toastCtrl: ToastController) {
  }

  ionViewWillEnter() {
    this.listUser = this.navParams.get('device');
    this.myUser = this.navParams.get('user');
  }
  clickSend() {
    if (this.message != '') {
      var i = 0;
      while (i < this.listUser.length) {
        this.appProvider.addChageHistory(this.myUser, this.listUser[i]);
        this.appProvider.addChageHistory(this.listUser[i], this.myUser);
        this.appProvider.submitChat(this.myUser['base64'], this.listUser[i]['base64'], this.message);
        i += 1;
      }
      this.message = '';
      this.presentToast('successfully');
      this.viewCtrl.dismiss();

    }
  }
  clickClose() {
    this.viewCtrl.dismiss();
  }
  presentToast(data) {
    const toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

}
