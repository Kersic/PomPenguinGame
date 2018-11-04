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
import { LevelsPage } from '../levels/levels';
import { StatisticsPage } from '../statistics/statistics';
import { ShopTabsPage } from '../shop-tabs/shop-tabs';
import { UserProfilePage } from '../user-profile/user-profile';
import { Service } from '../../services/penguin.service';
var MainMenu = /** @class */ (function () {
    function MainMenu(navCtrl, service) {
        this.navCtrl = navCtrl;
        this.service = service;
    }
    MainMenu.prototype.loadPlay = function () {
        this.navCtrl.push(LevelsPage);
    };
    MainMenu.prototype.loadLevels = function () {
        this.navCtrl.push(LevelsPage);
    };
    MainMenu.prototype.loadStatistics = function () {
        this.navCtrl.push(StatisticsPage);
    };
    MainMenu.prototype.loadShop = function () {
        this.navCtrl.push(ShopTabsPage);
    };
    MainMenu.prototype.LoadProfile = function () {
        this.navCtrl.push(UserProfilePage);
    };
    MainMenu.prototype.logout = function () {
        //this.navCtrl.push(ProfilePage);
    };
    MainMenu = __decorate([
        Component({
            selector: 'page-mainMenu',
            templateUrl: 'mainMenu.html',
        }),
        __metadata("design:paramtypes", [NavController, Service])
    ], MainMenu);
    return MainMenu;
}());
export { MainMenu };
//# sourceMappingURL=mainMenu.js.map