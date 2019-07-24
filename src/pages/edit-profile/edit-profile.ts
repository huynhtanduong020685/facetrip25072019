import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
//import { AppProvider } from '../../providers/app/app';
import { GlobalVariables } from '../../global/global_variable';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UtilProvider } from '../../providers/util/util';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  private itemsCollection: AngularFirestoreCollection<any>;
  countryList: Array<any> = [];
  user: any = GlobalVariables.user;
  pictures = [];

  checkCountry: boolean;
  checkCity: boolean;
  checkLang1: boolean;
  checkLang2: boolean;
  checkLang3: boolean;
  checkLang4: boolean;

  itemsCountry: any;
  itemsLang: any;
  itemsCity: any;
  filtContry: any;
  filtCity: any;
  filtLang: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertController: AlertController,
    //private appProvider: AppProvider,
    private storage: AngularFireStorage,
    private util: UtilProvider,
    private db: AngularFirestore,
    public http: HttpClient
  ) {
    this.loadCountryJSON();
    if (!this.user['pictures']) {
      this.user['pictures'] = '';
    } else {
      this.pictures = this.user['pictures'].split('|');
    }
  }
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'users/' + file['name'];
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    this.util.presentLoading();
    task.then(res => {
      this.storage.ref(filePath).getDownloadURL().subscribe(data => {
        if (data) {
          this.user['pictures'] += data + '|';
        }
        this.util.stopLoading();
      })
    }, err => this.util.stopLoading())
  }
  ionViewDidLoad() {
    this.itemsCollection = this.db.collection<any>('users');
    this.user = this.navParams.get('user') || this.user;
  }

  onItemSelected(ev) {
    this.user['country'] = ev;
  }
  loadCountryJSON() {
    this.http
      .get('assets/country.json')
      .subscribe((data) => {
        this.itemsCountry = data;
      });
    this.http
      .get('assets/lang_list.json')
      .subscribe((data) => {
        this.itemsLang = data;
      });
    this.checkCountry = false;
    this.checkCity = false;
    this.checkLang1 = false;
    this.checkLang2 = false;
    this.checkLang3 = false;
    this.checkLang4 = false;
  }
  clickAutocomplete(data) {

    if (data.country) {
      this.user['country'] = data.country;
      this.user['city'] = data.city;
      this.filtContry = [];
      this.checkCountry = false;
    }
    if (data.city) {
      this.user['city'] = data.city;
      this.filtCity = [];
      this.checkCity = false;
    }
    if (data.language1) {
      this.user['language1'] = data.language1;
      this.filtLang = [];
      this.checkLang1 = false;
    }
    if (data.language2) {
      this.user['language2'] = data.language2;
      this.filtLang = [];
      this.checkLang2 = false;
    }
    if (data.language3) {
      this.user['language3'] = data.language3;
      this.filtLang = [];
      this.checkLang3 = false;
    }
    if (data.language4) {
      this.user['language4'] = data.language4;
      this.filtLang = [];
      this.checkLang4 = false;
    }

  }
  filter() {
    if (this.user['country'].length >= 3) {
      this.checkCountry = true
      this.filtContry = this.itemsCountry.filter(item => item.country.toLowerCase().indexOf(this.user['country'].toLowerCase()) > -1).map(i => i);
    } else {
      this.filtContry = [];
      this.checkCountry = false
    }
  }
  filterCity() {
    if (this.user['city'].length >= 2) {
      this.checkCity = true
      this.filtCity = this.itemsCountry.filter(item => (item.city || '').toLowerCase().indexOf(this.user['city'].toLowerCase()) > -1);
    } else {
      this.checkCity = false
      this.filtCity = [];
    }
  }
  filterLang() {
    if (this.user['language1'].length >= 1) {
      this.checkLang1 = true;
      this.filtLang = this.itemsLang.filter(item => item.lang_name.toLowerCase().indexOf(this.user['language1'].toLowerCase()) > -1);
    } else {
      this.checkLang1 = false;
      this.filtLang = [];
    }
  }
  filterLang2() {
    if (this.user['language2'].length >= 1) {
      this.checkLang2 = true;
      this.filtLang = this.itemsLang.filter(item => item.lang_name.toLowerCase().indexOf(this.user['language2'].toLowerCase()) > -1);
    } else {
      this.checkLang2 = false;
      this.filtLang = [];
    }
  }
  filterLang3() {
    if (this.user['language3'].length >= 1) {
      this.checkLang3 = true;
      this.filtLang = this.itemsLang.filter(item => item.lang_name.toLowerCase().indexOf(this.user['language3'].toLowerCase()) > -1);
    } else {
      this.checkLang3 = false;
      this.filtLang = [];
    }
  }
  filterLang4() {
    if (this.user['language4'].length >= 1) {
      this.checkLang4 = true;
      this.filtLang = this.itemsLang.filter(item => item.lang_name.toLowerCase().indexOf(this.user['language4'].toLowerCase()) > -1);
    } else {
      this.checkLang4 = false;
      this.filtLang = [];
    }
  }
  async presentAlertCheckbox() {
    const alert = await this.alertController.create({
      inputs: [
        {
          type: 'checkbox',
          label: 'INTERNET GAME',
          value: 'INTERNET GAME ',
        },

        {
          type: 'checkbox',
          label: 'NIGHT LIFE',
          value: 'NIGHT LIFE  ',
        },

        {
          type: 'checkbox',
          label: 'PET',
          value: 'PET '
        },

        {
          type: 'checkbox',
          label: 'MUSIC',
          value: 'MUSIC '
        },

        {
          type: 'checkbox',
          label: 'MOVIE',
          value: 'MOVIE '
        },

        {
          type: 'checkbox',
          label: 'TRIP',
          value: 'TRIP '
        },
        {
          type: 'checkbox',
          label: 'SPORTS',
          value: 'SPORTS '
        },
        {
          type: 'checkbox',
          label: 'FOOD',
          value: 'FOOD '
        },
        {
          type: 'checkbox',
          label: 'SHOPPING',
          value: 'SHOPPING '
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.user['interest'] = data;
          }
        }
      ]
    });

    await alert.present();
  }


  save() {
    this.util.presentLoading();
    this.itemsCollection.doc(this.user['base64']).update(this.user).then(res => {
      GlobalVariables.user = this.user;
      this.util.setLocal('user', this.user);
      this.util.stopLoading();
    }, err => this.util.stopLoading())

  }
}
