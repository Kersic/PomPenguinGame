import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import { TabsPage } from '../tabs/tabs';
import { MainMenu } from '../mainMenu/mainMenu';
import { LoginPage } from '../login/login';
import { Service } from '../../services/penguin.service';
 
import { trigger, state, style,transition,animate,keyframes,query,stagger } from '@angular/animations';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
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
export class SignupPage {

  username:any;
  email:any;
  password:any;

  errorMessage:any;
  visibleState:any = 'invisible';

  constructor(public navCtrl: NavController, private service: Service) {
  }

  Signup()
  {
    if(this.username == null || this.email ==null || this.password == null)
    {
      //prikazemo opozorilo o napaki
            this.errorMessage = "All fields are required";
            this.visibleState = 'visible';
            setTimeout(() => {
              this.visibleState = 'invisible';
            }, 2000);
    }
    else{

    	  var data = {
          "username": this.username,
          "email": this.email,
          "password": this.password
        };
         console.log("Data"+JSON.stringify(data));
      this.service.postService('','/registracija', data).subscribe(response => {
        
          if(response.message == "success")
          {
            window.localStorage.user = JSON.stringify(response.user);
            window.localStorage.username = this.username;
            window.localStorage.token = response.token;
            this.navCtrl.push(MainMenu);
          }
          else
          {
            //prikazemo opozorilo o napaki
            this.errorMessage = response.message;
            this.visibleState = 'visible';
            setTimeout(() => {
              this.visibleState = 'invisible';
            }, 2000);
          }
        })
     }
  }
  Login()
  {
  	this.navCtrl.push(LoginPage);
  }


}
