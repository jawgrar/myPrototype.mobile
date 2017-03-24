import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';
import { RouterActions } from "../../actions/router.actions";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    // The account fields for the login form.
    // If you're using the username field with or without email, make
    // sure to add it to the type
    account: { email: string, password: string } = {
        email: 'test@example.com',
        password: 'test'
    };

    // Our translated text strings
    private loginErrorString: string;

    constructor(public navCtrl: NavController,
                public user: User,
                public toastCtrl: ToastController,
                public translateService: TranslateService,
                private _reduxRouterActions: RouterActions) {

        this.translateService.get('LOGIN_ERROR').subscribe((value) => {
            this.loginErrorString = value;
        })
    }

    // Attempt to login in through our User service
    doLogin() {
        this.user.login(this.account).subscribe((resp) => {
            // TODO: main page const
            this._reduxRouterActions.navigate("tabs");
        }, (err) => {
            this._reduxRouterActions.navigate("tabs");

            // Unable to log in
            let toast = this.toastCtrl.create({
                message: this.loginErrorString,
                duration: 3000,
                position: 'top'
            });
            
            toast.present();
        });
    }
}
