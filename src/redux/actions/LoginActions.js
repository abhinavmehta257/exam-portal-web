import { setToken, stringError } from "../../helper/common";
import LoginService from "../../services/loginService";
import { userInformation } from "./UserActions";

export const LOGIN_PROFILE_STARTED = "LOGIN_PROFILE_STARTED";
export const LOGIN_PROFILE_FAILED = "LOGIN_PROFILE_FAILED";
export const LOGIN_PROFILE = "LOGIN_PROFILE";
export const LOGIN_ADD_PROFILE = "LOGIN_ADD_PROFILE";
export const LOGIN_HIDE_PROFILE = "LOGIN_HIDE_PROFILE";
export const LOGIN_ADMIN = "LOGIN_ADMIN";

export function loginProfiles(email, password) {
    return dispatch => {
        dispatch({ type: LOGIN_PROFILE_STARTED });
        LoginService.loginProfiles({
            email, password,
        })
            .then(({ data }) => {
                if (data.isAdmin) {
                    setToken(data.token);
                    dispatch(userInformation());
                } else {
                    dispatch({ type: LOGIN_PROFILE, data });
                }
                return Promise.resolve(true);
            })
            .catch(stringError(x => dispatch({
                type: LOGIN_PROFILE_FAILED,
                data: x
            })));
        return Promise.resolve(false);
    }
}

export function addProfile(profile) {
    return {
        type: LOGIN_ADD_PROFILE,
        data: profile ? [profile] : null
    };
}

export function hideProfile() {
    return {
        type: LOGIN_HIDE_PROFILE
    };
}