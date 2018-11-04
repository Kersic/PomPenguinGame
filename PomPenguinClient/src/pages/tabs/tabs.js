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
//import { ShopPage } from '../shop/shop';
import { StatisticsPage } from '../statistics/statistics';
import { ProfilePage } from '../profile/profile';
//import { ShopPenguinPage } from '../shop-penguin/shop-penguin';
import { ShopTabsPage } from '../shop-tabs/shop-tabs';
import { MyApp } from '../../app/app.component';
import { Events } from 'ionic-angular';
var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl, event) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.event = event;
        this.tab1Root = ProfilePage;
        this.tab2Root = LevelsPage;
        //tab3Root = ShopTabsPage;
        this.tab4Root = StatisticsPage;
        this.event.subscribe('LogOut', function (data) {
            _this.navCtrl.push(MyApp);
        });
    }
    TabsPage.prototype.showShop = function () {
        this.navCtrl.push(ShopTabsPage);
    };
    TabsPage = __decorate([
        Component({
            selector: 'page-tags',
            templateUrl: 'tabs.html'
        }),
        __metadata("design:paramtypes", [NavController, Events])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.js.map