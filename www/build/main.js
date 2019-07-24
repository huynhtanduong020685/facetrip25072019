webpackJsonp([0],{

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_global_variable__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_util_util__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_fire_storage__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(132);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


//import { AppProvider } from '../../providers/app/app';





var EditProfilePage = /** @class */ (function () {
    function EditProfilePage(navCtrl, navParams, alertController, 
        //private appProvider: AppProvider,
        storage, util, db, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertController = alertController;
        this.storage = storage;
        this.util = util;
        this.db = db;
        this.http = http;
        this.countryList = [];
        this.user = __WEBPACK_IMPORTED_MODULE_2__global_global_variable__["a" /* GlobalVariables */].user;
        this.pictures = [];
        this.loadCountryJSON();
        if (!this.user['pictures']) {
            this.user['pictures'] = '';
        }
        else {
            this.pictures = this.user['pictures'].split('|');
        }
    }
    EditProfilePage.prototype.uploadFile = function (event) {
        var _this = this;
        var file = event.target.files[0];
        var filePath = 'users/' + file['name'];
        var ref = this.storage.ref(filePath);
        var task = ref.put(file);
        this.util.presentLoading();
        task.then(function (res) {
            _this.storage.ref(filePath).getDownloadURL().subscribe(function (data) {
                if (data) {
                    _this.user['pictures'] += data + '|';
                }
                _this.util.stopLoading();
            });
        }, function (err) { return _this.util.stopLoading(); });
    };
    EditProfilePage.prototype.ionViewDidLoad = function () {
        this.itemsCollection = this.db.collection('users');
        this.user = this.navParams.get('user') || this.user;
    };
    EditProfilePage.prototype.onItemSelected = function (ev) {
        this.user['country'] = ev;
    };
    EditProfilePage.prototype.loadCountryJSON = function () {
        var _this = this;
        this.http
            .get('assets/country.json')
            .subscribe(function (data) {
            _this.itemsCountry = data;
        });
        this.http
            .get('assets/lang_list.json')
            .subscribe(function (data) {
            _this.itemsLang = data;
        });
        this.checkCountry = false;
        this.checkCity = false;
        this.checkLang1 = false;
        this.checkLang2 = false;
        this.checkLang3 = false;
        this.checkLang4 = false;
    };
    EditProfilePage.prototype.clickAutocomplete = function (data) {
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
    };
    EditProfilePage.prototype.filter = function () {
        var _this = this;
        if (this.user['country'].length >= 3) {
            this.checkCountry = true;
            this.filtContry = this.itemsCountry.filter(function (item) { return item.country.toLowerCase().indexOf(_this.user['country'].toLowerCase()) > -1; }).map(function (i) { return i; });
        }
        else {
            this.filtContry = [];
            this.checkCountry = false;
        }
    };
    EditProfilePage.prototype.filterCity = function () {
        var _this = this;
        if (this.user['city'].length >= 2) {
            this.checkCity = true;
            this.filtCity = this.itemsCountry.filter(function (item) { return (item.city || '').toLowerCase().indexOf(_this.user['city'].toLowerCase()) > -1; });
        }
        else {
            this.checkCity = false;
            this.filtCity = [];
        }
    };
    EditProfilePage.prototype.filterLang = function () {
        var _this = this;
        if (this.user['language1'].length >= 1) {
            this.checkLang1 = true;
            this.filtLang = this.itemsLang.filter(function (item) { return item.lang_name.toLowerCase().indexOf(_this.user['language1'].toLowerCase()) > -1; });
        }
        else {
            this.checkLang1 = false;
            this.filtLang = [];
        }
    };
    EditProfilePage.prototype.filterLang2 = function () {
        var _this = this;
        if (this.user['language2'].length >= 1) {
            this.checkLang2 = true;
            this.filtLang = this.itemsLang.filter(function (item) { return item.lang_name.toLowerCase().indexOf(_this.user['language2'].toLowerCase()) > -1; });
        }
        else {
            this.checkLang2 = false;
            this.filtLang = [];
        }
    };
    EditProfilePage.prototype.filterLang3 = function () {
        var _this = this;
        if (this.user['language3'].length >= 1) {
            this.checkLang3 = true;
            this.filtLang = this.itemsLang.filter(function (item) { return item.lang_name.toLowerCase().indexOf(_this.user['language3'].toLowerCase()) > -1; });
        }
        else {
            this.checkLang3 = false;
            this.filtLang = [];
        }
    };
    EditProfilePage.prototype.filterLang4 = function () {
        var _this = this;
        if (this.user['language4'].length >= 1) {
            this.checkLang4 = true;
            this.filtLang = this.itemsLang.filter(function (item) { return item.lang_name.toLowerCase().indexOf(_this.user['language4'].toLowerCase()) > -1; });
        }
        else {
            this.checkLang4 = false;
            this.filtLang = [];
        }
    };
    EditProfilePage.prototype.presentAlertCheckbox = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
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
                                    handler: function () {
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (data) {
                                        _this.user['interest'] = data;
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditProfilePage.prototype.save = function () {
        var _this = this;
        this.util.presentLoading();
        this.itemsCollection.doc(this.user['base64']).update(this.user).then(function (res) {
            __WEBPACK_IMPORTED_MODULE_2__global_global_variable__["a" /* GlobalVariables */].user = _this.user;
            _this.util.setLocal('user', _this.user);
            _this.util.stopLoading();
        }, function (err) { return _this.util.stopLoading(); });
    };
    EditProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-edit-profile',template:/*ion-inline-start:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/edit-profile/edit-profile.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Edit Profile</ion-title>\n    <ion-buttons right>\n      <button ion-button clear (tap)="save()">\n        Save\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="uploads">\n    <img *ngIf="!user[\'pictures\']" [src]="user[\'picture\']" alt="">\n    <ion-slides *ngIf="user[\'pictures\']" pager="true">\n      <ng-container *ngFor="let pic of pictures">\n        <ion-slide *ngIf="pic.length>0">\n          <img [src]="pic" alt="">\n        </ion-slide>\n      </ng-container>\n    </ion-slides>\n    <div class="upload-btn-wrapper">\n      <button class="btn">Upload a photo</button>\n      <input type="file" (change)="uploadFile($event)">\n    </div>\n  </div>\n  <!-- <div class="country">\n    <p *ngIf="user[\'country\']">Country</p>\n    <ion-auto-complete [useIonInput]="true" [options]="{placeholder:\'Countries\'}"\n      (itemSelected)="onItemSelected($event)" [dataProvider]="appProvider">\n    </ion-auto-complete>\n  </div> -->\n  <div>\n    <ion-label>Country</ion-label>\n    <ion-searchbar [(ngModel)]="user[\'country\']" (ionInput)="filter()" placeholder="Country"></ion-searchbar>\n    <div *ngIf="user[\'country\'] != \'\' && checkCountry == true">\n      <ion-list class="search-css">\n        <div *ngFor=" let item of filtContry">\n          <ion-item (click)="clickAutocomplete(item)">\n            {{item.country}}, [{{item.city}}]\n          </ion-item>\n        </div>\n      </ion-list>\n    </div>\n  </div>\n  <div>\n    <ion-label>City</ion-label>\n    <ion-searchbar [(ngModel)]="user[\'city\']" (ionInput)="filterCity()" placeholder="city"></ion-searchbar>\n\n    <div *ngIf="user[\'city\'] != \'\' && checkCity == true">\n      <ion-list class="search-css">\n        <div *ngFor=" let item of filtCity">\n          <ion-item (click)="clickAutocomplete({\'city\':item.city})">\n            {{item.city}}, [{{item.country}}]\n          </ion-item>\n        </div>\n      </ion-list>\n    </div>\n  </div>\n  <div>\n    <ion-label>Language 1</ion-label>\n    <ion-searchbar [(ngModel)]="user[\'language1\']" (ionInput)="filterLang()" placeholder="language1"></ion-searchbar>\n\n    <div *ngIf="user[\'language1\'] != \'\' && checkLang1 == true">\n      <ion-list class="search-css">\n        <div *ngFor=" let item of filtLang">\n          <ion-item (click)="clickAutocomplete({\'language1\':item.lang_name})">\n            {{item.lang_name}}\n          </ion-item>\n        </div>\n      </ion-list>\n    </div>\n  </div>\n  <div>\n    <ion-label>Language 2</ion-label>\n    <ion-searchbar [(ngModel)]="user[\'language2\']" (ionInput)="filterLang2()" placeholder="language2"></ion-searchbar>\n\n    <div *ngIf="user[\'language2\'] != \'\' && checkLang2 == true">\n      <ion-list class="search-css">\n        <div *ngFor=" let item of filtLang">\n          <ion-item (click)="clickAutocomplete({\'language2\':item.lang_name})">\n            {{item.lang_name}}\n          </ion-item>\n        </div>\n      </ion-list>\n    </div>\n  </div>\n  <div>\n    <ion-label>Language 3</ion-label>\n    <ion-searchbar [(ngModel)]="user[\'language3\']" (ionInput)="filterLang3()" placeholder="language3"></ion-searchbar>\n\n    <div *ngIf="user[\'language3\'] != \'\' && checkLang3 == true">\n      <ion-list class="search-css">\n        <div *ngFor=" let item of filtLang">\n          <ion-item (click)="clickAutocomplete({\'language3\':item.lang_name})">\n            {{item.lang_name}}\n          </ion-item>\n        </div>\n      </ion-list>\n    </div>\n  </div>\n  <div>\n    <ion-label>Language 4</ion-label>\n    <ion-searchbar [(ngModel)]="user[\'language4\']" (ionInput)="filterLang4()" placeholder="language4"></ion-searchbar>\n\n    <div *ngIf="user[\'language4\'] != \'\' && checkLang4 == true">\n      <ion-list class="search-css">\n        <div *ngFor=" let item of filtLang">\n          <ion-item (click)="clickAutocomplete({\'language4\':item.lang_name})">\n            {{item.lang_name}}\n          </ion-item>\n        </div>\n      </ion-list>\n    </div>\n  </div>\n  <div>\n    <ion-label>Guide Fee</ion-label>\n    <ion-input type="number" [(ngModel)]="user[\'guide_fee\']"></ion-input>\n  </div>\n  <div>\n    <!-- <ion-toggle [(ngModel)]="user[\'meet_at_airport\']"></ion-toggle> -->\n    <ion-item>\n        <ion-label>Meet at Airport?</ion-label>\n        <ion-select [(ngModel)]="user[\'meet_at_airport\']">\n          <ion-option value="true">possible</ion-option>\n          <ion-option value="false">impossible</ion-option>\n        </ion-select>\n      </ion-item>\n  </div>\n\n  <div>\n    <ion-label>Interest</ion-label>\n    <ion-input [(ngModel)]="user[\'interest\']" (tap)="presentAlertCheckbox()"></ion-input>\n  </div>\n  <div>\n    <ion-label>Introduction</ion-label>\n    <ion-textarea rows="3" [(ngModel)]="user[\'introduction\']"></ion-textarea>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/edit-profile/edit-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__angular_fire_storage__["a" /* AngularFireStorage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_util_util__["a" /* UtilProvider */],
            __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["a" /* HttpClient */]])
    ], EditProfilePage);
    return EditProfilePage;
}());

