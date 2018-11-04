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
import { SimulatorPage } from '../simulator/simulator';
import { Events } from 'ionic-angular';
import { Service } from '../../services/penguin.service';
var LevelsPage = /** @class */ (function () {
    function LevelsPage(event, navCtrl, service) {
        //var imena = ['Bald Head', 'Bodie Island', 'Cape Fear','Cape Hatteras', 'Cape Lookout', 'Croatan Shoal','Currituck Beach', 'Federal Point ', 'Hatteras Beacon','Diamond Shoal', 'Frying Pan Shoals', 'Laurel Point'];
        this.event = event;
        this.navCtrl = navCtrl;
        this.service = service;
        var levels;
        this.getLevels();
    }
    LevelsPage.prototype.ngOnInit = function () {
    };
    LevelsPage.prototype.submitEvent = function () {
        this.event.publish('Level', this.izbranLevel);
    };
    LevelsPage.prototype.itemSelected = function (level) {
        this.izbranLevel = level.id;
        console.log(this.izbranLevel);
        window.localStorage.selectedLevel = this.izbranLevel;
        window.localStorage.selectedLevelName = level.name;
        this.navCtrl.push(SimulatorPage);
    };
    LevelsPage.prototype.getLevels = function () {
        var _this = this;
        console.log("beeri iz baze");
        this.service.getService('/racetrack', '').subscribe(function (response) {
            console.log(response);
            _this.levels = response;
            var vsi = [];
            for (var i = 0; i < _this.levels.length; i++) {
                var level = new Level();
                level.name = _this.levels[i].name;
                level.id = _this.levels[i]._id;
                level.h1 = parseFloat(_this.levels[i].snowPercent).toFixed(1);
                level.h2 = parseFloat(_this.levels[i].waterPercent).toFixed(1);
                level.h3 = parseFloat(_this.levels[i].icePercent).toFixed(1);
                vsi.push(level);
            }
            _this.levels = vsi;
        });
    };
    LevelsPage = __decorate([
        Component({
            selector: 'page-levels',
            templateUrl: 'levels.html'
        }),
        __metadata("design:paramtypes", [Events, NavController, Service])
    ], LevelsPage);
    return LevelsPage;
}());
export { LevelsPage };
var Level = /** @class */ (function () {
    function Level() {
    }
    return Level;
}());
//# sourceMappingURL=levels.js.map