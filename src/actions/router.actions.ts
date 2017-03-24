import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';

@Injectable()
export class RouterActions {

	constructor(private ngRedux: NgRedux<IAppState>) { }

    static ROUTER_NAVIGATE: string = "ROUTER_NAVIGATE";
    static ROUTER_NAVIGATE_ROOT: string = "ROUTER_NAVIGATE_ROOT";

    /**
     * Action that dispatch event to navigate to specified page.
     * @param page
     * @param routeData
     */
	public navigate(page: string, routeData?: any) {
		this.ngRedux.dispatch({
			type: RouterActions.ROUTER_NAVIGATE,
			payload: {
				page: page,
				routeData: routeData
			}
		});
	}

    /**
     * Action that dispatch event to navigate to specified page as ROOT page
     * (hide back button and forget all previous stack)
     * @param page
     * @param routeData
     */
    public navigateRoot(page: string, routeData?: any)
    {
        this.ngRedux.dispatch({
            type: RouterActions.ROUTER_NAVIGATE_ROOT,
            payload: {
                page: page,
                routeData: routeData
            }
        })
    }

}