//# sourceMappingURL=edit-profile.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterByPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterByPipe = /** @class */ (function () {
    function FilterByPipe() {
    }
    FilterByPipe_1 = FilterByPipe;
    FilterByPipe.isFoundOnWalking = function (value, key) {
        var walker = value;
        var found = false;
        do {
            if (walker.hasOwnProperty(key) ||
                Object.getOwnPropertyDescriptor(walker, key)) {
                found = true;
                break;
            }
        } while ((walker = Object.getPrototypeOf(walker)));
        return found;
    };
    FilterByPipe.isNumber = function (value) {
        return !isNaN(parseInt(value, 10)) && isFinite(value);
    };
    /**
     * Checks function's value if type is function otherwise same value
     */
    FilterByPipe.getValue = function (value) {
        return typeof value === 'function' ? value() : value;
    };
    FilterByPipe.prototype.filterByString = function (filter) {
        if (filter) {
            filter = filter.toLowerCase();
        }
        return function (value) {
            return !filter ||
                (value ? ('' + value).toLowerCase().indexOf(filter) !== -1 : false);
        };
    };
    FilterByPipe.prototype.filterByBoolean = function (filter) {
        return function (value) { return Boolean(value) === filter; };
    };
    FilterByPipe.prototype.filterByObject = function (filter) {
        var _this = this;
        return function (value) {
            for (var key in filter) {
                if (key === '$or') {
                    if (!_this.filterByOr(filter.$or)(FilterByPipe_1.getValue(value))) {
                        return false;
                    }
                    continue;
                }
                if (!value || !FilterByPipe_1.isFoundOnWalking(value, key)) {
                    return false;
                }
                if (!_this.isMatching(filter[key], FilterByPipe_1.getValue(value[key]))) {
                    return false;
                }
            }
            return true;
        };
    };
    FilterByPipe.prototype.isMatching = function (filter, val) {
        val = val.toLowerCase();
        switch (typeof filter) {
            case 'boolean':
                return this.filterByBoolean(filter)(val);
            case 'string':
                return this.filterByString(filter)(val);
            case 'object':
                return this.filterByObject(filter)(val);
        }
        return this.filterDefault(filter)(val);
    };
    /**
     * Filter value by $or
     */
    FilterByPipe.prototype.filterByOr = function (filter) {
        var _this = this;
        return function (value) {
            var length = filter.length;
            var arrayComparison = function (i) { return value.indexOf(filter[i]) !== -1; };
            var otherComparison = function (i) { return _this.isMatching(filter[i], value); };
            var comparison = Array.isArray(value)
                ? arrayComparison
                : otherComparison;
            for (var i = 0; i < length; i++) {
                if (comparison(i)) {
                    return true;
                }
            }
            return false;
        };
    };
    /**
     * Default filterDefault function
     */
    FilterByPipe.prototype.filterDefault = function (filter) {
        return function (value) { return filter === undefined || filter == value; };
    };
    FilterByPipe.prototype.transform = function (array, filter) {
        if (!array) {
            return array;
        }
        switch (typeof filter) {
            case 'boolean':
                return array.filter(this.filterByBoolean(filter));
            case 'string':
                if (FilterByPipe_1.isNumber(filter)) {
                    return array.filter(this.filterDefault(filter));
                }
                return array.filter(this.filterByString(filter));
            case 'object':
                return array.filter(this.filterByObject(filter));
            case 'function':
                return array.filter(filter);
        }
        return array.filter(this.filterDefault(filter));
    };
    FilterByPipe = FilterByPipe_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'filterBy',
            pure: false
        })
    ], FilterByPipe);
    return FilterByPipe;
    var FilterByPipe_1;
}());

//# sourceMappingURL=filter-by.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app_app__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_global_variable__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chats_chats__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_params__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_util_util__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipes_filter_by_filter_by__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login_login__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tabs_tabs__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ContactPage = /** @class */ (function () {
    function ContactPage(app, alertCtrl, storage, navCtrl, navParams, util, appProvider) {
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.util = util;
        this.appProvider = appProvider;
        this.country = '';
        this.language = '';
        this.chatHistory = [];
        this.onlineUsers = [];
        this.countryCount = 0;
        this.chatHistorySearch = [];
    }
    ContactPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('checkUser').then(function (val) {
            if (val == true) {
                _this.checkUser = true;
                _this.util.presentLoading();
                _this.appProvider.getOnlineUsers().then(function (data) {
                    _this.onlineUsers = data;
                    _this.appProvider.getChatHistory(__WEBPACK_IMPORTED_MODULE_3__global_global_variable__["a" /* GlobalVariables */].user['base64']).then(function (data) {
                        _this.chatHistory = data;
                        // this.searchChatHistory();
                        _this.chatHistory.map(function (item) {
                            if (_this.checkOnline(item)) {
                                item['online'] = true;
                            }
                        });
                        _this.util.stopLoading();
                    }, function () { return _this.util.stopLoading(); });
                });
            }
            else {
                _this.checkUser = false;
                _this.showConfirm();
            }
        });
        var receiver = Object.assign({}, __WEBPACK_IMPORTED_MODULE_3__global_global_variable__["a" /* GlobalVariables */].selectedUser);
        if (receiver && receiver['base64']) {
            __WEBPACK_IMPORTED_MODULE_3__global_global_variable__["a" /* GlobalVariables */].selectedUser = {};
            this.goToChat(receiver);
        }
    };
    ContactPage.prototype.checkOnline = function (_item) {
        var filter = this.onlineUsers.filter(function (item) {
            return _item['base64'] == item['base64'];
        });
        return filter.length > 0;
    };
    ContactPage.prototype.goToChat = function (user) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__chats_chats__["a" /* ChatsPage */], { receiver: user, user: __WEBPACK_IMPORTED_MODULE_3__global_global_variable__["a" /* GlobalVariables */].user });
    };
    ContactPage.prototype.onSearchClearCountry = function () {
        this.country = '';
        this.searchChatHistory();
    };
    ContactPage.prototype.onSearchClearLanguage = function () {
        this.language = '';
        this.searchChatHistory();
    };
    ContactPage.prototype.searchChatHistory = function () {
        var filterBy = new __WEBPACK_IMPORTED_MODULE_7__pipes_filter_by_filter_by__["a" /* FilterByPipe */]();
        var filter = filterBy.transform(this.chatHistory, {
            country: this.country,
            languages: this.language
        });
        this.chatHistorySearch = filter;
    };
    ContactPage.prototype.showConfirm = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Login',
            message: 'Please login to continue !!!',
            buttons: [
                {
                    text: 'Disagree',
                    handler: function () {
                        // this.navCtrl.push(HomePage);
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_9__tabs_tabs__["a" /* TabsPage */]);
                    }
                },
                {
                    text: 'Agree',
                    handler: function () {
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_8__login_login__["a" /* LoginPage */]);
                    }
                }
            ]
        });
        confirm.present();
    };
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/contact/contact.html"*/'<ion-header color="color-header">\n  <ion-navbar color="color-header">\n    <ion-title>\n      FACE TRIP\n    </ion-title>\n  </ion-navbar>\n  <div class="searchbox">\n    <ion-searchbar [(ngModel)]="country" (ionClear)="onSearchClearCountry()" (search)="searchChatHistory()"\n      [placeholder]="\'Vietnam\'+\'(\'+countryCount+\')\'" mode="ios"></ion-searchbar>\n    <ion-searchbar [(ngModel)]="language" (ionClear)="onSearchClearLanguage()" (search)="searchChatHistory()"\n      placeholder="Languages" mode="ios"></ion-searchbar>\n    <button ion-button clear icon-only color="light" (tap)="searchChatHistory()">\n      <ion-icon name="md-search"></ion-icon>\n    </button>\n  </div>\n</ion-header>\n\n<ion-content>\n  <div *ngIf=\'checkUser==true\'>\n    <ion-list>\n      <ion-item (tap)="goToChat(item)" *ngFor="let item of chatHistory">\n        <ion-avatar item-start>\n          <img [src]="item[\'picture\']">\n        </ion-avatar>\n        <h2>{{item[\'name\']}}</h2>\n        <button item-end ion-button round [color]="item[\'online\']? \'secondary\' : \'_gray\'"></button>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/contact/contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_params__["a" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__providers_util_util__["a" /* UtilProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_app_app__["a" /* AppProvider */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app_app__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util_util__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_fire_firestore__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { GlobalVariables } from '../../global/global_variable';


/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatsPage = /** @class */ (function () {
    function ChatsPage(navCtrl, navParams, db, util, appProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.util = util;
        this.appProvider = appProvider;
        this.message = '';
        this.receiver = {};
        this.user = {};
        this.msgList = [];
        this.receiver = Object.assign({}, this.navParams.get('receiver'));
        this.user = Object.assign({}, this.navParams.get('user'));
        this.appProvider.addChageHistory(this.user, this.receiver);
        this.appProvider.addChageHistory(this.receiver, this.user);
    }
    ChatsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.itemsCollection = this.db.collection('chats');
        this.itemsCollection.doc(this.util.getChatId(this.user['base64'], this.receiver['base64'])).collection("chats", function (ref) { return ref.orderBy('date'); }).snapshotChanges().subscribe(function (data) {
            _this.msgList = [];
            data.forEach(function (doc) {
                var chat = doc.payload.doc.data();
                chat['id'] = doc.payload.doc.id;
                _this.msgList.push(chat);
            });
        });
    };
    ChatsPage.prototype.submitChat = function () {
        var _this = this;
        if (this.message != '') {
            this.appProvider.submitChat(this.user['base64'], this.receiver['base64'], this.message).then(function () {
                _this.content.scrollToBottom();
            });
            this.message = '';
        }
    };
    ChatsPage.prototype.getChatList = function () {
        var _this = this;
        this.appProvider.getChatList(this.user['base64'], this.receiver['base64']).then(function (chats) {
            _this.msgList = chats;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], ChatsPage.prototype, "content", void 0);
    ChatsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chats',template:/*ion-inline-start:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/chats/chats.html"*/'<!--\n  Generated template for the ChatsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>{{receiver[\'name\']}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="message-wrap">\n    <div *ngFor="let msg of msgList" class="message" [class.left]=" msg[\'sender\'] === receiver[\'base64\'] "\n      [class.right]=" msg[\'sender\'] === user[\'base64\'] ">\n      <img class="user-img" [src]="receiver[\'picture\']" alt="" *ngIf="msg[\'sender\'] === receiver[\'base64\']">\n      <img class="user-img" [src]="user[\'picture\']" alt=""  *ngIf="msg[\'sender\'] === user[\'base64\']">\n      <ion-spinner name="dots" *ngIf="msg.status === \'pending\'"></ion-spinner>\n      <div class="msg-detail">\n        <div class="msg-info">\n          <p>\n            {{msg.userName}}&nbsp;&nbsp;&nbsp;{{msg.date|date:\'MMM dd, yyyy hh:mm aa\'}}</p>\n        </div>\n        <div class="msg-content">\n          <span class="triangle"></span>\n          <p class="line-breaker ">{{msg.message}}</p>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</ion-content>\n<ion-footer>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-10>\n        <ion-textarea [(ngModel)]="message" rows="2" placeholder="Message"></ion-textarea>\n      </ion-col>\n      <ion-col col-2>\n        <button (tap)="submitChat()" ion-button small>Send</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-footer>\n'/*ion-inline-end:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/chats/chats.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__angular_fire_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_3__providers_util_util__["a" /* UtilProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_app_app__["a" /* AppProvider */]])
    ], ChatsPage);
    return ChatsPage;
}());

//# sourceMappingURL=chats.js.map

/***/ }),

/***/ 258:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 258;

/***/ }),

/***/ 299:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 299;

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_global_variable__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit_profile_edit_profile__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__homestay_detail_homestay_detail__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_params__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tabs_tabs__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_util_util__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_facebook__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';



//import { AngularFireAuth } from '@angular/fire/auth';



