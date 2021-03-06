import { NgModule, ErrorHandler } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { CardsPage } from '../pages/cards/cards';
import { ContentPage } from '../pages/content/content';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { ListMasterPage } from '../pages/list-master/list-master';
import { ItemCreatePage } from '../pages/item-create/item-create';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { MenuPage } from '../pages/menu/menu';
import { SettingsPage } from '../pages/settings/settings';
import { SearchPage } from '../pages/search/search';

import { User } from '../providers/user';
import { Api } from '../providers/api';
import { Settings } from '../providers/settings';
import { Items } from '../mocks/providers/items';

// ============ Redux && Redux router ===============
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { rootReducer } from '../store/index';
import * as createLogger from 'redux-logger';
import { ReduxRouterService } from "../services/router.service";
import { RouterActions } from "../actions/router.actions";
import { ReduxRoutesToken } from "../common/tokens";
import { reduxRoutes } from "../common/pages";

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { UserActions } from "../actions/user.actions";
import { AuthConfig, AuthHttp } from "angular2-jwt";

// ====================================================================
// ====================== DEBUG MODE CONSTANT! ========================
// ====================================================================
const __DEBUG: boolean = true;
// TODO: this probably should be resolved by build environment: prov / dev.

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

export function provideSettings(storage: Storage) {
    /**
     * The Settings provider takes a set of default settings for your app.
     *
     * You can add new settings options at any time. Once the settings are saved,
     * these values will not overwrite the saved values (this can be done manually if desired).
     */
    return new Settings(storage, {
        option1: true,
        option2: 'Ionitron J. Framework',
        option3: '3',
        option4: 'Hello'
    });
}

/**
 * Basic factory of JWT AuthHTTP service
 * @param http
 * @param options
 * @returns {AuthHttp}
 */
function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig(), http, options);
}

/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
let pages = [
    MyApp,
    CardsPage,
    ContentPage,
    LoginPage,
    MapPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    WelcomePage,
    ListMasterPage,
    ItemDetailPage,
    ItemCreatePage,
    MenuPage,
    SettingsPage,
    SearchPage
];

export function declarations() {
    return pages;
}

export function entryComponents() {
    return pages;
}

export function providers() {
    return [
        User,
        Api,
        Items,

        { provide: Settings, useFactory: provideSettings, deps: [ Storage ] },
        // Keep this to enable Ionic's runtime error handling during development
        { provide: ErrorHandler, useClass: IonicErrorHandler },

        // Redux & Redux-Router
        { provide: ReduxRoutesToken, useValue: reduxRoutes },
        ReduxRouterService,

        // Redux Actions
        RouterActions,
        UserActions,

        // Angular2 jwt
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        }
    ];
}

@NgModule({
    declarations: declarations(),
    imports: [
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        NgReduxModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: entryComponents(),
    providers: providers()
})
export class AppModule {
    constructor(ngRedux: NgRedux<IAppState>,  devTools: DevToolsExtension) {

        // More about what enhancers is: https://github.com/reactjs/redux/blob/master/docs/Glossary.md#store-enhancer
        // PS: They probably never used by devs, because there is middelware enhancer that allow devs to write
        // "high level enhancers", which is simpler way to make some additions to store logic.
        let enhancers = [];

        // You probably only want to expose this tool in devMode.
        if (__DEBUG && devTools.isEnabled()) {
            enhancers = [ ...enhancers, devTools.enhancer() ];
        }

        ngRedux.configureStore(rootReducer, {}, [createLogger()], enhancers);
    }
}
