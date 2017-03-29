import { IPayloadAction } from '../common/payload-action.class';
import { RouterActions } from '../actions/router.actions';
import { tassign } from 'tassign';
import { NavController } from "ionic-angular";

export interface IRouteData {
    page: string,
    routeData: any,
    root: boolean,
    nav?: NavController
    options?: any
}

const INITIAL_STATE: IRouteData = {
    page: "default",
    routeData: {},
    root: false
};

export function routerReducer(state: IRouteData = INITIAL_STATE, action: IPayloadAction) {
    switch (action.type) {
        case RouterActions.ROUTER_NAVIGATE:
            return tassign(state, {
                page: action.payload.page,
                routeData: action.payload.routeData,
                nav: action.payload.nav,
                options: action.payload.options,
                root: false
            } as IRouteData);

        case RouterActions.ROUTER_NAVIGATE_ROOT:
            return tassign(state, {
                page: action.payload.page,
                routeData: action.payload.routeData,
                root: true,
                options: action.payload.options,
                nav: action.payload.nav
            } as IRouteData);

        default:
            return state;
    }
}