var AboutPage = /** @class */ (function () {
    function AboutPage(app, alertCtrl, storage, navCtrl, navParams, modalCtrl, 
        //private db: AngularFirestore,
        // private af_auth: AngularFireAuth,
        fb, util) {
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.fb = fb;
        this.util = util;
        this.localList = [];
    }
    AboutPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('checkUser').then(function (val) {
            if (val == true) {
                _this.checkUser = true;
                _this.user = __WEBPACK_IMPORTED_MODULE_2__global_global_variable__["a" /* GlobalVariables */].user;
                console.log(_this.user);
            }
            else {
                _this.checkUser = false;
                _this.showConfirm();
            }
        });
    };
    AboutPage.prototype.editProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__edit_profile_edit_profile__["a" /* EditProfilePage */], { user: this.user });
    };
    AboutPage.prototype.logout = function () {
        this.util.clearLocal();
        this.fb.logout();
        this.storage.set('checkUser', false);
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_7__tabs_tabs__["a" /* TabsPage */]);
    };
    AboutPage.prototype.viewDetail = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__homestay_detail_homestay_detail__["a" /* HomestayDetailPage */], { homestay: item });
    };
    // getHomeStayList() {
    //   this.homestayList = [];
    //   this.itemsCollection.doc(this.user['base64']).collection('items').get().subscribe(snap => {
    //     snap.forEach((doc) => {
    //       var obj = doc.data();
    //       obj['id'] = doc.id;
    //       this.homestayList.push(obj);
    //     });
    //   })
    // }
    AboutPage.prototype.showConfirm = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Login',
            message: 'Please login to continue !!!',
            buttons: [
                {
                    text: 'Disagree',
                    handler: function () {
                        // this.navCtrl.push(HomePage);
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_7__tabs_tabs__["a" /* TabsPage */]);
                    }
                },
                {
                    text: 'Agree',
                    handler: function () {
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
                    }
                }
            ]
        });
        confirm.present();
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/about/about.html"*/'  <ion-header>\n    <ion-navbar color="color-header">\n      <ion-title>\n        FACE TRIP\n      </ion-title>\n    </ion-navbar>\n  </ion-header>\n\n  <ion-content>\n    <div *ngIf=\'checkUser==true\'>\n      <ion-card>\n        <ion-card-content>\n          <ion-grid>\n            <ion-row>\n              <ion-col col-4 text-center>\n                <img [src]="user[\'picture\']+\'?type=normal\'" alt="">\n              </ion-col>\n              <ion-col col-8>\n                <ion-grid>\n                  <ion-row>\n                    <ion-col>\n                      <b>{{user[\'name\']}}</b>\n                    </ion-col>\n                  </ion-row>\n                  <ion-row>\n                    <ion-col>\n                      <span>{{user[\'city\']}}, {{user[\'country\']}}</span>\n                    </ion-col>\n                  </ion-row>\n                  <ion-row>\n                    <ion-col>\n                      <span class="langs">{{user[\'language1\']}}</span>\n                      <span class="langs">{{user[\'language2\']}}</span>\n                      <span class="langs">{{user[\'language3\']}}</span>\n                      <span class="langs">{{user[\'language4\']}}</span>\n                    </ion-col>\n                  </ion-row>\n                  <ion-row>\n                    <ion-col>\n                      <span>Fee: ${{user[\'guide_fee\']? user[\'guide_fee\'] : \'Free\'}}</span>\n                    </ion-col>\n                  </ion-row>\n                  <ion-row>\n                    <ion-col>\n                      <span *ngIf="user[\'meet_at_airport\'] === \'true\'; else elseairport">Meet at the Airport: POSSIBLE</span>\n                      <ng-template #elseairport>\n                        <span>Meet at the Airport: IMPOSSIBLE</span>\n                      </ng-template>\n                    </ion-col>\n                  </ion-row>\n                  <ion-row>\n                    <ion-col>\n                      <span>INTEREST: </span>\n                      <span (tap)="showPopup()">{{user[\'interest\']}}</span>\n                    </ion-col>\n                  </ion-row>\n                  <ion-row>\n                    <ion-col>\n                      <span>{{user[\'introduction\']}}</span>\n                    </ion-col>\n                  </ion-row>\n                </ion-grid>\n              </ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col text-right style="justify-content: flex-end">\n                <button clear ion-button (tap)="logout()">Logout</button>\n              </ion-col>\n              <ion-col text-right style="justify-content: flex-end">\n                <button clear ion-button (tap)="editProfile()">Edit</button>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-card-content>\n      </ion-card>\n      <div *ngIf="user[\'homestay\']; else elsehomestay">\n        <ion-list>\n          <ion-item-divider>\n            Homestay\n          </ion-item-divider>\n          <ion-item (tap)="viewDetail(user[\'homestay\'])">\n            <ion-thumbnail item-start>\n              <img [src]="user[\'homestay\'][\'picture\']">\n            </ion-thumbnail>\n            <h3>{{user[\'homestay\'][\'location\']}}</h3>\n            <p><span>Price:</span> {{user[\'homestay\'][\'price\']}}</p>\n            <p> <span>Wifi:</span> {{user[\'homestay\'][\'wifi\']?\'Yes\': \'No\'}}</p>\n            <p> <span>Breakfast:</span> {{user[\'homestay\'][\'breakfast\']?\'Yes\': \'No\'}}</p>\n            <p>{{user[\'homestay\'][\'description\']}}</p>\n          </ion-item>\n        </ion-list>\n      </div>\n      <ng-template #elsehomestay>\n        <ion-fab right bottom>\n          <button (tap)="viewDetail()" ion-fab color="primary">\n            <ion-icon name="md-add"></ion-icon>\n          </button>\n        </ion-fab>\n      </ng-template>\n\n    </div>\n  </ion-content>'/*ion-inline-end:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_params__["a" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_8__providers_util_util__["a" /* UtilProvider */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomestayDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_storage__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global_global_variable__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_util_util__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the HomestayDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HomestayDetailPage = /** @class */ (function () {
    function HomestayDetailPage(navCtrl, navParams, util, storage, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.util = util;
        this.storage = storage;
        this.db = db;
        this.user = __WEBPACK_IMPORTED_MODULE_4__global_global_variable__["a" /* GlobalVariables */].user;
        this.homeStay = __WEBPACK_IMPORTED_MODULE_4__global_global_variable__["a" /* GlobalVariables */].homeStay;
        if (this.navParams.get('homestay')) {
            this.homeStay = this.navParams.get('homestay');
            this.pictures = this.homeStay['pictures'].split('|');
        }
        if (!this.navParams.get('homestay')) {
            this.homeStay['pictures'] = '';
        }
    }
    HomestayDetailPage.prototype.uploadFile = function (event) {
        var _this = this;
        var file = event.target.files[0];
        var filePath = 'uploads/' + file['name'];
        var ref = this.storage.ref(filePath);
        var task = ref.put(file);
        this.util.presentLoading();
        task.then(function (res) {
            _this.storage.ref(filePath).getDownloadURL().subscribe(function (data) {
                if (data) {
                    _this.homeStay['picture'] = data;
                    _this.homeStay['pictures'] += data + '|';
                }
                _this.util.stopLoading();
            });
        }, function (err) { return _this.util.stopLoading(); });
    };
    HomestayDetailPage.prototype.ionViewDidLoad = function () {
        // this.itemsCollection = this.db.collection<any>('homestays');
        this.itemsCollection = this.db.collection('users');
    };
    HomestayDetailPage.prototype.submitHomeStay = function () {
        var _this = this;
        var data = { homestay: this.homeStay };
        this.util.presentLoading();
        var userRef = this.itemsCollection.doc(this.user['base64']);
        userRef.update(data).then(function (data) {
            userRef.get().subscribe(function (newdata) {
                __WEBPACK_IMPORTED_MODULE_4__global_global_variable__["a" /* GlobalVariables */].user = newdata.data();
                _this.util.stopLoading();
                _this.navCtrl.pop();
            });
        }, function (err) { _this.util.stopLoading(); });
        // if (this.homeStay['id']) {
        //   userRef.collection("items").doc(this.homeStay['id']).update(this.homeStay).then((data) => {
        //     this.util.stopLoading();
        //   }, err => { this.util.stopLoading() });
        // } else {
        //   userRef.collection("items").add(this.homeStay).then((data) => {
        //     this.util.stopLoading();
        //     this.navCtrl.pop();
        //   }, err => { this.util.stopLoading() });
        // }
    };
    HomestayDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-homestay-detail',template:/*ion-inline-start:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/homestay-detail/homestay-detail.html"*/'<!--\n  Generated template for the HomestayDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Detail</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="uploads">\n    <img *ngIf="!homeStay[\'pictures\']" [src]="homeStay[\'picture\']" alt="">\n    <ion-slides *ngIf="homeStay[\'pictures\']" pager="true">\n      <ng-container *ngFor="let pic of pictures">\n        <ion-slide *ngIf="pic.length>0">\n          <img [src]="pic" alt="">\n        </ion-slide>\n      </ng-container>\n    </ion-slides>\n    <div class="upload-btn-wrapper">\n      <button class="btn">Upload a photo</button>\n      <input type="file" (change)="uploadFile($event)">\n    </div>\n  </div>\n  <ion-item>\n    <ion-label floating>Location</ion-label>\n    <ion-input [(ngModel)]="homeStay[\'location\']"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label floating>Daily Price</ion-label>\n    <ion-input type="number" [(ngModel)]="homeStay[\'price\']"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>Wifi</ion-label>\n    <ion-toggle [(ngModel)]="homeStay[\'wifi\']"></ion-toggle>\n  </ion-item>\n  <ion-item>\n    <ion-label>Breakfast</ion-label>\n    <ion-toggle [(ngModel)]="homeStay[\'breakfast\']"></ion-toggle>\n  </ion-item>\n  <ion-item>\n    <ion-label floating>Description</ion-label>\n    <ion-textarea [(ngModel)]="homeStay[\'description\']" rows="4"></ion-textarea>\n  </ion-item>\n  <button [disabled]="!homeStay[\'picture\']" ion-button color="primary" full (tap)="submitHomeStay()">Submit</button>\n</ion-content>\n'/*ion-inline-end:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/homestay-detail/homestay-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_util_util__["a" /* UtilProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_fire_storage__["a" /* AngularFireStorage */], __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__["a" /* AngularFirestore */]])
    ], HomestayDetailPage);
    return HomestayDetailPage;
}());

//# sourceMappingURL=homestay-detail.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectCountryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_util_util__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global_global_variable__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_controller__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_app_app__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { AppProvider } from '../../providers/app/app';







var SelectCountryComponent = /** @class */ (function () {
    function SelectCountryComponent(util, AppPro, navCtrl, zone, db, viewCtrl) {
        this.util = util;
        this.AppPro = AppPro;
        this.navCtrl = navCtrl;
        this.zone = zone;
        this.db = db;
        this.viewCtrl = viewCtrl;
        this.country = '';
        this.user = __WEBPACK_IMPORTED_MODULE_4__global_global_variable__["a" /* GlobalVariables */].user;
        this.countryList = [];
        this.itemsCollection = this.db.collection('users');
        this.getCountryList();
    }
    SelectCountryComponent.prototype.onItemSelected = function (ev) {
        this.country = ev;
    };
    SelectCountryComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SelectCountryComponent.prototype.getCountryList = function () {
        var _this = this;
        this.util.presentLoading();
        this.AppPro.getContryList().subscribe(function (data) {
            _this.countryList = data;
            _this.util.stopLoading();
        });
    };
    SelectCountryComponent.prototype.save = function () {
        var _this = this;
        if (!this.country) {
            this.util.showAlert('Notice', 'Please select country first');
        }
        else {
            this.user['country'] = this.country;
            __WEBPACK_IMPORTED_MODULE_4__global_global_variable__["a" /* GlobalVariables */].user['country'] = this.country;
            this.util.presentLoading();
            this.itemsCollection.doc(this.user['base64']).update(this.user).then(function () {
                _this.util.stopLoading();
                _this.viewCtrl.dismiss().then(function () {
                    _this.zone.run(function () {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */]);
                    });
                });
            });
        }
    };
    SelectCountryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'select-country',template:/*ion-inline-start:"/Users/pipo/Documents/facetrip22072019/project01072019/src/components/select-country/select-country.html"*/'<!--\n  Generated template for the EditProfilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-buttons left>\n      <button ion-button clear (tap)="dismiss()">\n        Cancel\n      </button>\n    </ion-buttons>\n    <ion-title text-center>Select Country</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="login-wrap">\n    <h1>Select Your Country</h1>\n\n    <ion-select  [(ngModel)]="country" (ngModelChange)="onItemSelected($event)" placeholder="choose country">\n      <ion-option [value]="country[\'name\']" *ngFor="let item of countryList">{{item[\'name\']}}</ion-option>\n    </ion-select>\n    <button [disabled]="!country" round full color="primary" ion-button icon-left (tap)="save()">\n      Submit\n    </button>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/pipo/Documents/facetrip22072019/project01072019/src/components/select-country/select-country.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_util_util__["a" /* UtilProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_app_app__["a" /* AppProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_controller__["a" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], SelectCountryComponent);
    return SelectCountryComponent;
}());

