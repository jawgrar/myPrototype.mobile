import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Settings } from '../providers/providers';

import { TranslateService } from 'ng2-translate/ng2-translate';
import { RouterActions } from "../actions/router.actions";
import { ReduxRouterService } from "../services/router.service";

import { FirstRunPage } from '../pages/pages';


@Component({
    template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp implements OnInit {
    rootPage = FirstRunPage;

    @ViewChild(Nav) nav: Nav;

    pages: any[] = [
        {title: 'Tutorial', name: 'tutorial'},
        {title: 'Welcome', name: 'welcome'},
        {title: 'Tabs', name: 'tabs'},
        {title: 'Cards', name: 'cards'},
        {title: 'Content', name: 'content'},
        {title: 'Login', name: 'login'},
        {title: 'Signup', name: 'signup'},
        {title: 'Map', name: 'map'},
        {title: 'Master Detail', name: 'master_detail'},
        {title: 'Menu', name: 'menu'},
        {title: 'Settings', name: 'settings',},
        {title: 'Search', name: 'search'}
    ];

    constructor(translate: TranslateService, platform: Platform, settings: Settings, config: Config,
                private _reduxRouterService: ReduxRouterService,
                private _reduxRouterActions: RouterActions) {
        console.log("HEELLOOOO!");

        // Set the default language for translation strings, and the current language.
        translate.setDefaultLang('en');
        translate.use('en');

        translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
            config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        });

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }

    ngOnInit(): void {
        // Pass navigation controller to our redux router (read detailed explanation inside ReduxRouterService)
        console.log(this.nav);
        this._reduxRouterService.setNav(this.nav);
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this._reduxRouterActions.navigateRoot(page.name);
    }
}
