import { IPayloadAction } from '../common/payload-action.class';
import { UserActions } from "../actions/user.actions";
import { tassign } from "tassign";

export interface IUserData {
    name: string;
    state: string;
}

const INITIAL_STATE: IUserData = {
    name: "",
    state: ""
};

export function userReducer(state: IUserData = INITIAL_STATE, action: IPayloadAction) {
    switch (action.type) {
        case UserActions.USER_LOGIN_START:
            return tassign(state, {
                state: "in_process"
            });

        case UserActions.USER_LOGIN_SUCCESS:
            return tassign(state, {
                state: "success"
            });

        case UserActions.USER_LOGIN_ERROR:
            return tassign(state, {
                state: "error"
            });

        default:
            return state;
    }
}