//# sourceMappingURL=select-country.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_global_variable__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_app_app__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_util_util__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_platform_platform__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chats_chats__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__local_detail_local_detail__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__popup_popup__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__login_login__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common_http__ = __webpack_require__(132);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { AboutPage } from '../about/about';








var HomePage = /** @class */ (function () {
    function HomePage(app, alertCtrl, storage, navCtrl, 
        // private events: Events,
        appProvider, util, platform, modalCtrl, http) {
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.appProvider = appProvider;
        this.util = util;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.country = '';
        this.language = '';
        this.user = __WEBPACK_IMPORTED_MODULE_2__global_global_variable__["a" /* GlobalVariables */].user;
        this.localList = [];
        this.countryCount = 0;
        this.searchCountry = '';
        this.loadCountryJSON();
        this.filtCountry = [];
        this.filtCity = [];
        this.checkClick = true;
        this.checkClickLang = true;
    }
    HomePage.prototype.ionViewWillEnter = function () {
        this.searchLocal();
    };
    HomePage.prototype.filter = function () {
        var _this = this;
        if (this.searchCountry.length >= 3) {
            this.checkClick = false;
            this.filtCountry = this.itemsOnlyCountry.filter(function (item) { return item.country.toLowerCase().indexOf(_this.searchCountry.toLowerCase()) > -1; }).map(function (i) { return i; });
            this.filtCity = this.itemsCountry.filter(function (item) { return (item.city || '').toLowerCase().indexOf(_this.searchCountry.toLowerCase()) > -1; });
        }
        else {
            this.filtCountry = [];
            this.filtCity = [];
            this.checkClick = true;
        }
    };
    HomePage.prototype.filterLang = function () {
        var _this = this;
        if (this.language.length >= 2) {
            this.checkClickLang = false;
            this.filtLang = this.itemsLang.filter(function (item) { return item.lang_name.toLowerCase().indexOf(_this.language.toLowerCase()) > -1; });
        }
        else {
            this.filtLang = [];
            this.checkClickLang = true;
        }
    };
    HomePage.prototype.itemSelect = function (select) {
        this.checkClick = true;
        this.searchCountry = select.country;
        this.searchLocal();
    };
    HomePage.prototype.itemSelectLang = function (select) {
        this.checkClickLang = true;
        this.language = select.lang_name;
        this.searchLocal();
    };
    HomePage.prototype.loadCountryJSON = function () {
        var _this = this;
        this.http
            .get('assets/onlycountry.json')
            .subscribe(function (data) {
            _this.itemsOnlyCountry = data;
        });
        this.http
            .get('assets/country.json')
            .subscribe(function (data) {
            _this.itemsCountry = data;
        });
        this.http
            .get('assets/lang_list.json')
            .subscribe(function (data) {
            _this.itemsLang = data;
        });
    };
    HomePage.prototype.searchLocal = function () {
        var _this = this;
        try {
            this.util.presentLoading();
            this.countryCount = 0;
            this.appProvider.searchLocal(this.searchCountry, this.language).then(function (res) {
                _this.localList = res;
                // var filter = this.localList.filter(item => {
                //   return item['country'].toLowerCase().indexOf('vietnam') >= 0;
                // })
                // this.countryCount = filter.length;
                _this.util.stopLoading();
            }).catch(function (er) {
            });
        }
        catch (error) {
        }
    };
    HomePage.prototype.onSearchClearCountry = function () {
        var _this = this;
        this.country = '';
        this.util.presentLoading();
        this.appProvider.searchLocal(this.country, this.language).then(function (res) {
            _this.localList = res;
            _this.util.stopLoading();
        });
    };
    HomePage.prototype.onSearchClearLanguage = function () {
        var _this = this;
        this.language = '';
        this.util.presentLoading();
        this.appProvider.searchLocal(this.country, this.language).then(function (res) {
            _this.localList = res;
            _this.util.stopLoading();
        });
    };
    HomePage.prototype.viewDetail = function (user) {
        __WEBPACK_IMPORTED_MODULE_2__global_global_variable__["a" /* GlobalVariables */].selectedUser = user;
        // this.events.publish('tab_changed_1');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__local_detail_local_detail__["a" /* LocalDetailPage */], { user: user, myUser: this.user });
    };
    HomePage.prototype.openBrowser = function (fb_id) {
        if (this.platform.is('cordova')) {
            cordova.InAppBrowser.open('https://fb.com/' + fb_id, '_blank', 'location=yes');
        }
    };
    HomePage.prototype.askLocals = function () {
        var _this = this;
        var selectedUser = this.localList.filter(function (item) { return item['checked'] == true; });
        var listCheck = [];
        selectedUser.map(function (item) {
            listCheck.push(item);
        });
        this.storage.get('checkUser').then(function (val) {
            if (val == true) {
                if (listCheck.length > 0) {
                    var modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__popup_popup__["a" /* PopupPage */], { device: listCheck, user: _this.user });
                    modal.present();
                    modal.onDidDismiss(function () {
                        _this.localList.filter(function (item) { return item['checked'] = false; });
                    });
                }
            }
            else {
                _this.showConfirm();
            }
        });
    };
    HomePage.prototype.goToChat = function (user) {
        __WEBPACK_IMPORTED_MODULE_2__global_global_variable__["a" /* GlobalVariables */].selectedUser = user;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__chats_chats__["a" /* ChatsPage */], { receiver: user, user: this.user });
    };
    HomePage.prototype.showConfirm = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Login',
            message: 'Please login to continue !!!',
            buttons: [
                {
                    text: 'Disagree',
                    handler: function () {
                    }
                },
                {
                    text: 'Agree',
                    handler: function () {
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_10__login_login__["a" /* LoginPage */]);
                    }
                }
            ]
        });
        confirm.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="color-header">\n    <ion-title>\n      FACE TRIP\n    </ion-title>\n  </ion-navbar>\n  <div class="searchbox">\n    <ion-searchbar [(ngModel)]="searchCountry" (ionClear)="onSearchClearCountry()" (search)="searchLocal()"\n      [placeholder]="\'Vietnam\'+\'(\'+countryCount+\')\'" mode="ios" (ionInput)="filter()"></ion-searchbar>\n    <ion-searchbar [(ngModel)]="language" (ionClear)="onSearchClearLanguage()" (search)="searchLocal()"\n      placeholder="Languages" mode="ios" (ionInput)="filterLang()"></ion-searchbar>\n    <button ion-button clear icon-only color="light" (tap)="searchLocal()">\n      <ion-icon name="md-search"></ion-icon>\n    </button>\n  </div>\n\n  <div class="search-css" *ngIf="searchCountry != \'\' && checkClick == false">\n    <ion-list>\n      <div *ngFor=" let item of filtCountry">\n        <button ion-item *ngIf="filtCountry.length != 0" (click)="itemSelect(item)">\n          <div> {{item.country}}</div>\n          <!-- <div *ngIf="item.city === \'\'"> {{item.country}}</div> -->\n          <!-- <div *ngIf="item.city != \'\'"> {{item.country}}, {{item.city}}</div> -->\n          <!-- <div *ngIf="item.city != \'\'"> {{item.city}} [{{item.country}}] </div> -->\n        </button>\n      </div>\n      <div *ngFor=" let item of filtCity">\n        <button ion-item (click)="itemSelect(item)">\n          {{item.city}} [{{item.country}}]\n        </button>\n      </div>\n    </ion-list>\n  </div>\n\n  <div class="search-css" *ngIf="language != \'\' && checkClickLang == false">\n    <ion-list>\n      <div *ngFor=" let item of filtLang">\n        <button ion-item *ngIf="filtLang.length != 0" (click)="itemSelectLang(item)">\n          {{item.lang_name}}\n        </button>\n      </div>\n    </ion-list>\n  </div>\n\n</ion-header>\n<ion-content>\n\n\n\n  <button ion-button icon-right (tap)="askLocals()" color="danger">\n    Ask Locals\n    <ion-icon name="md-chatboxes"></ion-icon>\n  </button>\n\n  <div *ngFor="let users of localList">\n    <ion-card\n      *ngIf="users[\'country\'] && (users[\'language1\'] || users[\'language2\'] || users[\'language3\'] || users[\'language4\']) ">\n      <ion-card-content>\n        <ion-grid>\n          <ion-row>\n            <ion-col col-3 text-center>\n              <ion-checkbox [(ngModel)]="users[\'checked\']"></ion-checkbox>\n              <img [src]="users[\'picture\']+\'?type=normal\'" alt="" (tap)="viewDetail(users)">\n            </ion-col>\n\n            <ion-col col-6 (tap)="viewDetail(users)">\n              <ion-grid>\n                <ion-row align-items-start>\n                  <ion-col col-auto>\n                    <b>{{users[\'name\']}}</b>\n                  </ion-col>\n                  <ion-col *ngIf="users[\'guide_fee\'] > 0; else elseguide" col-auto>\n                    <span>(GUIDE: ${{users[\'guide_fee\']}})</span></ion-col>\n                  <ng-template #elseguide>\n                    <ion-col col-auto><span>(GUIDE: Free)</span></ion-col>\n                  </ng-template>\n                </ion-row>\n                <ion-row align-items-center>\n                  <ion-col *ngIf="users[\'city\']; else elsecity" col-auto>\n                    <span class="label">{{users[\'city\']}}, {{users[\'country\']}}</span></ion-col>\n                  <ng-template #elsecity>\n                    <ion-col col-auto><span class="label">{{users[\'country\']}}</span></ion-col>\n                  </ng-template>\n                </ion-row>\n                <ion-row align-items-end>\n                  <ion-col col-auto>\n                    <span class="langs">{{users[\'language1\']}}</span>\n                  </ion-col>\n                  <ion-col *ngIf="users[\'language2\']" col-auto>\n                    <span class="langs">/ {{users[\'language2\']}}</span>\n                  </ion-col>\n                  <ion-col *ngIf="users[\'language3\']" col-auto>\n                    <span class="langs">/ {{users[\'language3\']}}</span>\n                  </ion-col>\n                  <ion-col *ngIf="users[\'language4\'] " col-auto>\n                    <span class="langs">/ {{users[\'language4\']}}</span>\n                  </ion-col>\n                </ion-row>\n              </ion-grid>\n\n            </ion-col>\n            <ion-col *ngIf="users[\'homestay\']" col-1 text-center>\n              <ion-icon  (tap)="viewDetail(users)" color="color-header" name="ios-home" class="ios-home"></ion-icon>\n            </ion-col>\n            <ion-col (tap)="viewDetail(users)" *ngIf="users[\'homestay\']" col-2>\n              <ion-grid>\n                <ion-row align-items-start>\n                  <ion-col *ngIf="users[\'homestay\'][\'price\'] > 0; else elseprice">\n                    <p>${{users[\'homestay\'][\'price\']}}/DAY</p>\n                  </ion-col>\n                  <ng-template #elseprice>\n                    <ion-col>\n                      <P>FREE</P>\n                    </ion-col>\n                  </ng-template>\n                </ion-row>\n                <ion-row align-items-center>\n                  <ion-col *ngIf="users[\'homestay\'][\'wifi\']">\n                    <p>Wifi</p>\n                  </ion-col>\n                </ion-row>\n                <ion-row align-items-end>\n                  <ion-col *ngIf="users[\'homestay\'][\'breakfast\']">\n                    <p>Breakfast</p>\n                  </ion-col>\n                </ion-row>\n              </ion-grid>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n  </div>\n\n  <!-- <div *ngFor="let users of localList"  > \n    <ion-card *ngIf="users[\'country\'] && (users[\'language1\'] || users[\'language2\'] || users[\'language3\'] || users[\'language4\']) " >\n        <ion-card-content>\n          <ion-grid>\n            <ion-row>\n              <ion-col col-3 text-center>\n                <ion-checkbox [(ngModel)]="users[\'checked\']"></ion-checkbox>\n                <img [src]="users[\'picture\']+\'?type=normal\'" alt="" (tap)="viewDetail(users)">\n              </ion-col>\n              <ion-col col-9 (tap)="viewDetail(users)">\n                <ion-grid>\n                  <ion-row>\n                    <ion-col col-4>\n                      <b>{{users[\'name\']}}</b>\n                    </ion-col>\n                    <ion-col col-4><span>{{users[\'city\']}}, {{users[\'country\']}}</span></ion-col>\n                    <ion-col col-2 text-center>\n                      <ion-icon name="ios-home"></ion-icon>\n                    </ion-col>\n                    <ion-col col-2>\n                      {{users[\'guide_fee\']? users[\'guide_fee\'] : \'Free\'}}\n                    </ion-col>\n                  </ion-row>\n                  <ion-row>\n                    <ion-col col-8>\n                      <span class="langs">{{users[\'language1\']}}</span>\n                      <span class="langs">{{users[\'language2\']}}</span>\n                      <span class="langs">{{users[\'language3\']}}</span>\n                      <span class="langs">{{users[\'language4\']}}</span>\n                    </ion-col>\n                    <ion-col col-2 text-center>$10</ion-col>\n                    <ion-col col-2></ion-col>\n                  </ion-row>\n                </ion-grid>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-card-content>\n    </ion-card>\n  </div> -->\n\n\n</ion-content>'/*ion-inline-end:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_app_app__["a" /* AppProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_util_util__["a" /* UtilProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular_platform_platform__["a" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_11__angular_common_http__["a" /* HttpClient */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contact_contact__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_global_variable__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__edit_profile_edit_profile__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_fire_firestore__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_navigation_nav_params__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__homestay_view_homestay_view__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_app_app__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__login_login__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__tabs_tabs__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_toPromise__ = __webpack_require__(631);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_firebase_app__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { HomestayDetailPage } from '../homestay-detail/homestay-detail';



//import { ChatsPage } from '../chats/chats';

//import { UtilProvider } from '../../providers/util/util';





var LocalDetailPage = /** @class */ (function () {
    function LocalDetailPage(app, alertCtrl, storage, navCtrl, platform, navParams, db, events, 
        //private util: UtilProvider,
        appProvider, modalCtrl) {
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.navParams = navParams;
        this.db = db;
        this.events = events;
        this.appProvider = appProvider;
        this.modalCtrl = modalCtrl;
        this.homestayList = [];
        this.user = __WEBPACK_IMPORTED_MODULE_3__global_global_variable__["a" /* GlobalVariables */].selectedUser;
        this.localList = [];
        this.reviews = [];
        this.comment = '';
        this.pictures = [];
        this.ratingCheck = 0;
        this.countStar = 0;
        this.oneStar = 0;
        this.twoStar = 0;
        this.threeStar = 0;
        this.fourStar = 0;
        this.fiveStar = 0;
        this.loadRating();
        this.myUser = this.navParams.get('myUser');
        // if (this.navParams.get('user')) {
        //   this.user = this.navParams.get('user');
        //   GlobalVariables.selectedUser = this.user;
        // }
        // this.user = GlobalVariables.selectedUser;
        if (!this.user['pictures']) {
            this.user['pictures'] = '';
        }
        else {
            this.pictures = this.user['pictures'].split('|');
        }
        this.itemsCollection = this.db.collection('users');
        // this.itemsCollection.doc(this.user['base64']).collection("items").snapshotChanges().subscribe(() => {
        //   this.getHomeStayList();
        // })
    }
    LocalDetailPage.prototype.ionViewDidEnter = function () {
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
    };
    LocalDetailPage.prototype.editProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__edit_profile_edit_profile__["a" /* EditProfilePage */], { user: this.user });
    };
    LocalDetailPage.prototype.viewDetail = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__homestay_view_homestay_view__["a" /* HomestayViewPage */], { homestay: item });
    };
    LocalDetailPage.prototype.getHomeStayList = function () {
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
    };
    LocalDetailPage.prototype.goToChat = function () {
        var _this = this;
        this.storage.get('checkUser').then(function (val) {
            if (val == true) {
                __WEBPACK_IMPORTED_MODULE_3__global_global_variable__["a" /* GlobalVariables */].selectedUser = _this.user;
                _this.events.publish('tab_changed_2');
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__contact_contact__["a" /* ContactPage */], { receiver: _this.user, user: __WEBPACK_IMPORTED_MODULE_3__global_global_variable__["a" /* GlobalVariables */].user });
                // this.app.getRootNav().push(ContactPage, { receiver: this.user, user: GlobalVariables.user });
            }
            else {
                _this.showConfirm();
            }
        });
        console.log(this.user);
    };
    LocalDetailPage.prototype.getPictures = function (strs) {
        return strs.split('|');
    };
    LocalDetailPage.prototype.back = function () {
        this.events.publish('tab_changed_0');
    };
    LocalDetailPage.prototype.openBrowser = function (fb_id) {
        var _this = this;
        this.storage.get('checkUser').then(function (val) {
            if (val == true) {
                if (_this.platform.is('cordova')) {
                    cordova.InAppBrowser.open('https://fb.com/' + fb_id, '_blank', 'location=yes');
                }
            }
            else {
                _this.showConfirm();
            }
        });
    };
    LocalDetailPage.prototype.getHomestayReviews = function () {
        var _this = this;
        this.appProvider.getHomestayReviews(this.homestayList[0]).then(function (data) {
            _this.reviews = data;
        });
    };
    LocalDetailPage.prototype.addReview = function () {
        var _this = this;
        this.storage.get('checkUser').then(function (val) {
            if (val == true) {
                if (_this.ratingCheck > 0) {
                    var currentTimestamp = __WEBPACK_IMPORTED_MODULE_12_firebase_app__["firestore"].Timestamp.fromDate(new Date());
                    var reviewRef = _this.itemsCollection.doc(_this.user['base64']).collection("rating");
                    reviewRef.add({
                        star: _this.ratingCheck,
                        name: _this.myUser['name'],
                        time: currentTimestamp.toDate().toLocaleDateString() + ' ' + currentTimestamp.toDate().toLocaleTimeString(),
                        comment: _this.comment
                    }).then(function () {
                        _this.ratingCheck = 0;
                        _this.comment = '';
                        _this.loadRating();
                    });
                }
            }
            else {
                _this.showConfirm();
            }
        });
    };
    LocalDetailPage.prototype.clickStar = function (number) {
        this.ratingCheck = number;
    };
    LocalDetailPage.prototype.loadRating = function () {
        var _this = this;
        var list = [];
        var ratingRef = this.db.collection("users").doc(this.user['base64']).collection("rating");
        ratingRef.get().toPromise().then(function (doc) {
            doc.forEach(function (doc) {
                list.push(doc.data());
            });
        }).then(function () {
            _this.listComment = list;
        });
    };
    LocalDetailPage.prototype.showConfirm = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Login',
            message: 'Please login to continue !!!',
            buttons: [
                {
                    text: 'Disagree',
                    handler: function () {
                        // this.navCtrl.push(HomePage);
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_10__tabs_tabs__["a" /* TabsPage */]);
                    }
                },
                {
                    text: 'Agree',
                    handler: function () {
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
                    }
                }
            ]
        });
        confirm.present();
    };
    LocalDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-local-detail',template:/*ion-inline-start:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/local-detail/local-detail.html"*/'<ion-header>\n  <ion-navbar color="color-header">\n    <!-- <ion-buttons left>\n        <button (tap)="back()" ion-button icon-only clear>\n          <ion-icon name="md-arrow-back"></ion-icon>\n        </button>\n      </ion-buttons> -->\n    <ion-title>\n      FACE TRIP\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card>\n    <ion-card-content>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-8>\n            <ion-grid>\n              <ion-row>\n                <ion-col>\n                  <b>{{user[\'name\']}}</b>\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col *ngIf="user[\'city\']; else elsecity" col-auto>\n                  <span class="label">{{user[\'city\']}}, {{user[\'country\']}}</span>\n                </ion-col>\n                <ng-template #elsecity>\n                  <ion-col col-auto><span class="label">{{user[\'country\']}}</span>\n                  </ion-col>\n                </ng-template>\n              </ion-row>\n              <ion-row align-items-end>\n                <ion-col col-auto>\n                  <span class="label">{{user[\'language1\']}}</span>\n                </ion-col>\n                <ion-col *ngIf="user[\'language2\']" col-auto>\n                  <span class="label">, {{user[\'language2\']}}</span>\n                </ion-col>\n                <ion-col *ngIf="user[\'language3\']" col-auto>\n                  <span class="label">, {{user[\'language3\']}}</span>\n                </ion-col>\n                <ion-col *ngIf="user[\'language4\'] " col-auto>\n                  <span class="label">, {{user[\'language4\']}}</span>\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col *ngIf="user[\'guide_fee\'] > 0; else elseguide" col-auto>\n                  <span class="label">GUIDE: ${{user[\'guide_fee\']}}</span>\n                </ion-col>\n                <ng-template #elseguide>\n                  <ion-col col-auto><span class="label">GUIDE: Free</span>\n                  </ion-col>\n                </ng-template>\n              </ion-row>\n              <ion-row>\n                <ion-col>\n                  <ion-col *ngIf="user[\'meet_at_airport\'] === \'true\'; else elseairport" col-auto>\n                    <span class="label">Meet at the Airport: POSSIBLE</span></ion-col>\n                  <ng-template #elseairport>\n                    <ion-col col-auto>\n                      <span class="label">Meet at the Airport: IMPOSSIBLE</span>\n                    </ion-col>\n                  </ng-template>\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col col-auto>\n                  <span class="label">INTEREST: {{user[\'interest\']}}</span>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col text-right style="justify-content: flex-end">\n            <button (tap)="openBrowser(user[\'fb_id\'])" color="facebook" ion-button icon-only clear>\n              <ion-icon name="logo-facebook"></ion-icon>\n            </button>\n            <button (tap)="goToChat()" color="_gray" ion-button icon-only\n              clear>\n              <ion-icon name="md-chatboxes"></ion-icon>\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n      <img *ngIf="!user[\'pictures\']" [src]="user[\'picture\']+\'?type=normal\'" alt="">\n      <ion-slides *ngIf="user[\'pictures\']" pager="true">\n        <ng-container *ngFor="let pic of pictures">\n          <ion-slide *ngIf="pic.length>0">\n            <img [src]="pic" alt="">\n          </ion-slide>\n        </ng-container>\n      </ion-slides>\n      <ion-textarea rows="3" [(ngModel)]="user[\'introduction\']" disabled></ion-textarea>\n    </ion-card-content>\n  </ion-card>\n  <ion-list>\n    <ion-item-divider>\n      Homestay\n    </ion-item-divider>\n  </ion-list>\n  <div class="homestay" *ngIf="user[\'homestay\']">\n    <div class="uploads">\n      <img *ngIf="!user[\'homestay\'][\'pictures\']" [src]="user[\'homestay\'][\'picture\']" alt="">\n      <ion-slides *ngIf="user[\'homestay\'][\'pictures\']" pager="true">\n        <ng-container *ngFor="let pic of getPictures(user[\'homestay\'][\'pictures\'])">\n          <ion-slide>\n            <img [src]="pic" alt="">\n          </ion-slide>\n        </ng-container>\n      </ion-slides>\n    </div>\n    <ion-grid class="homestay-desc">\n      <ion-row>\n        <ion-col>Locaiton</ion-col>\n        <ion-col>{{user[\'homestay\'][\'location\']}}</ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>Daily Price</ion-col>\n        <ion-col>{{user[\'homestay\'][\'price\']|currency:\'USD\'}}</ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>Wifi</ion-col>\n        <ion-col>{{user[\'homestay\'][\'wifi\']? \'Yes\': \'No\'}}</ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>Breakfast</ion-col>\n        <ion-col>{{user[\'homestay\'][\'breakfast\'] ? \'Yes\': \'No\'}}</ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <p>{{user[\'homestay\'][\'description\']}}</p>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <ion-item-divider>Reviews</ion-item-divider>\n\n    <ion-list *ngIf="listComment">\n      <ion-item *ngFor="let review of listComment">\n        <div class="star-show">\n          <h2>{{review.name}}</h2>\n          <button ion-button icon-only clear disabled>\n            <ion-icon name="ios-star-outline" *ngIf="review.star==0"></ion-icon>\n            <ion-icon name="ios-star" *ngIf="review.star>0"></ion-icon>\n          </button>\n          <button ion-button icon-only clear disabled>\n            <ion-icon name="ios-star-outline" *ngIf="review.star<=1"></ion-icon>\n            <ion-icon name="ios-star" *ngIf="review.star>1"></ion-icon>\n          </button>\n          <button ion-button icon-only clear disabled>\n            <ion-icon name="ios-star-outline" *ngIf="review.star<=2"></ion-icon>\n            <ion-icon name="ios-star" *ngIf="review.star>2"></ion-icon>\n          </button>\n          <button ion-button icon-only clear disabled>\n            <ion-icon name="ios-star-outline" *ngIf="review.star<=3"></ion-icon>\n            <ion-icon name="ios-star" *ngIf="review.star>3"></ion-icon>\n          </button>\n          <button ion-button icon-only clear disabled>\n            <ion-icon name="ios-star-outline" *ngIf="review.star<=4"></ion-icon>\n            <ion-icon name="ios-star" *ngIf="review.star>4"></ion-icon>\n          </button>\n        </div>\n        <p>{{review.comment}}</p>\n        <p>{{review.time}}</p>\n      </ion-item>\n    </ion-list>\n\n\n    <p>Write your Review</p>\n    <div class="star">\n      <button ion-button icon-only clear (click)="clickStar(1)">\n        <ion-icon name="ios-star-outline" *ngIf="ratingCheck==0"></ion-icon>\n        <ion-icon name="ios-star" *ngIf="ratingCheck>0"></ion-icon>\n      </button>\n      <button ion-button icon-only clear (click)="clickStar(2)">\n        <ion-icon name="ios-star-outline" *ngIf="ratingCheck<=1"></ion-icon>\n        <ion-icon name="ios-star" *ngIf="ratingCheck>1"></ion-icon>\n      </button>\n      <button ion-button icon-only clear (click)="clickStar(3)">\n        <ion-icon name="ios-star-outline" *ngIf="ratingCheck<=2"></ion-icon>\n        <ion-icon name="ios-star" *ngIf="ratingCheck>2"></ion-icon>\n      </button>\n      <button ion-button icon-only clear (click)="clickStar(4)">\n        <ion-icon name="ios-star-outline" *ngIf="ratingCheck<=3"></ion-icon>\n        <ion-icon name="ios-star" *ngIf="ratingCheck>3"></ion-icon>\n      </button>\n      <button ion-button icon-only clear (click)="clickStar(5)">\n        <ion-icon name="ios-star-outline" *ngIf="ratingCheck<=4"></ion-icon>\n        <ion-icon name="ios-star" *ngIf="ratingCheck>4"></ion-icon>\n      </button>\n    </div>\n    <ion-textarea placeholder="Write your comment for this homestay" [(ngModel)]="comment" rows="4"></ion-textarea>\n    <button (tap)="addReview()" ion-button small>Submit</button>\n    <br>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/local-detail/local-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular_navigation_nav_params__["a" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__angular_fire_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_8__providers_app_app__["a" /* AppProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* ModalController */]])
    ], LocalDetailPage);
    return LocalDetailPage;
}());

