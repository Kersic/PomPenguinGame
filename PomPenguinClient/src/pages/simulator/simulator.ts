import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Service } from '../../services/penguin.service';
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'page-simulator',
  templateUrl: 'simulator.html'
})
export class SimulatorPage {
	skupenCas:number;
	vmesniCasi:any = [];
  izbranLevel:any;
  skupniCekini:any;
  vmesniCekini:any;
  vmesniTipPodlage:any;
  izbranLevelName:any;
  prikazaniCas:any;
  priakzaniCekini:any;
  prikazanTip:any;

  	constructor(public navCtrl: NavController, private event: Events, private service: Service) {
       //da pridobimo podatek o izbrani progi iz strani levels 
    
      //nastavi ime levela
      this.izbranLevelName = window.localStorage.selectedLevelName;
      this.prikazaniCas = 0;
      this.priakzaniCekini = 0;
      this.prikazanTip = 3;

      this.getSimulatror();
  	}
  	submitEvent(){
      
    }

    doSetTimeout(i)
    {
      setTimeout(() => {
        //console.log(i);
        if(i <  this.vmesniTipPodlage.length - 1)
        {
          this.prikazanTip = this.vmesniTipPodlage[i+1];
        }
        else
        {
          navigator.vibrate(1000);
        }
        this.prikazaniCas = this.vmesniCasi[i];
        this.priakzaniCekini = this.vmesniCekini[i];
      }, 1000 + i*1000);
    }

    getSimulatror()
    {
       //console.log("beeri iz baze");
        this.service.getService('/simulator','/'+window.localStorage.selectedLevel+'/'+JSON.parse(window.localStorage.user).selectedPenguin_id+'/2',).subscribe( response => {
        console.log(response); 
        if(response.message == "success")
        {
          window.localStorage.user = JSON.stringify(response.changedUser);
          this.skupenCas = response.rezultat.skupniCasProge;
          this.vmesniCasi = response.rezultat.vmesniCasi;
          this.skupniCekini = response.rezultat.skupniCekini;
          this.vmesniCekini = response.rezultat.vmesniCekini;
          this.event.publish('LoadStatistics', 'data');  //osvezimo podatke v statiskiki
          this.vmesniTipPodlage = response.rezultat.vmesniTipiPodlage;
          //animacija
          document.getElementById('penguin').classList.add("animatedPenguin");
          document.getElementById('penguin').style.animationDuration = this.vmesniCasi.length+"s";
        //  document.getElementById('speedsInfo').classList.add("animatedPenguin");
        //  document.getElementById('speedsInfo').style.animationDuration = this.vmesniCasi.length+"s";
          this.prikazanTip = this.vmesniTipPodlage[0];

          for(var i = 0; i < response.rezultat.vmesniCasi.length; i++)
          {   

             // console.log(response.rezultat.vmesniCasi[i]);
              this.doSetTimeout(i);
          }
          /*for(var i = 0; i < response.rezultat.vmesniCasi.length; i++)
            console.log("loop");
            setTimeout(() => {
            this.vmesniCasi.push( response.rezultat.vmesniCasi[i])
          }, 500)*/
        }
        else
        {

        }
        

      })
    }

}
