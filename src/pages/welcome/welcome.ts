import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RouterActions } from "../../actions/router.actions";

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController,
              private _reduxRouterActions: RouterActions) {}

  login() {
      this._reduxRouterActions.navigate("login");
  }

  signup() {
      this._reduxRouterActions.navigate("signup");
  }
}
