import { Injectable } from '@angular/core';
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../store/index";
import { Http, Headers, RequestOptions, URLSearchParams  } from "@angular/http";

@Injectable()
export class UserActions {

    constructor(private _ngRedux: NgRedux<IAppState>,
                private _http: Http) {
    }

    // TODO: Move this to OpaqueToken!
    static API_URL: string = "http://localhost:5000/";

    static USER_LOGIN_START: string = "USER_LOGIN_START";
    static USER_LOGIN_SUCCESS: string = "USER_LOGIN_SUCCESS";

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

        var data = {
            username: username,
            password: password
        };

        //
        l body = new URLSearchParams();
        body.set

        // Create headers
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        // Now real login process.
        this._http.post(UserActions.API_URL + "api/token", data, options)
            .subscribe(
                result => {
                    debugger;

                    // Dispatch success event.
                    this._ngRedux.dispatch({
                        type: UserActions.USER_LOGIN_SUCCESS
                    });
                },
                error => {
                    debugger;
                }
            );
    }

}