//# sourceMappingURL=local-detail.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomestayViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_storage__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global_global_variable__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_util_util__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_app_app__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the HomestayViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HomestayViewPage = /** @class */ (function () {
    function HomestayViewPage(navCtrl, navParams, util, events, appProvider, storage, db) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.util = util;
        this.events = events;
        this.appProvider = appProvider;
        this.storage = storage;
        this.db = db;
        this.rating = 4;
        this.user = __WEBPACK_IMPORTED_MODULE_4__global_global_variable__["a" /* GlobalVariables */].user;
        this.homeStay = {};
        this.reviews = [];
        this.comment = '';
        this.pictures = [];
        events.subscribe('star-rating:changed', function (starRating) {
            console.log(starRating);
            _this.rating = starRating;
        });
        this.homeStay = Object.assign({}, this.navParams.get('homestay'));
        if (this.homeStay['pictures']) {
            this.pictures = this.homeStay['pictures'].split('|');
        }
    }
    HomestayViewPage.prototype.uploadFile = function (event) {
        var _this = this;
        var file = event.target.files[0];
        var filePath = 'uploads/' + file['name'];
        var ref = this.storage.ref(filePath);
        var task = ref.put(file);
        task.then(function (res) {
            _this.storage.ref(filePath).getDownloadURL().subscribe(function (data) {
                if (data) {
                    _this.homeStay['picture'] = data;
                }
            });
        });
    };
    HomestayViewPage.prototype.ionViewDidLoad = function () {
        this.itemsCollection = this.db.collection('homestays');
        console.log('ionViewDidLoad HomestayDetailPage');
        this.getHomestayReviews();
    };
    HomestayViewPage.prototype.submitHomeStay = function () {
        var _this = this;
        this.util.presentLoading();
        var userRef = this.itemsCollection.doc(this.user['base64']);
        if (this.homeStay['id']) {
            userRef.collection("items").doc(this.homeStay['id']).update(this.homeStay).then(function (data) {
                console.log(data);
                _this.util.stopLoading();
            }, function (err) { _this.util.stopLoading(); });
        }
        else {
            userRef.collection("items").add(this.homeStay).then(function (data) {
                console.log(data);
                _this.util.stopLoading();
            }, function (err) { _this.util.stopLoading(); });
        }
    };
    HomestayViewPage.prototype.getHomestayReviews = function () {
        var _this = this;
        this.appProvider.getHomestayReviews(this.homeStay).then(function (data) {
            _this.reviews = data;
        });
    };
    HomestayViewPage.prototype.addReview = function () {
        var _this = this;
        if (this.comment != '') {
            this.util.presentLoading('Submitting review...');
            this.appProvider.addReview(this.user, this.homeStay, this.comment).then(function () {
                _this.util.stopLoading();
                _this.getHomestayReviews();
            });
        }
        else {
            this.util.showAlert('Notice', 'Please input your review first!');
        }
    };
    HomestayViewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-homestay-view',template:/*ion-inline-start:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/homestay-view/homestay-view.html"*/'<!--\n  Generated template for the HomestayDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Detail</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="uploads">\n    <img *ngIf="!homeStay[\'pictures\']" [src]="homeStay[\'picture\']" alt="">\n    <ion-slides *ngIf="homeStay[\'pictures\']">\n      <ng-container *ngFor="let pic of pictures">\n        <ion-slide>\n          <img [src]="pic" alt="">\n        </ion-slide>\n      </ng-container>\n\n    </ion-slides>\n  </div>\n  <ion-grid class="homestay-desc">\n    <ion-row>\n      <ion-col>Locaiton</ion-col>\n      <ion-col>{{homeStay[\'location\']}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>Daily Price</ion-col>\n      <ion-col>{{homeStay[\'price\']|currency:\'USD\'}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>Wifi</ion-col>\n      <ion-col>{{homeStay[\'wifi\']? \'Yes\': \'No\'}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>Breakfast</ion-col>\n      <ion-col>{{homeStay[\'breakfast\'] ? \'Yes\': \'No\'}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <p>{{homeStay[\'description\']}}</p>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-item lines="none">\n            <ionic3-star-rating \n              activeIcon = "ios-star"\n              defaultIcon = "ios-star-outline"\n              activeColor = "#488aff" \n              defaultColor = "red"\n              readonly="false"\n              [rating]="rating">\n            </ionic3-star-rating>\n               Selected rating: {{rating}}\n        </ion-item>\n\n    </ion-row>\n  </ion-grid>\n  <ion-item-divider>Reviews</ion-item-divider>\n  <ion-list>\n    <ion-item *ngFor="let review of reviews;">\n      <ion-avatar item-start>\n        <img [src]="review[\'picture\']">\n      </ion-avatar>\n      <h2>{{review[\'name\']}}</h2>\n      <p>{{review[\'review\']}}</p>\n    </ion-item>\n  </ion-list>\n  <p>Write your Review</p>\n  <ion-textarea placeholder="Write your comment for this homestay" [(ngModel)]="comment" rows="4"></ion-textarea>\n  <button (tap)="addReview()" ion-button small>Submit</button>\n  <br>\n</ion-content>\n'/*ion-inline-end:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/homestay-view/homestay-view.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_util_util__["a" /* UtilProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_6__providers_app_app__["a" /* AppProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_fire_storage__["a" /* AngularFireStorage */],
            __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__["a" /* AngularFirestore */]])
    ], HomestayViewPage);
    return HomestayViewPage;
}());

