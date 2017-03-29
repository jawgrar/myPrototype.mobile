import { combineReducers } from 'redux';
import { IRouteData, routerReducer } from './router.reducer'
import { IUserData, userReducer } from "./user.reducer";

export interface IAppState {
	router?: IRouteData;
    user?: IUserData;
}

export const rootReducer = combineReducers<IAppState>({
	router: routerReducer,
    user: userReducer
});
