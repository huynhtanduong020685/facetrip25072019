import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from "angularfire2/auth";

import { BaseService } from "./base.service";

//import * as firebase from 'firebase/app';

@Injectable()
export class AuthService extends BaseService {

  constructor(
    public afAuth: AngularFireAuth,
    public http: Http
  ) {
    super();
  }


}
