import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';
import { RouterActions } from "../../actions/router.actions";
import { UserActions } from "../../actions/user.actions";
import { Observable } from "rxjs";
import { select } from "@angular-redux/store";

/*
 Generated class for the Signup page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {
    // The account fields for the login form.
    // If you're using the username field with or without email, make
    // sure to add it to the type
    account: { name: string, email: string, password: string } = {
        name: 'Test Human',
        email: 'test@example.com',
        password: 'test'
    };

    // Our translated text strings
    private signupErrorString: string;

    @select(store => store.user.state)
    private _onUserStateUpdated: Observable<string>;

    constructor(public navCtrl: NavController,
                public user: User,
                public toastCtrl: ToastController,
                public translateService: TranslateService,
                private _reduxRouterActions: RouterActions,
                private  _userActions: UserActions) {

        this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
            this.signupErrorString = value;
        });

        // Subcribe to user state change event.
        this._onUserStateUpdated.subscribe(
            newState => {
                if (newState === "register_success")
                {
                    this.registerSuccess();
                }
                else if (newState === "register_error")
                {
                    // TODO: we can write error to another store field.
                    this.registerError();
                }
            }
        );
    }

    doSignup() {
       this._userActions.register(this.account.email, this.account.password);
    }

    private registerError(): void {
        let toast = this.toastCtrl.create({
            message: this.signupErrorString,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    private registerSuccess(): void {
        this._reduxRouterActions.navigate("tabs");
    }
}
