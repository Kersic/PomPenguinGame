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
import { Events } from 'ionic-angular';
import { ShopPenguinPage } from '../shop-penguin/shop-penguin';
import { ShopSledsPage } from '../shop-sleds/shop-sleds';
import { ShopSkisPage } from '../shop-skis/shop-skis';
import { ShopFlippersPage } from '../shop-flippers/shop-flippers';
//import { TabsPage } from '../tabs/tabs';
import { MainMenu } from '../mainMenu/mainMenu';
var ShopTabsPage = /** @class */ (function () {
    function ShopTabsPage(navCtrl, event) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.event = event;
        this.tab1Root = ShopPenguinPage;
        this.tab2Root = ShopSledsPage;
        this.tab3Root = ShopSkisPage;
        this.tab4Root = ShopFlippersPage;
        this.event.subscribe('mainMenu', function (data) {
            _this.ShowMainMenu();
        });
    }
    ShopTabsPage.prototype.ShowMainMenu = function () {
        this.navCtrl.push(MainMenu);
        this.event.unsubscribe('mainMenu');
    };
    ShopTabsPage = __decorate([
        Component({
            selector: 'page-shop-tabs',
            templateUrl: 'shop-tabs.html'
        }),
        __metadata("design:paramtypes", [NavController, Events])
    ], ShopTabsPage);
    return ShopTabsPage;
}());
export { ShopTabsPage };
//# sourceMappingURL=shop-tabs.js.map