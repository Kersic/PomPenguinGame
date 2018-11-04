import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LevelsPage } from '../levels/levels';
import { StatisticsPage } from '../statistics/statistics';
import { ShopTabsPage } from '../shop-tabs/shop-tabs';
import { ProfilePage } from '../profile/profile';
import { UserProfilePage } from '../user-profile/user-profile';


import { Service } from '../../services/penguin.service';

@Component({
  selector: 'page-mainMenu',
  templateUrl: 'mainMenu.html',

})
export class MainMenu {

  
  constructor(public navCtrl: NavController, private service: Service) {
      
  }

  loadPlay(){
  	this.navCtrl.push(LevelsPage);
  }
 
  loadLevels(){
  	this.navCtrl.push(LevelsPage);
  }

  loadStatistics(){
  	this.navCtrl.push(StatisticsPage);
  }

  loadShop(){
  	this.navCtrl.push(ShopTabsPage);
  }

  LoadProfile()
  {
    this.navCtrl.push(UserProfilePage);
  }

  logout()
  {
     //this.navCtrl.push(ProfilePage);
  }

}


