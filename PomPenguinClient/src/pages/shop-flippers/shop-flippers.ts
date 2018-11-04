import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Service } from '../../services/penguin.service';
import { trigger, state, style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'page-shop-flippers',
  templateUrl: 'shop-flippers.html',
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
export class ShopFlippersPage {
	level:number;
	newSpeed:number;
  currentSpeed:number;
  price:number;
	coins:number;

  visibleState:any = 'invisible';
  errorMessage:any;

  	constructor(public navCtrl: NavController, private event: Events,  private service: Service) {
      this.loadNewData();
      this.event.subscribe('LoadNewData',(data) => {
        this.loadNewData();
      })
      
    }

    loadNewData()
    {
      
      this.level = JSON.parse(window.localStorage.user).selectedImprovements[0].waterLevel + 1; //+1 ker kupujemo naslednji level
      this.currentSpeed = JSON.parse(window.localStorage.penguin).speed.swim * JSON.parse(window.localStorage.penguin).baseSpeed + this.level - 1;
      this.newSpeed = this.currentSpeed + 1;
      this.price = this.level * 100;
      this.coins =JSON.parse(window.localStorage.user).coins
      console.log("beri podatke za vodo" + JSON.parse(window.localStorage.penguin).speed.swim);    
    }

    submitEvent(){
      this.event.publish('mainMenu', 'data');
    }

    upgrade(){
      var data = {
        improvement:"flippers", 
      };

      this.service.postService('','/update', data).subscribe(response => {
        console.log(response);  
        if(response.message == "success")
        {
          window.localStorage.user = JSON.stringify(response. changedUser);
          this.loadNewData();
          this.event.publish('LoadPenguins', 'data');
        }
        else
        {
          //prikazemo opozorilo o napaki
          this.errorMessage = "You don't have enough money!";
          this.visibleState = 'visible';
          setTimeout(() => {
            this.visibleState = 'invisible';
          }, 2000)
        }
      });
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
