import { parseAxiosError, setToken } from "../../helper/common";
import LoginService from "../../services/loginService";

export const LOGIN_STARTED = "LOGIN_STARTED";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const NEW_LOGIN = "NEW_LOGIN";

export const REGISTRATION_STARTED = "REGISTRATION_STARTED";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";
export const REGISTRATION = "REGISTRATION";

export function userInformation() {
    return (dispatch) => {
        dispatch({ type: LOGIN_STARTED });
        LoginService
            .info()
            .then(data => dispatch({ type: LOGIN, data }))
            .catch((err) => {
                if (err.response?.status === 401) {
                    dispatch({ type: NEW_LOGIN });
                } else {
                    // console.log(err);
                    dispatch({ type: LOGIN_FAILED, data: parseAxiosError(err) });
                }
            });
    };
}

export function userLogin(id, password) {
    return (dispatch) => {
        dispatch({ type: LOGIN_STARTED });
        LoginService.login({ id, password })
            .then(({ data }) => {
                setToken(data.token);
                dispatch(userInformation());
            })
            .catch((err) => {
                // console.log(err);
                // console.log(err.response);
                dispatch({ type: LOGIN_FAILED, data: parseAxiosError(err) });
            });
    };
}

export function userRegistration(
    noEmail,
    name,
    email,
    phone,
    password,
    country
) {
    return (dispatch) => {
        dispatch({ type: REGISTRATION_STARTED });
        const request = new FormData();
        request.append("noEmail", noEmail);
        request.append("password", password);
        request.append("country", country);
        request.append("name", name);
        if (email) {
            request.append("email", email);
        }
        if (phone) {
            request.append("phone", phone);
        }

        return new Promise((res, _) => {
            LoginService.create(request)
                .then((_) => {
                    dispatch({ type: REGISTRATION });
                    res(true);
                })
                .catch((err) => {
                    dispatch({ type: REGISTRATION_FAILED, data: parseAxiosError(err) });
                    res(false);
                });
        });
    };
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}

export function logoutUser() {
    return dispatch => {
        deleteAllCookies();
        dispatch({ type: NEW_LOGIN });
        return Promise.resolve();
    };
}