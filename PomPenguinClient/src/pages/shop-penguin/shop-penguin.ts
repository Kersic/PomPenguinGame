import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { Service } from '../../services/penguin.service';
import { trigger, state, style,transition,animate,keyframes,query,stagger } from '@angular/animations';



@Component({
  selector: 'page-shop-penguin',
  templateUrl: 'shop-penguin.html',
   animations:[
    trigger('visibilitytrigger', [
        state('visible', style({
            opacity:1
        })),
        state('invisible', style({
            opacity:0
        })),
        transition('visible => invisible',animate('.5s'))
      ])
  ]

})
export class ShopPenguinPage {
	currentIndex: any;
  penguins:any;
  coins:number;
  boughtPenguins:any;
  selectedPenguin_id: string;
  panguinsData:any;
   visibleState:any = 'invisible';
   errorMessage:any;

	@ViewChild(Slides) slides: Slides;

    constructor(public navCtrl: NavController, public navParams: NavParams, private event: Events, private service: Service) {
      this.currentIndex = 0;

      this.event.subscribe('LoadPenguins',(data) => {
        this.getPenguins();
      })
      
      this.coins =JSON.parse(window.localStorage.user).coins;

      //za ispis katere pingvine lahko kupimo in katere ze imamo, ter kateri je izbran
      this.boughtPenguins = JSON.parse(window.localStorage.user).boughtPenguins;
      this.selectedPenguin_id = JSON.parse(window.localStorage.user).selectedPenguin_id;
      var index;
      
      //beremo pingvine iz baze
      this.getPenguins();


    }

    getPenguins()
    {
     // console.log("beeri iz baze");
      this.service.getService('/penguin','').subscribe(response => {
       // console.log(response);
        this.penguins = response;

        console.log(JSON.parse(window.localStorage.user).selectedImprovements[0].waterLevel);
       
        var podatkiPingvini = []
        for(var i = 0; i < this.penguins.length; i++)
        {

           //pingvinom dodamo podatek o tem ali so ze kupljni, izbrani.. in o hitrostih
          var kupljen = "ne";
          var hitrosti = ({
            iceSpeed: this.penguins[i].baseSpeed * this.penguins[i].speed.slide,
            waterSpeed: this.penguins[i].baseSpeed * this.penguins[i].speed.swim,
            snowSpeed: this.penguins[i].baseSpeed * this.penguins[i].speed.run,
          });
          
          for(var j = 0; j < this.boughtPenguins.length; j++)
          {
            if(this.penguins[i]._id == this.boughtPenguins[j])
            {
              kupljen = "ja";
              console.log( this.penguins[i].baseSpeed +"*"+this.penguins[i].speed.slide + "+"+ JSON.parse(window.localStorage.user).boughtImprovements[j].iceLevel);
              console.log( this.penguins[i].baseSpeed +"*"+this.penguins[i].speed.slide + "+"+ JSON.parse(window.localStorage.user).boughtImprovements[j].waterLevel);
              console.log( this.penguins[i].baseSpeed +"*"+this.penguins[i].speed.slide + "+"+ JSON.parse(window.localStorage.user).boughtImprovements[j].snowLevel);
              hitrosti = ({
              iceSpeed: this.penguins[i].baseSpeed * this.penguins[i].speed.slide + JSON.parse(window.localStorage.user).boughtImprovements[j].iceLevel,
              waterSpeed: this.penguins[i].baseSpeed * this.penguins[i].speed.swim + JSON.parse(window.localStorage.user).boughtImprovements[j].waterLevel,
              snowSpeed: this.penguins[i].baseSpeed * this.penguins[i].speed.run + JSON.parse(window.localStorage.user).boughtImprovements[j].snowLevel,
            });
            }
          }

          if(this.penguins[i]._id == this.selectedPenguin_id)
          {
            kupljen = "izbran";
            hitrosti = ({
              iceSpeed: this.penguins[i].baseSpeed * this.penguins[i].speed.slide + JSON.parse(window.localStorage.user).selectedImprovements[0].iceLevel,
              waterSpeed: this.penguins[i].baseSpeed * this.penguins[i].speed.swim + JSON.parse(window.localStorage.user).selectedImprovements[0].waterLevel,
              snowSpeed: this.penguins[i].baseSpeed * this.penguins[i].speed.run + JSON.parse(window.localStorage.user).selectedImprovements[0].snowLevel,
            });
          }

          //podatki o hitrostih

          

          podatkiPingvini.push({
            penguin: this.penguins[i],
            kupljen:kupljen,
            hitrosti:hitrosti,

          });
        }

        this.panguinsData = podatkiPingvini;

        //pingvinom dodamo podatke o hitrosih
        console.log(this.panguinsData);
        
      })
    }

