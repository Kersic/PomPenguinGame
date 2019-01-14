var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { LevelsPage } from '../pages/levels/levels';
import { StatisticsPage } from '../pages/statistics/statistics';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { ShopPenguinPage } from '../pages/shop-penguin/shop-penguin';
import { ShopSledsPage } from '../pages/shop-sleds/shop-sleds';
import { ShopTabsPage } from '../pages/shop-tabs/shop-tabs';
import { ShopSkisPage } from '../pages/shop-skis/shop-skis';
import { ShopFlippersPage } from '../pages/shop-flippers/shop-flippers';
import { SimulatorPage } from '../pages/simulator/simulator';
import { MainMenu } from '../pages/mainMenu/mainMenu';
import { UserProfileEditeblePage } from '../pages/user-profile-editeble/user-profile-editeble';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                LevelsPage,
                StatisticsPage,
                LoginPage,
                SignupPage,
                ProfilePage,
                TabsPage,
                ShopPenguinPage,
                ShopSledsPage,
                ShopSkisPage,
                ShopFlippersPage,
                ShopTabsPage,
                SimulatorPage,
                MainMenu,
                UserProfilePage,
                UserProfileEditeblePage,
            ],
            imports: [
                BrowserModule,
                IonicModule.forRoot(MyApp),
                HttpModule,
                BrowserAnimationsModule,
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                LevelsPage,
                StatisticsPage,
                LoginPage,
                SignupPage,
                ProfilePage,
                TabsPage,
                ShopPenguinPage,
                ShopSledsPage,
                ShopSkisPage,
                ShopFlippersPage,
                ShopTabsPage,
                SimulatorPage,
                MainMenu,
                UserProfilePage,
                UserProfileEditeblePage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map
