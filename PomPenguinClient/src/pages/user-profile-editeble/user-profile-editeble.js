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
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../services/penguin.service';
import { UserProfilePage } from '../user-profile/user-profile';
/**
 * Generated class for the UserProfileEditeblePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserProfileEditeblePage = /** @class */ (function () {
    function UserProfileEditeblePage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.visibleState = 'invisible';
        this.username = JSON.parse(window.localStorage.user).username;
        this.email = JSON.parse(window.localStorage.user).email;
    }
    UserProfileEditeblePage.prototype.save = function () {
        var _this = this;
        var data = {
            "username": this.username,
            "email": this.email
        };
        this.service.postService("", "/putUser", data).subscribe(function (response) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (response.message == "success") {
                    window.localStorage.user = JSON.stringify(response.changedUser);
                    window.localStorage.username = this.username;
                    this.navCtrl.push(UserProfilePage);
                }
                else if (response.message == 'Wrong username or password') {
                    this.errorMessage = response.nmessage;
                    this.visibleState = 'visible';
                    setTimeout(function () {
                        _this.visibleState = 'invisible';
                    }, 2000);
                }
                else {
                    this.errorMessage = "Connection failed";
                    this.visibleState = 'visible';
                    setTimeout(function () {
                        _this.visibleState = 'invisible';
                    }, 2000);
                }
                return [2 /*return*/];
            });
        }); });
    };
    UserProfileEditeblePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-user-profile-editeble',
            templateUrl: 'user-profile-editeble.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Service])
    ], UserProfileEditeblePage);
    return UserProfileEditeblePage;
}());
export { UserProfileEditeblePage };
//# sourceMappingURL=user-profile-editeble.js.map