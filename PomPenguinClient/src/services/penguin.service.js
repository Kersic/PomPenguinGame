var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import { HTTP } from '@ionic-native/http';
//import {Observable} from 'rxjs/Rx'
import 'rxjs/Rx';
var Service = /** @class */ (function () {
    function Service(http) {
        this.http = http;
        //this.baseUrl = 'https://agile-island-71770.herokuapp.com';
        //this.baseUrl = 'http://localhost:3000';
        this.baseUrl = 'https://chatty-dingo-59.localtunnel.me';
    }
    Service.prototype.getService = function (ruter, api) {
        //console.log("Poslan token "+window.localStorage.token);
        var header = { "headers": { "Authorization": "Bearer " + window.localStorage.token, "Content-Type": "application/json", "withCredentials": "true" } };
        return this.http.get(this.baseUrl + ruter + api, header).map(function (res) { return res.json(); });
        //return this.http.get(this.baseUrl+'/food/top.json?limit=5').map(res => res.json());
    };
    Service.prototype.postService = function (ruter, api, data) {
        var header = { "headers": { "Authorization": "Bearer " + window.localStorage.token, "Content-Type": "application/json", "withCredentials": "true" } };
        return this.http.post(this.baseUrl + ruter + api, data, header)
            .map(function (res) { return res.json(); });
    };
    Service = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], Service);
    return Service;
}());
export { Service };
//# sourceMappingURL=penguin.service.js.map