//# sourceMappingURL=homestay-view.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_app_app__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { GlobalVariables } from '../../global/global_variable';
//import { UtilProvider } from '../../providers/util/util';

var PopupPage = /** @class */ (function () {
    function PopupPage(navCtrl, navParams, viewCtrl, db, 
        // private util: UtilProvider,
        appProvider, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.db = db;
        this.appProvider = appProvider;
        this.toastCtrl = toastCtrl;
        this.message = '';
        this.receiver = {};
        this.myUser = {};
        this.msgList = [];
    }
    PopupPage.prototype.ionViewWillEnter = function () {
        this.listUser = this.navParams.get('device');
        this.myUser = this.navParams.get('user');
    };
    PopupPage.prototype.clickSend = function () {
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
    };
    PopupPage.prototype.clickClose = function () {
        this.viewCtrl.dismiss();
    };
    PopupPage.prototype.presentToast = function (data) {
        var toast = this.toastCtrl.create({
            message: data,
            duration: 3000,
            position: 'middle'
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], PopupPage.prototype, "content", void 0);
    PopupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-popup',template:/*ion-inline-start:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/popup/popup.html"*/'<ion-content>\n  <div class="conten">\n    <h4>Message</h4>\n    <!-- <h2>Message</h2> -->\n    <div *ngFor="let user of listUser; let i = index">\n      <h5 *ngIf="listUser.length == 1">To: {{user.name}}</h5>\n      <h5 *ngIf="i==0 && listUser.length > 1 ">To: {{user.name}} and {{listUser.length-1}} users</h5>\n    </div>\n    <div class="bt-popup">\n      <ion-textarea rows="2" [(ngModel)]="message" placeholder="Message"></ion-textarea>\n      <div class="send-close">\n        <button ion-button color="primary" (click)="clickSend()">SEND</button>\n        <button ion-button color="primary" (click)="clickClose()">CLOSE</button>\n      </div>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/popup/popup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__angular_fire_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_2__providers_app_app__["a" /* AppProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], PopupPage);
    return PopupPage;
}());

//# sourceMappingURL=popup.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_loading_loading_controller__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_modal_modal_controller__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UtilProvider = /** @class */ (function () {
    function UtilProvider(loadingCtrl, alertCtrl, toastCtrl, events, storage, modalCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
    }
    UtilProvider.prototype.showToast = function (message) {
        var _this = this;
        return new Promise(function (resolve) {
            var toast = _this.toastCtrl.create({
                message: message,
                duration: 3000,
                position: 'top'
            });
            toast.onDidDismiss(function () {
                console.log('Dismissed toast');
            });
            toast.present();
        });
    };
    /**
     * Show Loading
     *
     *
     * @memberOf HelpToolProvider
     */
    UtilProvider.prototype.presentLoading = function (content) {
        if (content === void 0) { content = 'Data loading...'; }
        this.loader = this.loadingCtrl.create({
            spinner: 'crescent',
            content: content
        });
        this.loader.present();
    };
    /**
     * Stop Show Loading
     *
     *
     * @memberOf HelpToolProvider
     */
    UtilProvider.prototype.stopLoading = function () {
        this.loader.dismiss();
    };
    UtilProvider.prototype.setLocal = function (key, value) {
        return this.storage.set(key, value);
    };
    UtilProvider.prototype.getLocal = function (key) {
        return this.storage.get(key);
    };
    UtilProvider.prototype.clearLocal = function () {
        return this.storage.clear();
    };
    /**
   * show modal
   * @param component
   * @param data
   */
    UtilProvider.prototype.showModal = function (component, data, cssClass) {
        var _this = this;
        if (cssClass === void 0) { cssClass = 'full'; }
        return new Promise(function (resolve) {
            var modal = null;
            var opts = {};
            if (cssClass) {
                opts['cssClass'] = cssClass;
            }
            modal = _this.modalCtrl.create(component, data, opts);
            modal.onDidDismiss(function (_data) {
                resolve(_data);
            });
            modal.present();
        });
    };
    UtilProvider.prototype.showAlert = function (title, subTitle) {
        this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['Close']
        }).present();
    };
    UtilProvider.prototype.confirm = function (title, subTitle) {
        var _this = this;
        return new Promise(function (resolve) {
            var alert = _this.alertCtrl.create({
                title: title,
                message: subTitle,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            resolve('no');
                        }
                    },
                    {
                        text: 'Remove',
                        handler: function () {
                            resolve('yes');
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    UtilProvider.prototype.showConfirm = function (title, subTitle) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.alertCtrl.create({
                title: title,
                subTitle: subTitle,
                inputs: [
                    {
                        name: 'amount',
                        placeholder: 'Amount that you have',
                        type: 'number'
                    },
                    {
                        name: 'invested',
                        placeholder: 'Total invested (optional)',
                        type: 'number'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function (data) {
                            resolve();
                        }
                    },
                    {
                        text: 'Add',
                        handler: function (data) {
                            resolve(data);
                        }
                    }
                ]
            }).present();
        });
    };
    UtilProvider.prototype.mapCMCToCPC = function (coinmarketcap, cryptocompare) {
        if (!coinmarketcap)
            return null;
        //Convert an object with keys into an array of objects
        cryptocompare = Object.keys(cryptocompare).map(function (i) { return cryptocompare[i]; });
        var ignoreSpaceRegex = /\s/g, nonAlphaNumericRegex = /\W+/g;
        var map = {}, symbol1, name1, symbol2, name2, reduced;
        //Loop through every item in coinmarketcap
        //Note that symbols such as BTM, KNC will be repeated multiple times
        //Get the symbol of the current coin on coinmarketcap
        symbol1 = coinmarketcap.symbol;
        name1 = coinmarketcap.name.trim().replace(ignoreSpaceRegex, "").toLowerCase();
        // if(coinmarketcap[i].rank < 700){
        //Loop through every item on cryptocompare
        for (var j = cryptocompare.length - 1; j >= 0; j--) {
            //Get the symbol of the current coin on cryptocompare
            symbol2 = cryptocompare[j].Symbol;
            reduced = symbol2.replace(nonAlphaNumericRegex, "");
            name2 = cryptocompare[j].CoinName.trim().replace(ignoreSpaceRegex, "").toLowerCase();
            if (reduced.indexOf(symbol1) >= 0 && name1 === name2) {
                map[symbol1] = symbol2;
            }
            if (symbol1.toLowerCase() == 'trx') {
                if (symbol2.toLowerCase() == 'trx') {
                    map[symbol1] = symbol2;
                }
            }
        }
        return map;
    };
    UtilProvider.prototype.ValidURL = function (str) {
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regexp = new RegExp(expression);
        return regexp.test(str);
    };
    UtilProvider.prototype.extractUrl = function (str) {
        return str.match(/(https?:\/\/[^ ]*)/)[0];
    };
    UtilProvider.prototype.removeSpecialChar = function (str) {
        return str.replace(/[^a-zA-Z0-9]/g, '_');
    };
    UtilProvider.prototype.scrollTo = function (element, to, duration) {
        var start = element.scrollTop, change = to - start, currentTime = 0, increment = 20;
        var easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1)
                return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        var animateScroll = function () {
            currentTime += increment;
            var val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    };
    UtilProvider.prototype.registerEvent = function (name, callback) {
        // this.events.unsubscribe(name);
        this.events.subscribe(name, callback);
    };
    UtilProvider.prototype.publishEvent = function (name, params) {
        this.events.publish(name, params);
    };
    UtilProvider.prototype.generateEmail = function () {
        var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
        var string = 'cust_';
        for (var ii = 0; ii < 8; ii++) {
            string += chars[Math.floor(Math.random() * chars.length)];
        }
        return (string + '@gmail.com');
    };
    UtilProvider.prototype.getChatId = function (id1, id2) {
        var chatId = '';
        if (id1 < id2) {
            chatId = id1 + id2;
        }
        else {
            chatId = id2 + id1;
        }
        return chatId;
    };
    UtilProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_alert_alert_controller__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_toast_toast_controller__["a" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_modal_modal_controller__["a" /* ModalController */]])
    ], UtilProvider);
    return UtilProvider;
}());

//# sourceMappingURL=util.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(486);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalVariables; });
var GlobalVariables = /** @class */ (function () {
    function GlobalVariables() {
    }
    GlobalVariables.user = {};
    GlobalVariables.homeStay = {
        breakfast: '',
        description: '',
        location: '',
        picture: '',
        pictures: '',
        price: '',
        wifi: ''
    };
    GlobalVariables.selectedUser = {};
    GlobalVariables.countries = [];
    return GlobalVariables;
}());

//# sourceMappingURL=global_variable.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_fire_firestore__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_filter_by_filter_by__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AppProvider = /** @class */ (function () {
    function AppProvider(http, db) {
        this.http = http;
        this.db = db;
        this.localCollections = this.db.collection('users');
        this.homestayCollections = this.db.collection('homestays');
        this.chatCollections = this.db.collection('chats');
        this.chatHistoryCollections = this.db.collection('chatHistory');
        this.reviewCollections = this.db.collection('reviews');
    }
    AppProvider.prototype.getResults = function (keyword) {
        return this.http.get("https://restcountries.eu/rest/v1/name/" + keyword).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["map"])(function (result) {
            return result.filter(function (item) { return item.name.toLowerCase().startsWith(keyword.toLowerCase()); }).map(function (i) { return i.name; });
        }));
    };
    AppProvider.prototype.getContryList = function () {
        return this.http.get('https://restcountries.eu/rest/v2/all');
    };
    AppProvider.prototype.searchLocal = function (country, language) {
        var _this = this;
        return new Promise(function (resolve) {
            var rs = [];
            var filterBy = new __WEBPACK_IMPORTED_MODULE_3__pipes_filter_by_filter_by__["a" /* FilterByPipe */]();
            _this.localCollections.get().subscribe(function (snap) {
                snap.forEach(function (doc) {
                    var docData = doc.data();
                    docData['country'] = docData['country'] || '';
                    docData['languages'] = docData['language1'] + "," + docData['language2'] + "," + docData['language3'] + "," + docData['language4'];
                    // if (docData['base64'] != GlobalVariables.user['base64']) {
                    rs.push(docData);
                    // }
                });
                var filter = filterBy.transform(rs, {
                    country: country,
                    languages: language
                });
                resolve(filter);
            }, function (err) {
            }, function () { return resolve(); });
        }).catch(function (err) {
        });
    };
    AppProvider.prototype.addReview = function (user, homestay, review) {
        return this.reviewCollections.doc(homestay['id']).collection('items').add({
            name: user['name'],
            picture: user['picture'],
            review: review
        });
    };
    AppProvider.prototype.getHomestayReviews = function (homestay) {
        var _this = this;
        return new Promise(function (resolve) {
            var rs = [];
            _this.reviewCollections.doc(homestay['id']).collection('items').get().subscribe(function (snap) {
                snap.forEach(function (doc) {
                    var docData = doc.data();
                    docData['id'] = doc.id;
                    rs.push(docData);
                });
                resolve(rs);
            }, function (err) { return resolve([]); });
        });
    };
    AppProvider.prototype.getChatList = function (id1, id2) {
        var _this = this;
        var chatId = '';
        if (id1 < id2) {
            chatId = id1 + id2;
        }
        else {
            chatId = id2 + id1;
        }
        return new Promise(function (resolve) {
            var rs = [];
            _this.chatCollections.doc(chatId).collection('items', function (ref) { return ref.orderBy('date'); }).get().subscribe(function (snap) {
                snap.forEach(function (doc) {
                    var docData = doc.data();
                    docData['id'] = doc.id;
                    rs.push(docData);
                });
                resolve(rs);
            }, function (err) { return resolve(rs); });
        });
    };
    AppProvider.prototype.addChageHistory = function (userId, partner) {
        return this.chatHistoryCollections.doc(userId['base64']).collection('items').doc(partner['base64']).set(partner);
    };
    AppProvider.prototype.getChatHistory = function (userID) {
        var _this = this;
        return new Promise(function (resolve) {
            var rs = [];
            _this.chatHistoryCollections.doc(userID).collection('items').get().subscribe(function (snap) {
                snap.forEach(function (doc) {
                    var docData = doc.data();
                    docData['id'] = doc.id;
                    rs.push(docData);
                });
                resolve(rs);
            }, function (err) { return resolve(); });
        });
    };
    AppProvider.prototype.submitChat = function (id1, id2, message) {
        var chatId = '';
        if (id1 < id2) {
            chatId = id1 + id2;
        }
        else {
            chatId = id2 + id1;
        }
        return this.chatCollections.doc(chatId).collection('chats').add({
            sender: id1,
            receiver: id2,
            message: message,
            date: new Date().getTime()
        });
    };
    AppProvider.prototype.getOnlineUsers = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var rs = [];
            _this.localCollections.get().subscribe(function (snap) {
                snap.forEach(function (doc) {
                    var docData = doc.data();
                    docData['id'] = doc.id;
                    if (docData['online'] == true) {
                        rs.push(docData);
                    }
                });
                resolve(rs);
            }, function (err) { return resolve(); });
        });
    };
    AppProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__angular_fire_firestore__["a" /* AngularFirestore */]])
    ], AppProvider);
    return AppProvider;
}());

