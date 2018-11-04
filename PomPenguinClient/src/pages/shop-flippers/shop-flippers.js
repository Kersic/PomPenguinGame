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
import { Service } from '../../services/penguin.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
var ShopFlippersPage = /** @class */ (function () {
    function ShopFlippersPage(navCtrl, event, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.event = event;
        this.service = service;
        this.visibleState = 'invisible';
        this.loadNewData();
        this.event.subscribe('LoadNewData', function (data) {
            _this.loadNewData();
        });
    }
    ShopFlippersPage.prototype.loadNewData = function () {
        this.level = JSON.parse(window.localStorage.user).selectedImprovements[0].waterLevel + 1; //+1 ker kupujemo naslednji level
        this.currentSpeed = JSON.parse(window.localStorage.penguin).speed.swim * JSON.parse(window.localStorage.penguin).baseSpeed + this.level - 1;
        this.newSpeed = this.currentSpeed + 1;
        this.price = this.level * 100;
        this.coins = JSON.parse(window.localStorage.user).coins;
        console.log("beri podatke za vodo" + JSON.parse(window.localStorage.penguin).speed.swim);
    };
    ShopFlippersPage.prototype.submitEvent = function () {
        this.event.publish('mainMenu', 'data');
    };
    ShopFlippersPage.prototype.upgrade = function () {
        var _this = this;
        var data = {
            improvement: "flippers",
        };
        this.service.postService('', '/update', data).subscribe(function (response) {
            console.log(response);
            if (response.message == "success") {
                window.localStorage.user = JSON.stringify(response.changedUser);
                _this.loadNewData();
                _this.event.publish('LoadPenguins', 'data');
            }
            else {
                //prikazemo opozorilo o napaki
                _this.errorMessage = "You don't have enough money!";
                _this.visibleState = 'visible';
                setTimeout(function () {
                    _this.visibleState = 'invisible';
                }, 2000);
            }
        });
    };
    ShopFlippersPage = __decorate([
        Component({
            selector: 'page-shop-flippers',
            templateUrl: 'shop-flippers.html',
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
        __metadata("design:paramtypes", [NavController, Events, Service])
    ], ShopFlippersPage);
    return ShopFlippersPage;
}());
export { ShopFlippersPage };
//# sourceMappingURL=shop-flippers.js.map