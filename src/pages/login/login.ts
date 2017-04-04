import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';
import { RouterActions } from "../../actions/router.actions";
import { select } from "@angular-redux/store";
import { subscribeToResult } from "rxjs/util/subscribeToResult";
import { Observable } from "rxjs";
import { UserActions } from "../../actions/user.actions";

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

    @select(store => store.user.state)
    private _onUserStateUpdated: Observable<string>;

    // Our translated text strings
    private loginErrorString: string;

    constructor(public navCtrl: NavController,
                public user: User,
                public toastCtrl: ToastController,
                public translateService: TranslateService,
                private _reduxRouterActions: RouterActions,
                private _userActions: UserActions) {

        this.translateService.get('LOGIN_ERROR').subscribe((value) => {
            this.loginErrorString = value;
        });

        // Subcribe to user state change event.
        this._onUserStateUpdated.subscribe(
            newState => {
                if (newState === "success")
                {
                    this.loginSuccess();
                }
                else if (newState === "error")
                {
                    // TODO: we can write error to another store field.
                    this.loginError();
                }
            }
        );
    }

    /**
     * Small method that preform logic when we successfully logged in.
     */
    private loginSuccess(): void {
        // TODO: main page const
        this._reduxRouterActions.navigate("tabs");
    }

    /**
     * Small method that preform logic when we got login error.
     */
    private loginError(): void {
        // Unable to log in
        let toast = this.toastCtrl.create({
            message: this.loginErrorString,
            duration: 3000,
            position: 'top'
        });

        toast.present();
    }

    /**
     * Method that initiate login procedure.
     */
    doLogin() {
        this._userActions.login(this.account.email, this.account.password);
    }
}
