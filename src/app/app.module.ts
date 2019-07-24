import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
//import { AutoCompleteModule } from 'ionic2-auto-complete';

import { AuthService } from '../providers/auth.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { UtilProvider } from '../providers/util/util';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
//import { Observable } from 'rxjs';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { AppProvider } from '../providers/app/app';
import { HomestayDetailPage } from '../pages/homestay-detail/homestay-detail';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { PipesModule } from '../pipes/pipes.module';
import { LocalDetailPage } from '../pages/local-detail/local-detail';
import { HomestayViewPage } from '../pages/homestay-view/homestay-view';
import { ChatsPage } from '../pages/chats/chats';
import { ComponentsModule } from '../components/components.module';
import { PopupPage } from '../pages/popup/popup';
import { StarRatingModule } from 'ionic3-star-rating';
import { Facebook } from '@ionic-native/facebook';

export const firebaseConfig = {
    apiKey: "AIzaSyBvEJmRrEhzkoirQaTTJEYLnVLVZZ6urHM",
    authDomain: "facetriper.firebaseio.com",
    databaseURL: "https://facetriper.firebaseio.com",
    projectId: "facetriper",
    storageBucket: "facetriper.appspot.com",
    messagingSenderId: "443594649686"

};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    EditProfilePage,
    HomestayDetailPage,
    LocalDetailPage,
    HomestayViewPage,
    ChatsPage,
    PopupPage
    
  ],
  imports: [
    BrowserModule,
    StarRatingModule ,// Put ionic-rating module here
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: false,
    }),
    IonicStorageModule.forRoot({
      name: '_facetrip',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    PipesModule,
    //AutoCompleteModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    EditProfilePage,
    HomestayDetailPage,
    LocalDetailPage,
    HomestayViewPage,
    ChatsPage,
    PopupPage
    
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UtilProvider,
    AppProvider,
    Facebook
  ]
})
export class AppModule { }