//# sourceMappingURL=app.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_about_about__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_auth_service__ = __webpack_require__(633);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_util_util__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_common_http__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_fire__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_fire_auth__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_fire_firestore__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_edit_profile_edit_profile__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_app_app__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_homestay_detail_homestay_detail__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_fire_storage__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pipes_pipes_module__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_local_detail_local_detail__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_homestay_view_homestay_view__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_chats_chats__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_components_module__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_popup_popup__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ionic3_star_rating__ = __webpack_require__(651);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_facebook__ = __webpack_require__(365);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








//import { AutoCompleteModule } from 'ionic2-auto-complete';










//import { Observable } from 'rxjs';












var firebaseConfig = {
    apiKey: "AIzaSyBvEJmRrEhzkoirQaTTJEYLnVLVZZ6urHM",
    authDomain: "facetriper.firebaseio.com",
    databaseURL: "https://facetriper.firebaseio.com",
    projectId: "facetriper",
    storageBucket: "facetriper.appspot.com",
    messagingSenderId: "443594649686"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_edit_profile_edit_profile__["a" /* EditProfilePage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_homestay_detail_homestay_detail__["a" /* HomestayDetailPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_local_detail_local_detail__["a" /* LocalDetailPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_homestay_view_homestay_view__["a" /* HomestayViewPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_chats_chats__["a" /* ChatsPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_popup_popup__["a" /* PopupPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_28_ionic3_star_rating__["a" /* StarRatingModule */],
                __WEBPACK_IMPORTED_MODULE_14__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                    tabsHideOnSubPages: false,
                }, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["a" /* IonicStorageModule */].forRoot({
                    name: '_facetrip',
                    driverOrder: ['indexeddb', 'sqlite', 'websql']
                }),
                __WEBPACK_IMPORTED_MODULE_15__angular_fire__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_17__angular_fire_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_16__angular_fire_auth__["AngularFireAuthModule"],
                __WEBPACK_IMPORTED_MODULE_21__angular_fire_storage__["b" /* AngularFireStorageModule */],
                __WEBPACK_IMPORTED_MODULE_22__pipes_pipes_module__["a" /* PipesModule */],
                //AutoCompleteModule,
                __WEBPACK_IMPORTED_MODULE_26__components_components_module__["a" /* ComponentsModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_edit_profile_edit_profile__["a" /* EditProfilePage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_homestay_detail_homestay_detail__["a" /* HomestayDetailPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_local_detail_local_detail__["a" /* LocalDetailPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_homestay_view_homestay_view__["a" /* HomestayViewPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_chats_chats__["a" /* ChatsPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_popup_popup__["a" /* PopupPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__providers_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_12__providers_util_util__["a" /* UtilProvider */],
                __WEBPACK_IMPORTED_MODULE_19__providers_app_app__["a" /* AppProvider */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_facebook__["a" /* Facebook */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_app_app__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__global_global_variable__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_fire_firestore__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_util_util__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = /** @class */ (function () {
    function MyApp(storage, platform, statusBar, splashScreen, util, appProvider, db) {
        var _this = this;
        this.storage = storage;
        this.util = util;
        this.appProvider = appProvider;
        this.db = db;
        this.countryList = [];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            _this.getCountryList().then(function () { });
            _this.itemsCollections = _this.db.collection('users');
            _this.util.getLocal('user').then(function (user) {
                if (user) {
                    _this.itemsCollections.doc(btoa(user['email'])).get().subscribe(function (snap) {
                        splashScreen.hide();
                        if (snap.exists) {
                            __WEBPACK_IMPORTED_MODULE_6__global_global_variable__["a" /* GlobalVariables */].user = snap.data();
                            var usr = snap.data();
                            usr['online'] = true;
                            _this.itemsCollections.doc(__WEBPACK_IMPORTED_MODULE_6__global_global_variable__["a" /* GlobalVariables */].user['base64']).update(usr).then(function () {
                            });
                            storage.set('checkUser', true);
                            _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
                        }
                        else {
                            // this.rootPage = LoginPage;
                            storage.set('checkUser', false);
                            _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
                        }
                    });
                }
                else {
                    storage.set('checkUser', false);
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
                }
            });
        });
    }
    MyApp.prototype.getCountryList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.appProvider.getContryList().subscribe(function (data) {
                if (data) {
                    _this.countryList = data;
                    __WEBPACK_IMPORTED_MODULE_6__global_global_variable__["a" /* GlobalVariables */].countries = data;
                }
                resolve();
            }, function (err) { return resolve(); });
        });
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/pipo/Documents/facetrip22072019/project01072019/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/pipo/Documents/facetrip22072019/project01072019/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_8__providers_util_util__["a" /* UtilProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_app_app__["a" /* AppProvider */], __WEBPACK_IMPORTED_MODULE_7__angular_fire_firestore__["a" /* AngularFirestore */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = /** @class */ (function () {
    function TabsPage(events) {
        this.events = events;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* Tabs */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* Tabs */])
    ], TabsPage.prototype, "tabs", void 0);
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/tabs/tabs.html"*/'<ion-tabs color="xam" tabsLayout="icon-end" selectedIndex=\'0\'>\n  <ion-tab [root]="tab1Root" tabTitle="LOCALS" ></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="ME" ></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="CHAT" tabIcon="ios-chatbubbles-outline" class="tabs-icon-top tabs-positive"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 633:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_first__ = __webpack_require__(634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_first___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_first__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_service__ = __webpack_require__(640);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//import * as firebase from 'firebase/app';
var AuthService = /** @class */ (function (_super) {
    __extends(AuthService, _super);
    function AuthService(afAuth, http) {
        var _this = _super.call(this) || this;
        _this.afAuth = afAuth;
        _this.http = http;
        return _this;
    }
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["AngularFireAuth"],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], AuthService);
    return AuthService;
}(__WEBPACK_IMPORTED_MODULE_5__base_service__["a" /* BaseService */]));

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 640:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(370);

