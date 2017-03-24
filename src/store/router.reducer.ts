import { IPayloadAction } from '../common/payload-action.class';
import { RouterActions } from '../actions/router.actions';
import { tassign } from 'tassign';
import { NavController } from "ionic-angular";

export interface IRouteData {
	page: string,
	routeData: any,
	nav?: NavController
}

const INITIAL_STATE: IRouteData = {
	page: "default",
	routeData: {},
};

export function routerReducer(state: IRouteData = INITIAL_STATE, action: IPayloadAction) {
	switch (action.type) {
		case RouterActions.ROUTER_NAVIGATE:
			return tassign(state, {
				page: action.payload.page,
				routeData: action.payload.routeData,
				nav: action.payload.nav
			} as IRouteData);
		default:
			return state;
	}
}
