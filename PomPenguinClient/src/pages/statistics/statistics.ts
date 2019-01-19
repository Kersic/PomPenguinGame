import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Service } from '../../services/penguin.service';
import { Events } from 'ionic-angular';
import { Coding } from '../../services/coding.service';

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html'
})
export class StatisticsPage {
  statistikaPodatki:any;

  constructor(public navCtrl: NavController, private service: Service, private event: Events, private coding:Coding) {
    this.getStatistic();
      this.event.subscribe('LoadStatistics',(data) => {
        this.getStatistic();
      })

  }

  getStatistic()
  {
    //nekodirano
    //  this.service.getService('/simulator','/getStatistics').subscribe(response => {
    //    console.log(response);
    //    this.statistikaPodatki = response;
    //  });

     //kodirano MULTIMEDIJA
    this.service.getCodedService('/simulator','/getStatistics').subscribe(response => {
      //console.log(response['_body']);
      var decoded = this.coding.decode(response['_body']);
      var jsonString = "";
      for(let i = 0; i < decoded.length; i++){
           jsonString+=(String.fromCharCode(decoded[i]));
      }
      this.statistikaPodatki = JSON.parse(jsonString);
    });

  }
}
