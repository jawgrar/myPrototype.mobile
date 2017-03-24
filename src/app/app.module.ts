import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { rootReducer } from '../store/index';
import * as createLogger from 'redux-logger';
import { RouterService } from "../services/router.service";
import { RouterActions } from "../actions/router.actions";
import { PagesToken } from "../common/tokens";
import { pages } from "../common/pages";
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    NgReduxModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: PagesToken, useValue: pages },
    RouterActions,
    RouterService
  ]
})
export class AppModule {

    // Create redux store from rootReduser.
    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.configureStore(rootReducer, {}, [createLogger()]);
    }
}
