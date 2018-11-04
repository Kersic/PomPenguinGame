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
var SimulatorPage = /** @class */ (function () {
    function SimulatorPage(navCtrl, event, service) {
        //da pridobimo podatek o izbrani progi iz strani levels 
        this.navCtrl = navCtrl;
        this.event = event;
        this.service = service;
        this.vmesniCasi = [];
        //nastavi ime levela
        this.izbranLevelName = window.localStorage.selectedLevelName;
        this.prikazaniCas = 0;
        this.priakzaniCekini = 0;
        this.prikazanTip = 3;
        this.getSimulatror();
    }
    SimulatorPage.prototype.submitEvent = function () {
    };
    SimulatorPage.prototype.doSetTimeout = function (i) {
        var _this = this;
        setTimeout(function () {
            //console.log(i);
            if (i < _this.vmesniTipPodlage.length - 1) {
                _this.prikazanTip = _this.vmesniTipPodlage[i + 1];
            }
            else {
            }
            _this.prikazaniCas = _this.vmesniCasi[i];
            _this.priakzaniCekini = _this.vmesniCekini[i];
        }, 1000 + i * 1000);
    };
    SimulatorPage.prototype.getSimulatror = function () {
        var _this = this;
        //console.log("beeri iz baze");
        this.service.getService('/simulator', '/' + window.localStorage.selectedLevel + '/' + JSON.parse(window.localStorage.user).selectedPenguin_id + '/2').subscribe(function (response) {
            console.log(response);
            if (response.message == "success") {
                window.localStorage.user = JSON.stringify(response.changedUser);
                _this.skupenCas = response.rezultat.skupniCasProge;
                _this.vmesniCasi = response.rezultat.vmesniCasi;
                _this.skupniCekini = response.rezultat.skupniCekini;
                _this.vmesniCekini = response.rezultat.vmesniCekini;
                _this.event.publish('LoadStatistics', 'data'); //osvezimo podatke v statiskiki
                _this.vmesniTipPodlage = response.rezultat.vmesniTipiPodlage;
                //animacija
                document.getElementById('penguin').classList.add("animatedPenguin");
                document.getElementById('penguin').style.animationDuration = _this.vmesniCasi.length + "s";
                //  document.getElementById('speedsInfo').classList.add("animatedPenguin");
                //  document.getElementById('speedsInfo').style.animationDuration = this.vmesniCasi.length+"s";
                _this.prikazanTip = _this.vmesniTipPodlage[0];
                for (var i = 0; i < response.rezultat.vmesniCasi.length; i++) {
                    // console.log(response.rezultat.vmesniCasi[i]);
                    _this.doSetTimeout(i);
                }
                /*for(var i = 0; i < response.rezultat.vmesniCasi.length; i++)
                  console.log("loop");
                  setTimeout(() => {
                  this.vmesniCasi.push( response.rezultat.vmesniCasi[i])
                }, 500)*/
            }
            else {
            }
        });
    };
    SimulatorPage = __decorate([
        Component({
            selector: 'page-simulator',
            templateUrl: 'simulator.html'
        }),
        __metadata("design:paramtypes", [NavController, Events, Service])
    ], SimulatorPage);
    return SimulatorPage;
}());
export { SimulatorPage };
//# sourceMappingURL=simulator.js.map