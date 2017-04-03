import { Injectable } from '@angular/core';
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../store/index";
import { Http, Headers, RequestOptions, URLSearchParams  } from "@angular/http";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class UserActions {

    constructor(private _ngRedux: NgRedux<IAppState>,
                private _http: Http,
                private _auth: AuthHttp) {
    }

    // TODO: Move this to OpaqueToken!
    static API_URL: string = "http://localhost:5000/";

    static USER_LOGIN_START: string = "USER_LOGIN_START";
    static USER_LOGIN_SUCCESS: string = "USER_LOGIN_SUCCESS";
    static USER_LOGIN_ERROR: string = "USER_LOGIN_ERROR";

    static USER_REGISTER_START: string = "USER_REGISTER_START";
    static USER_REGISTER_SUCCESS: string = "USER_REGISTER_SUCCESS";
    static USER_REGISTER_ERROR: string = "USER_REGISTER_ERROR";

    /**
     * Method that takes login and password and tries to auth.
     * @param username
     * @param password
     */
    public login(username: string,  password: string): void {

        // First dispatch event that indicate start of login process.
        this._ngRedux.dispatch({
            type: UserActions.USER_LOGIN_START
        });

        // Encode form to body.
        let body = new URLSearchParams();
        body.set("username", username);
        body.set("password", password);

        // Create headers
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        // Now real login process.
        this._http.post(UserActions.API_URL + "api/token", body, options)
            .subscribe(
                result => {
                    // Parse json
                    let data = result.json();

                    // Save JWT token
                    localStorage.setItem("id_token", data.access_token);

                    // Dispatch success event.
                    this._ngRedux.dispatch({
                        type: UserActions.USER_LOGIN_SUCCESS
                    });
                },
                error => {
                    // Dispatch error event.
                    // TODO: add error details!
                    this._ngRedux.dispatch({
                        type: UserActions.USER_LOGIN_ERROR
                    });
                }
            );
    }

    public register(email: string,  password: string): void {
        // First of all dispatch register started event.
        // This allows us to show some loader or etc.
        this._ngRedux.dispatch({
            type: UserActions.USER_REGISTER_START
        });

        // Now create request form
        let body = new URLSearchParams();
        body.set("Email", email);
        body.set("Password", password);
        body.set("ConfirmPassword", password);

        // Now make request to backend.
        // Now real login process.
        this._http.post(UserActions.API_URL + "api/user/CreateAccount", body)
            .subscribe(
                result => {
                    debugger;
                    // If everything okay then run login procedure.
                    this._ngRedux.dispatch({
                        type: UserActions.USER_REGISTER_SUCCESS
                    });

                    // Now log-in user.
                    this.login(email, password);
                },
                error => {
                    // Dispatch error event.
                    // TODO: add error details!
                    this._ngRedux.dispatch({
                        type: UserActions.USER_REGISTER_ERROR
                    });
                }
            );
    }

}