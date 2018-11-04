import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Service } from '../../services/penguin.service';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html'
})
export class StatisticsPage {
  statistikaPodatki:any;

  constructor(public navCtrl: NavController, private service: Service, private event: Events) {
    this.getStatistic();
      this.event.subscribe('LoadStatistics',(data) => {
        this.getStatistic();
      })

  }

  getStatistic()
  {
     this.service.getService('/simulator','/getStatistics').subscribe(response => {
       console.log(response);
       this.statistikaPodatki = response;
     });
  }
}
  