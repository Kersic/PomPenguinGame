var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { TabsPage } from '../tabs/tabs';
import { MainMenu } from '../mainMenu/mainMenu';
import { LoginPage } from '../login/login';
import { Service } from '../../services/penguin.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, service) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.visibleState = 'invisible';
    }
    SignupPage.prototype.Signup = function () {
        var _this = this;
        if (this.username == null || this.email == null || this.password == null) {
            //prikazemo opozorilo o napaki
            this.errorMessage = "All fields are required";
            this.visibleState = 'visible';
            setTimeout(function () {
                _this.visibleState = 'invisible';
            }, 2000);
        }
        else {
            var data = {
                "username": this.username,
                "email": this.email,
                "password": this.password
            };
            console.log("Data" + JSON.stringify(data));
            this.service.postService('', '/registracija', data).subscribe(function (response) {
                if (response.message == "success") {
                    window.localStorage.user = JSON.stringify(response.user);
                    window.localStorage.username = _this.username;
                    window.localStorage.token = response.token;
                    _this.navCtrl.push(MainMenu);
                }
                else {
                    //prikazemo opozorilo o napaki
                    _this.errorMessage = response.message;
                    _this.visibleState = 'visible';
                    setTimeout(function () {
                        _this.visibleState = 'invisible';
                    }, 2000);
                }
            });
        }
    };
    SignupPage.prototype.Login = function () {
        this.navCtrl.push(LoginPage);
    };
    SignupPage = __decorate([
        Component({
            selector: 'page-signup',
            templateUrl: 'signup.html',
            animations: [
                trigger('visibilitytrigger', [
                    state('visible', style({
                        opacity: 1
                    })),
                    state('invisible', style({
                        opacity: 0
                    })),
                    transition('visible => invisible', animate('.5s'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [NavController, Service])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.js.map