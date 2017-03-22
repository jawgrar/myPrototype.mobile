import { combineReducers } from 'redux';
import { IRouteData, routerReducer } from './router.reducer'

export interface IAppState {
	router?: IRouteData;
}

export const rootReducer = combineReducers<IAppState>({
	router: routerReducer,
});
