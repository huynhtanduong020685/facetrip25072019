import { Component } from '@angular/core';
import { NavController, AlertController, App } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { GlobalVariables } from '../../global/global_variable';
import { ChatsPage } from '../chats/chats';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { UtilProvider } from '../../providers/util/util';
import { FilterByPipe } from '../../pipes/filter-by/filter-by';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  country: string = '';
  language: string = '';
  chatHistory: Array<any> = [];
  onlineUsers: Array<any> = [];
  countryCount: number = 0;
  chatHistorySearch: Array<any> = [];
  public checkUser: boolean;
  constructor(
    public app: App,
    public alertCtrl: AlertController,
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    private util: UtilProvider,
    private appProvider: AppProvider) {
  }
  ionViewWillEnter() {
    this.storage.get('checkUser').then((val) => {
      if (val == true) {
        this.checkUser = true;
        this.util.presentLoading();
        this.appProvider.getOnlineUsers().then((data: any) => {
          this.onlineUsers = data;
          this.appProvider.getChatHistory(GlobalVariables.user['base64']).then((data: any) => {
            this.chatHistory = data;
            // this.searchChatHistory();
            this.chatHistory.map(item => {
              if (this.checkOnline(item)) {
                item['online'] = true;
              }
            })
            this.util.stopLoading();
          }, () => this.util.stopLoading())
        });
      } else {
        this.checkUser = false;
        this.showConfirm();
      }
    });
    var receiver = Object.assign({}, GlobalVariables.selectedUser);
    if (receiver && receiver['base64']) {
      GlobalVariables.selectedUser = {};
      this.goToChat(receiver);
    }
  }
  checkOnline(_item) {
    var filter = this.onlineUsers.filter(item => {
      return _item['base64'] == item['base64'];
    })
    return filter.length > 0;
  }
  goToChat(user) {
    this.navCtrl.push(ChatsPage, { receiver: user, user: GlobalVariables.user });
  }

  onSearchClearCountry() {
    this.country = '';
    this.searchChatHistory();
  }
  onSearchClearLanguage() {
    this.language = '';
    this.searchChatHistory();
  }

  searchChatHistory() {
    var filterBy = new FilterByPipe();

    var filter = filterBy.transform(this.chatHistory, {
      country: this.country,
      languages: this.language
    });

    this.chatHistorySearch = filter;
    
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
