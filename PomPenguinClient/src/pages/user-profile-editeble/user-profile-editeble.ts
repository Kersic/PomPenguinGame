import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../services/penguin.service';
import { UserProfilePage } from '../user-profile/user-profile'
/**
 * Generated class for the UserProfileEditeblePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile-editeble',
  templateUrl: 'user-profile-editeble.html',
})
export class UserProfileEditeblePage {

	username:any;
  	password:any;
  	email:any;
    errorMessage:any;
	visibleState:any = 'invisible';

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: Service) {
		this.username = JSON.parse(window.localStorage.user).username;
  		this.email = JSON.parse(window.localStorage.user).email;

	}
	save(){

		var data = {
			"username": this.username,
			"email": this.email
		};

		this.service.postService("","/putUser",data).subscribe(async response =>{

			if(response.message == "success"){
				window.localStorage.user = JSON.stringify(response.changedUser);
				window.localStorage.username = this.username; 
				 this.navCtrl.push(UserProfilePage);
			}
			else if(response.message == 'Wrong username or password')
	        {
	          this.errorMessage = response.  nmessage;
	          this.visibleState = 'visible';
	          setTimeout(() => {
	            this.visibleState = 'invisible';
	          }, 2000)

        }else{
		
			this.errorMessage = "Connection failed";
          	this.visibleState = 'visible';
          	setTimeout(() => {
            	this.visibleState = 'invisible';
          	}, 2000);
		}


		});
	}


}
