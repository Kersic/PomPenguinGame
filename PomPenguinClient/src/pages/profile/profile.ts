import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { Service } from '../../services/penguin.service';
import { Events } from 'ionic-angular';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
	
    //user
    username:string;

    //penguin
    penguinName:string;
    color:string;
    baseSpeed:number;
    runSpeed:number;
    slideSpeed:number;
    swimSpeed:number;
    penCost:number;
    iceLevel:number;
    snowLevel:number;
    waterLevel:number;

    finalIce:number;
    finalSnow:number;
    finalWater:number;

  	constructor(public navCtrl: NavController,  private service: Service,private event: Events) {
  		
      this.username = JSON.parse(window.localStorage.user).username;
      this.getCurrentPenguin();

  	  
    }

  	Logout()
  	{
  		window.localStorage.token='';
  		 this.event.publish('LogOut', 'data'); //login nalozimo it tabov, da niso vidni spodaj
   	}

  	getCurrentPenguin()
  	{

 	   this.service.getService('','/getCurrentPenguin').subscribe(response => {
		      //console.log("Uporabnikov current pingvin"+JSON.stringify(response));
          this.penguinName=response.name;
          this.color=response.color;
          this.baseSpeed=response.baseSpeed;
          this.runSpeed=response.speed.run;
          this.slideSpeed=response.speed.slide;
          this.swimSpeed=response.speed.swim;
          this.penCost=response.penguinCost;
          this.iceLevel=JSON.parse(window.localStorage.user).selectedImprovements[0].iceLevel;
          this.snowLevel=JSON.parse(window.localStorage.user).selectedImprovements[0].snowLevel;
          this.waterLevel=JSON.parse(window.localStorage.user).selectedImprovements[0].waterLevel;
          

          this.finalIce=this.baseSpeed*this.slideSpeed+this.iceLevel;
          this.finalSnow=this.baseSpeed*this.runSpeed+this.snowLevel;
          this.finalWater=this.baseSpeed*this.swimSpeed+this.waterLevel;

          //shranimo piingvnina v localstorage
          window.localStorage.penguin = JSON.stringify(response);
 	
      });


  	}

}