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
var StatisticsPage = /** @class */ (function () {
    function StatisticsPage(navCtrl, service, event) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        this.event = event;
        this.getStatistic();
        this.event.subscribe('LoadStatistics', function (data) {
            _this.getStatistic();
        });
    }
    StatisticsPage.prototype.getStatistic = function () {
        var _this = this;
        this.service.getService('/simulator', '/getStatistics').subscribe(function (response) {
            console.log(response);
            _this.statistikaPodatki = response;
        });
    };
    StatisticsPage = __decorate([
        Component({
            selector: 'page-statistics',
            templateUrl: 'statistics.html'
        }),
        __metadata("design:paramtypes", [NavController, Service, Events])
    ], StatisticsPage);
    return StatisticsPage;
}());
export { StatisticsPage };
//# sourceMappingURL=statistics.js.map