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
import { Service } from '../../services/penguin.service';
import { Events } from 'ionic-angular';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, service, event) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.event = event;
        this.username = JSON.parse(window.localStorage.user).username;
        this.getCurrentPenguin();
    }
    ProfilePage.prototype.Logout = function () {
        window.localStorage.token = '';
        this.event.publish('LogOut', 'data'); //login nalozimo it tabov, da niso vidni spodaj
    };
    ProfilePage.prototype.getCurrentPenguin = function () {
        var _this = this;
        this.service.getService('', '/getCurrentPenguin').subscribe(function (response) {
            //console.log("Uporabnikov current pingvin"+JSON.stringify(response));
            _this.penguinName = response.name;
            _this.color = response.color;
            _this.baseSpeed = response.baseSpeed;
            _this.runSpeed = response.speed.run;
            _this.slideSpeed = response.speed.slide;
            _this.swimSpeed = response.speed.swim;
            _this.penCost = response.penguinCost;
            _this.iceLevel = JSON.parse(window.localStorage.user).selectedImprovements[0].iceLevel;
            _this.snowLevel = JSON.parse(window.localStorage.user).selectedImprovements[0].snowLevel;
            _this.waterLevel = JSON.parse(window.localStorage.user).selectedImprovements[0].waterLevel;
            _this.finalIce = _this.baseSpeed * _this.slideSpeed + _this.iceLevel;
            _this.finalSnow = _this.baseSpeed * _this.runSpeed + _this.snowLevel;
            _this.finalWater = _this.baseSpeed * _this.swimSpeed + _this.waterLevel;
            //shranimo piingvnina v localstorage
            window.localStorage.penguin = JSON.stringify(response);
        });
    };
    ProfilePage = __decorate([
        Component({
            selector: 'page-profile',
            templateUrl: 'profile.html'
        }),
        __metadata("design:paramtypes", [NavController, Service, Events])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.js.map