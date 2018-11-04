import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ShopPenguinPage } from '../shop-penguin/shop-penguin';
import { ShopSledsPage } from '../shop-sleds/shop-sleds';
import { ShopSkisPage } from '../shop-skis/shop-skis';
import { ShopFlippersPage } from '../shop-flippers/shop-flippers';
//import { TabsPage } from '../tabs/tabs';
import { MainMenu} from '../mainMenu/mainMenu';

@Component({
  selector: 'page-shop-tabs',
  templateUrl: 'shop-tabs.html'
})
export class ShopTabsPage {

  tab1Root = ShopPenguinPage;
  tab2Root = ShopSledsPage;
  tab3Root = ShopSkisPage;
  tab4Root = ShopFlippersPage;

  constructor(public navCtrl: NavController, private event: Events) {
  	this.event.subscribe('mainMenu',(data) => {
  		this.ShowMainMenu();
  	})
  }


  ShowMainMenu(){
      this.navCtrl.push(MainMenu);
      this.event.unsubscribe('mainMenu');
    }

}
