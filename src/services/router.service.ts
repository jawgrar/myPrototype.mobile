import { Injectable, Inject, forwardRef } from '@angular/core';
import { select } from '@angular-redux/store'
import { Observable } from 'rxjs/Observable';
import { IRouteData } from '../store/router.reducer';
import { NavController } from 'ionic-angular';
import { ReduxRoutesToken } from '../common/tokens';

/**
 *    Service that switch Ionic2 pages based on redux store state.
 *
 * @export
 * @class ReduxRouterService
 */
@Injectable()
export class ReduxRouterService {


    /**
     * Get the state of current page.
     *
     * @type {Observable<IRouteData>}
     * @memberOf ReduxRouterService
     */
    @select(state => state.router) router$: Observable<IRouteData>;

    /**
     * Current page that opened.
     *
     * @private
     * @type {string}
     * @memberOf ReduxRouterService
     */
    private _currentPage: string = 'default';

    /**
     * Array of available to navigate pages.
     * We get it from DI Opaque token, that passed inside main module.
     *
     * @private
     * @type {ReduxRoute[]}
     * @memberOf ReduxRouterService
     */
    private _pages: ReduxRoute[] = [];

    /**
     * Local link to main navigation.
     * Suddenly currently i don't found way to pass this parameter to store, because redux logger can't serialize it.
     * Due to serialize errors i had to make function which set this variable only once. This function should be called
     * from main page that contains main NavController.
     * TODO: found better way to pas NavController in Redux Action to strore and get it here from store instead keeping
     * local copy.
     *
     * @private
     * @type {NavController}
     * @memberOf ReduxRouterService
     */
    private _nav: NavController;

    constructor(@Inject(forwardRef(() => ReduxRoutesToken)) pages: ReduxRoute[]) {
        // Get and save list of available routes from DI (by the help of opaque token).
        this._pages = pages;

        // Subscribe to store change.
        this.router$.subscribe(result => this.onPageChanged(result));
    }

    /**
     * Main callback that process all page change logic.
     *
     * @private
     * @param {*} data
     *
     * @memberOf ReduxRouterService
     */
    private onPageChanged(data: IRouteData) {
        let found: boolean = false;

        this._pages.forEach(element => {
            // Found targeting route.
            if (element.name == data.page) {
                found = true;

                // TODO: This is probably is error. Sometimes we want to change page to same but with different params.
                if (this._currentPage == element.name) return;


                // Navigate to target page (in root or default mode)
				if (data.root)
                {
                    this._nav.setRoot(element.class, {data: data.routeData});
                }
                else
                {
                    this._nav.push(element.class, {data: data.routeData});
                }

                this._currentPage = element.name;
                return;
            }
        });

        // TODO: write logging tool.
        if (!found) {
            console.error("[ReduxRouter]=> Page not found: "
                + data.page);
        }
    }

    /**
     * Look at _nav
     *
     * @param {NavController} nav
     *
     * @memberOf ReduxRouterService
     */
    public setNav(nav: NavController) {
        this._nav = nav;
    }
}


/**
 * Class that represent one available to navigation page.
 * TODO: Move to separate file?
 * @export
 * @class VIReduxRouteConfig
 */
export class ReduxRoute {
    public name: string;
    public class: any;
}
