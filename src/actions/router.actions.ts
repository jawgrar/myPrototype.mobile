import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';

@Injectable()
export class RouterActions {

	constructor(private ngRedux: NgRedux<IAppState>) { }

	static ROUTER_NAVIGATE: string = "ROUTER_NAVIGATE";

    /**
     * Action that dispath event to navigate to specified page.
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

}