    slideNextPenguin(){
      this.slides.slideNext();
    }
    slidePrevPenguin(){
      this.slides.slidePrev();
    }
    slideChanged() {
      this.currentIndex = this.slides.getActiveIndex();
    }
    submitEvent(){
      this.event.publish('mainMenu', 'data');
    }
    saveCurrentPenguin()
    {

      this.service.getService('','/getCurrentPenguin').subscribe(response => {

          window.localStorage.penguin = JSON.stringify(response);
          this.event.publish('LoadNewData', 'data'); // da nalozimo nove podtke tudi na imporvments straneh
   
      });
    }

    selectPenguin(penguinId)
    {
      var data = {
        "penguinId": penguinId,
      };

      this.service.postService('','/selectPenguin', data).subscribe(response => {
        console.log(response);  
        if(response.message == "success")
        {
           window.localStorage.user = JSON.stringify(response.changedUser);

          //za ispis katere pingvine lahko kupimo in katere ze imamo, ter kateri je izbran
          this.boughtPenguins = JSON.parse(window.localStorage.user).boughtPenguins;
          this.selectedPenguin_id = JSON.parse(window.localStorage.user).selectedPenguin_id;
          this.coins =JSON.parse(window.localStorage.user).coins;
          var index;
          
          //beremo pingvine iz baze
          
          this.saveCurrentPenguin();
          this.getPenguins(); 

          
        }
      });

    }
    BuyPenguin(penguinId)
    {
      var data = {
        "penguinId": penguinId,
      };

      this.service.postService('','/buyPenguin', data).subscribe(response => {
        console.log(response);  
        if(response.message == "success")
        {
          
          window.localStorage.user = JSON.stringify(response. changedUser);

           //za ispis katere pingvine lahko kupimo in katere ze imamo, ter kateri je izbran
          this.boughtPenguins = JSON.parse(window.localStorage.user).boughtPenguins;
          this.selectedPenguin_id = JSON.parse(window.localStorage.user).selectedPenguin_id;
          this.coins =JSON.parse(window.localStorage.user).coins;
          var index;

          //dolocimo kateri pingvinje izbran, kateri so ze kupljeni, in kateri se niso
          console.log("kupljeni: "+this.boughtPenguins);
          for(var i = 0; i < this.boughtPenguins.length; i++)
          {
            if(this.selectedPenguin_id == this.boughtPenguins[i])
            {
              index = i;
            }
          }
          this.boughtPenguins.splice(index, 1);
          console.log("trenutni: " + this.selectedPenguin_id + " kupljeni: "+ this.boughtPenguins);
          
          //beremo pingvine iz baze
          this.getPenguins();     
          this.saveCurrentPenguin();     
        }
        else if(response.message=="PremaloDenarja")
        {
          //prikazemo opozorilo o napaki
          this.errorMessage = "You don't have enough money!";
          this.visibleState = 'visible';
          setTimeout(() => {
            this.visibleState = 'invisible';
          }, 2000)
        }
       
      })


    }
    getHint()
    {
      this.service.getService('/simulator','/getHint').subscribe(response => {
        console.log(response);  
         this.errorMessage = response;
          this.visibleState = 'visible';
          setTimeout(() => {
            this.visibleState = 'invisible';
          }, 4000)
      });
        
    }
}
