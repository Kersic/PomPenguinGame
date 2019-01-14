import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import {OnAfterViewInit} from 'angular/core';

import {MyApp} from "../../app/app.component";
//import { UnityLoader } from '../Unity/Build/UnityLoader.js';
//import { UnityProgress } from '../Unity/TemplateData/UnityProgress.js';

//declare const UnityLoader;
@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})

export class GamePage {
  public static activeInstance:GamePage;
  gameInstance: any;
  constructor( public navCtrl: NavController) {
    GamePage.activeInstance = this;

  }

  ionViewDidLoad() {
    var gameContainer = document.getElementById('gameContainer');
    console.log( "game container poiner: " + gameContainer);
    this.gameInstance = MyApp.UnityLoader.instantiate('gameContainer', "assets/unity/Build/PomPenguinWebGl.json", {onProgress: MyApp.UnityProgress});
  }
}

