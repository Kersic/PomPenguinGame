import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
//import { Keyboard } from '@ionic-native/keyboard';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { LoginPage } from '../pages/login/login';
import { Service } from '../services/penguin.service';
import { Coding } from '../services/coding.service';

//UNITY
//import { UnityLoader } from '../Unity/Build/UnityLoader.js';
//import { UnityProgress } from '../Unity/TemplateData/UnityProgress.js';
declare var UnityLoader;
declare var UnityProgress;

@Component({
  templateUrl: 'app.html',
  providers: [
       // ScreenOrientation
       Coding,
       Service
    ]
})
export class MyApp {
  rootPage:any = LoginPage;

  public static activeInstance: MyApp;
  public static UnityLoader: any;
  public static UnityProgress: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) { //, private screenOrientation: ScreenOrientation
    platform.ready().then(() => {
      MyApp.activeInstance = this;
      MyApp.UnityLoader = UnityLoader;
      MyApp.UnityProgress = UnityProgress;
    });

    /*platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //keyboard.disableScroll(false);
      statusBar.styleDefault();
      splashScreen.hide
      //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);      
   
     
        // OneSignal Code start:
        // Enable to debug issues:
        // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

        var notificationOpenedCallback = function(jsonData) {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        window["plugins"].OneSignal
          .startInit("a5557521-d176-4977-9ad0-c1d358c672e4", "607728633217")
          .handleNotificationOpened(notificationOpenedCallback)
          .endInit();

   });*/
  }
}

