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
    static API_URL: string = "http://localhost:52712/";

    static USER_LOGIN_START: string = "USER_LOGIN_START";
    static USER_LOGIN_SUCCESS: string = "USER_LOGIN_SUCCESS";
    static USER_LOGIN_ERROR: string = "USER_LOGIN_ERROR";

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

                    // test call api
                    this._auth.get(UserActions.API_URL + "api/me")
                        .subscribe(
                            result => {
                                debugger;
                            },
                            error => {
                                debugger;
                            }
                        );
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

}