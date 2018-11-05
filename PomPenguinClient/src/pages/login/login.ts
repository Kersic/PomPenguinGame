import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
//import { TabsPage } from '../tabs/tabs';
import { MainMenu } from '../mainMenu/mainMenu';

import { trigger, state, style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import { Service } from '../../services/penguin.service';
import { Coding } from '../../services/coding.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
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
export class LoginPage {
  username:any;
  password:any;
  errorMessage:any;
  test:any;
  test2:any;

  visibleState:any = 'invisible';
  
  constructor(public navCtrl: NavController, private service: Service, private coding: Coding) {
    this.test = coding.code([55, 53, 53, 53, 53, 53, 10, 10, 11, 11, 11, 11]);
    this.test2 = coding.decode("000011011100000001010010100010101101000100001001001111");
  }

  Login(){
    var data = {
        "username": this.username,
        "password": this.password
      };

    this.service.postService('','/prijava', data).subscribe(async response => {

        if(response.message == "success")
        {
          
          window.localStorage.user = JSON.stringify(response.user);
          window.localStorage.username = this.username;
          //window.localStorage.token = response.token;
          window.localStorage.setItem('token', response.token);
          console.log("shrani token");
          this.loadProfile();
        }
        else if(response.message == 'Wrong username or password')
        {
          //prikazemo opozorilo o napaki
          this.errorMessage = response.message;
          this.visibleState = 'visible';
          setTimeout(() => {
            this.visibleState = 'invisible';
          }, 2000)
        }
        else
        {
          //prikazemo opozorilo o napaki
          this.errorMessage = "Connection failed";
          this.visibleState = 'visible';
          setTimeout(() => {
            this.visibleState = 'invisible';
          }, 2000);
        }
      })

  	
  }
  
  loadProfile(){
    console.log("klic profila");
    this.navCtrl.push(MainMenu,{},{ animate:false});
  }
  Signup(){
  	this.navCtrl.push(SignupPage);
  }

  /*ToggleVisible(){
    this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';
    console.log(this.visibleState);
  }*/

  

}


