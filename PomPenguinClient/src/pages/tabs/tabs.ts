import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LevelsPage } from '../levels/levels';
//import { ShopPage } from '../shop/shop';
import { StatisticsPage } from '../statistics/statistics';
import { ProfilePage } from '../profile/profile';
//import { ShopPenguinPage } from '../shop-penguin/shop-penguin';
import { ShopTabsPage } from '../shop-tabs/shop-tabs';
import { MyApp } from '../../app/app.component';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-tags',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProfilePage;
  tab2Root = LevelsPage;
  //tab3Root = ShopTabsPage;
  tab4Root = StatisticsPage;

  constructor(public navCtrl: NavController, private event: Events) {
      this.event.subscribe('LogOut',(data) => {
        this.navCtrl.push(MyApp);
      })
  }
  showShop(){
  	this.navCtrl.push(ShopTabsPage);
  }
}