//import { Observable } from 'rxjs';
//import { AngularFireList, AngularFireObject } from 'angularfire2/database';
var extractError = function (error) {
    var errMsg;
    if (error instanceof __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Response */]) {
        var body = error.json() || '';
        var err = body.error || JSON.stringify(body);
        errMsg = error.status + " - " + (error.statusText || '') + " " + err;
    }
    else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return errMsg;
};
var BaseService = /** @class */ (function () {
    function BaseService() {
    }
    return BaseService;
}());

//# sourceMappingURL=base.service.js.map

/***/ }),

/***/ 641:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__filter_filter__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter_by_filter_by__ = __webpack_require__(226);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__filter_filter__["a" /* FilterPipe */],
                __WEBPACK_IMPORTED_MODULE_2__filter_by_filter_by__["a" /* FilterByPipe */]
            ],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__filter_filter__["a" /* FilterPipe */],
                __WEBPACK_IMPORTED_MODULE_2__filter_by_filter_by__["a" /* FilterByPipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 642:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (items, filter, isAnd) {
        if (filter && Array.isArray(items)) {
            var filterKeys_1 = Object.keys(filter);
            if (isAnd) {
                return items.filter(function (item) {
                    return filterKeys_1.reduce(function (memo, keyName) {
                        return (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "";
                    }, true);
                });
            }
            else {
                return items.filter(function (item) {
                    return filterKeys_1.some(function (keyName) {
                        return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === "";
                    });
                });
            }
        }
        else {
            return items;
        }
    };
    FilterPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'filter'
        })
    ], FilterPipe);
    return FilterPipe;
}());

//# sourceMappingURL=filter.js.map

/***/ }),

/***/ 643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__select_country_select_country__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__ = __webpack_require__(644);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__select_country_select_country__["a" /* SelectCountryComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */], __WEBPACK_IMPORTED_MODULE_3_ionic2_auto_complete__["a" /* AutoCompleteModule */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_1__select_country_select_country__["a" /* SelectCountryComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__select_country_select_country__["a" /* SelectCountryComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_util_util__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_fire_auth__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_tabs__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_fire_firestore__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__global_global_variable__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_app_app__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_select_country_select_country__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import { User } from '../../models/user';


//import { EditProfilePage } from '../edit-profile/edit-profile';


var LoginPage = /** @class */ (function () {
    function LoginPage(storage, navCtrl, navParams, util, db, zone, appProvider, af_auth) {
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.util = util;
        this.db = db;
        this.zone = zone;
        this.appProvider = appProvider;
        this.af_auth = af_auth;
        this.countries = [];
        this.country = null;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.itemsCollection = this.db.collection('users');
        this.util.presentLoading();
        this.getCountryList().then(function () {
            _this.util.stopLoading();
        });
    };
    LoginPage.prototype.getCountryList = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.appProvider.getContryList().subscribe(function (data) {
                if (data) {
                    _this.countries = data;
                    __WEBPACK_IMPORTED_MODULE_7__global_global_variable__["a" /* GlobalVariables */].countries = data;
                }
                resolve();
            }, function (err) { return resolve(); });
        });
    };
    LoginPage.prototype.facebookLogin = function () {
        var _this = this;
        facebookConnectPlugin.login(["public_profile", "email"], function (obj) {
            _this.util.presentLoading();
            var facebookCredential = __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.auth.FacebookAuthProvider
                .credential(obj.authResponse.accessToken);
            _this.af_auth.auth.signInWithCredential(facebookCredential).then(function (res) {
                var obj = res.toJSON();
                var user = {};
                user['email'] = obj['email'];
                user['name'] = obj['displayName'];
                user['picture'] = obj['photoURL'];
                user['base64'] = btoa(user['email']);
                user['fb_id'] = obj['providerData'][0]['uid'];
                user['online'] = true;
                __WEBPACK_IMPORTED_MODULE_7__global_global_variable__["a" /* GlobalVariables */].user = user;
                var docRef = _this.itemsCollection.doc(user['base64']);
                docRef.get().subscribe(function (doc) {
                    _this.storage.set('checkUser', true);
                    if (!doc.exists) {
                        _this.itemsCollection.doc(user['base64']).set(user).then(function () {
                            _this.util.setLocal('user', user);
                            _this.storage.set('checkUser', true);
                        });
                    }
                    else {
                        __WEBPACK_IMPORTED_MODULE_7__global_global_variable__["a" /* GlobalVariables */].user = doc.data();
                        _this.util.setLocal('user', doc.data());
                        _this.storage.set('checkUser', true);
                    }
                    _this.util.stopLoading();
                    if (__WEBPACK_IMPORTED_MODULE_7__global_global_variable__["a" /* GlobalVariables */].user['country'] || __WEBPACK_IMPORTED_MODULE_7__global_global_variable__["a" /* GlobalVariables */].user['country'] != '') {
                        _this.zone.run(function () {
                            _this.storage.set('checkUser', true);
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__tabs_tabs__["a" /* TabsPage */]);
                        });
                    }
                    else {
                        _this.util.showModal(__WEBPACK_IMPORTED_MODULE_9__components_select_country_select_country__["a" /* SelectCountryComponent */]).then(function (data) {
                            _this.storage.set('checkUser', true);
                        });
                    }
                });
            }, function (err) {
            });
        }, function (fail) {
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/login/login.html"*/'<ion-content>\n  <div class="login-wrap">\n    <h1>FACE TRIP</h1>\n    <button round full color="facebook" ion-button icon-left (tap)="facebookLogin()">\n      <ion-icon name="logo-facebook"></ion-icon>\n      Facebook\n    </button>\n    \n    <p text-center>Login or Register using your Facebook account</p>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/pipo/Documents/facetrip22072019/project01072019/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_util_util__["a" /* UtilProvider */],
            __WEBPACK_IMPORTED_MODULE_6__angular_fire_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_8__providers_app_app__["a" /* AppProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_fire_auth__["AngularFireAuth"]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[375]);
//# sourceMappingURL=main.js.map