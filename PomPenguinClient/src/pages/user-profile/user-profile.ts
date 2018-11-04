import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProfileEditeblePage } from '../user-profile-editeble/user-profile-editeble';
import { MainMenu } from '../mainMenu/mainMenu';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

	username:any;
  	password:any;
  	email:any;

  	constructor(public navCtrl: NavController, public navParams: NavParams) {
  		this.username = JSON.parse(window.localStorage.user).username;
  		this.email = JSON.parse(window.localStorage.user).email;

  	}

  	editProfile(){
  		console.log("edit");
  		this.navCtrl.push(UserProfileEditeblePage);
  	}
    BackButonClick(){
      this.navCtrl.push(MainMenu);
    }

 

}
