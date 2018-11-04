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
import { NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Service } from '../../services/penguin.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
var ShopPenguinPage = /** @class */ (function () {
    function ShopPenguinPage(navCtrl, navParams, event, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.event = event;
        this.service = service;
        this.visibleState = 'invisible';
        this.currentIndex = 0;
        this.event.subscribe('LoadPenguins', function (data) {
            _this.getPenguins();
        });
        this.coins = JSON.parse(window.localStorage.user).coins;
        //za ispis katere pingvine lahko kupimo in katere ze imamo, ter kateri je izbran
        this.boughtPenguins = JSON.parse(window.localStorage.user).boughtPenguins;
        this.selectedPenguin_id = JSON.parse(window.localStorage.user).selectedPenguin_id;
        var index;
        //beremo pingvine iz baze
        this.getPenguins();
    }
    ShopPenguinPage.prototype.getPenguins = function () {
        var _this = this;
        // console.log("beeri iz baze");
        this.service.getService('/penguin', '').subscribe(function (response) {
            // console.log(response);
            _this.penguins = response;
            console.log(JSON.parse(window.localStorage.user).selectedImprovements[0].waterLevel);
            var podatkiPingvini = [];
            for (var i = 0; i < _this.penguins.length; i++) {
                //pingvinom dodamo podatek o tem ali so ze kupljni, izbrani.. in o hitrostih
                var kupljen = "ne";
                var hitrosti = ({
                    iceSpeed: _this.penguins[i].baseSpeed * _this.penguins[i].speed.slide,
                    waterSpeed: _this.penguins[i].baseSpeed * _this.penguins[i].speed.swim,
                    snowSpeed: _this.penguins[i].baseSpeed * _this.penguins[i].speed.run,
                });
                for (var j = 0; j < _this.boughtPenguins.length; j++) {
                    if (_this.penguins[i]._id == _this.boughtPenguins[j]) {
                        kupljen = "ja";
                        console.log(_this.penguins[i].baseSpeed + "*" + _this.penguins[i].speed.slide + "+" + JSON.parse(window.localStorage.user).boughtImprovements[j].iceLevel);
                        console.log(_this.penguins[i].baseSpeed + "*" + _this.penguins[i].speed.slide + "+" + JSON.parse(window.localStorage.user).boughtImprovements[j].waterLevel);
                        console.log(_this.penguins[i].baseSpeed + "*" + _this.penguins[i].speed.slide + "+" + JSON.parse(window.localStorage.user).boughtImprovements[j].snowLevel);
                        hitrosti = ({
                            iceSpeed: _this.penguins[i].baseSpeed * _this.penguins[i].speed.slide + JSON.parse(window.localStorage.user).boughtImprovements[j].iceLevel,
                            waterSpeed: _this.penguins[i].baseSpeed * _this.penguins[i].speed.swim + JSON.parse(window.localStorage.user).boughtImprovements[j].waterLevel,
                            snowSpeed: _this.penguins[i].baseSpeed * _this.penguins[i].speed.run + JSON.parse(window.localStorage.user).boughtImprovements[j].snowLevel,
                        });
                    }
                }
                if (_this.penguins[i]._id == _this.selectedPenguin_id) {
                    kupljen = "izbran";
                    hitrosti = ({
                        iceSpeed: _this.penguins[i].baseSpeed * _this.penguins[i].speed.slide + JSON.parse(window.localStorage.user).selectedImprovements[0].iceLevel,
                        waterSpeed: _this.penguins[i].baseSpeed * _this.penguins[i].speed.swim + JSON.parse(window.localStorage.user).selectedImprovements[0].waterLevel,
                        snowSpeed: _this.penguins[i].baseSpeed * _this.penguins[i].speed.run + JSON.parse(window.localStorage.user).selectedImprovements[0].snowLevel,
                    });
                }
                //podatki o hitrostih
                podatkiPingvini.push({
                    penguin: _this.penguins[i],
                    kupljen: kupljen,
                    hitrosti: hitrosti,
                });
            }
            _this.panguinsData = podatkiPingvini;
            //pingvinom dodamo podatke o hitrosih
            console.log(_this.panguinsData);
        });
    };
    ShopPenguinPage.prototype.slideNextPenguin = function () {
        this.slides.slideNext();
    };
    ShopPenguinPage.prototype.slidePrevPenguin = function () {
        this.slides.slidePrev();
    };
    ShopPenguinPage.prototype.slideChanged = function () {
        this.currentIndex = this.slides.getActiveIndex();
    };
    ShopPenguinPage.prototype.submitEvent = function () {
        this.event.publish('mainMenu', 'data');
    };
    ShopPenguinPage.prototype.saveCurrentPenguin = function () {
        var _this = this;
        this.service.getService('', '/getCurrentPenguin').subscribe(function (response) {
            window.localStorage.penguin = JSON.stringify(response);
            _this.event.publish('LoadNewData', 'data'); // da nalozimo nove podtke tudi na imporvments straneh
        });
    };
    ShopPenguinPage.prototype.selectPenguin = function (penguinId) {
        var _this = this;
        var data = {
            "penguinId": penguinId,
        };
        this.service.postService('', '/selectPenguin', data).subscribe(function (response) {
            console.log(response);
            if (response.message == "success") {
                window.localStorage.user = JSON.stringify(response.changedUser);
                //za ispis katere pingvine lahko kupimo in katere ze imamo, ter kateri je izbran
                _this.boughtPenguins = JSON.parse(window.localStorage.user).boughtPenguins;
                _this.selectedPenguin_id = JSON.parse(window.localStorage.user).selectedPenguin_id;
                _this.coins = JSON.parse(window.localStorage.user).coins;
                var index;
                //beremo pingvine iz baze
                _this.saveCurrentPenguin();
                _this.getPenguins();
            }
        });
    };
    ShopPenguinPage.prototype.BuyPenguin = function (penguinId) {
        var _this = this;
        var data = {
            "penguinId": penguinId,
        };
        this.service.postService('', '/buyPenguin', data).subscribe(function (response) {
            console.log(response);
            if (response.message == "success") {
                window.localStorage.user = JSON.stringify(response.changedUser);
                //za ispis katere pingvine lahko kupimo in katere ze imamo, ter kateri je izbran
                _this.boughtPenguins = JSON.parse(window.localStorage.user).boughtPenguins;
                _this.selectedPenguin_id = JSON.parse(window.localStorage.user).selectedPenguin_id;
                _this.coins = JSON.parse(window.localStorage.user).coins;
                var index;
                //dolocimo kateri pingvinje izbran, kateri so ze kupljeni, in kateri se niso
                console.log("kupljeni: " + _this.boughtPenguins);
                for (var i = 0; i < _this.boughtPenguins.length; i++) {
                    if (_this.selectedPenguin_id == _this.boughtPenguins[i]) {
                        index = i;
                    }
                }
                _this.boughtPenguins.splice(index, 1);
                console.log("trenutni: " + _this.selectedPenguin_id + " kupljeni: " + _this.boughtPenguins);
                //beremo pingvine iz baze
                _this.getPenguins();
                _this.saveCurrentPenguin();
            }
            else if (response.message == "PremaloDenarja") {
                //prikazemo opozorilo o napaki
                _this.errorMessage = "You don't have enough money!";
                _this.visibleState = 'visible';
                setTimeout(function () {
                    _this.visibleState = 'invisible';
                }, 2000);
            }
        });
    };
    ShopPenguinPage.prototype.getHint = function () {
        var _this = this;
        this.service.getService('/simulator', '/getHint').subscribe(function (response) {
            console.log(response);
            _this.errorMessage = response;
            _this.visibleState = 'visible';
            setTimeout(function () {
                _this.visibleState = 'invisible';
            }, 4000);
        });
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], ShopPenguinPage.prototype, "slides", void 0);
    ShopPenguinPage = __decorate([
        Component({
            selector: 'page-shop-penguin',
            templateUrl: 'shop-penguin.html',
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
        __metadata("design:paramtypes", [NavController, NavParams, Events, Service])
    ], ShopPenguinPage);
    return ShopPenguinPage;
}());
export { ShopPenguinPage };
//# sourceMappingURL=shop-penguin.js.map