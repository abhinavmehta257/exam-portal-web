import {
    LOGIN,
    LOGIN_FAILED,
    LOGIN_STARTED,
    NEW_LOGIN,
    REGISTRATION,
    REGISTRATION_FAILED,
    REGISTRATION_STARTED,
} from "../actions/UserActions";

const initialState = {
    name: "",
    isLoggedIn: false,
    profile: null,
    isLoading: false,
    isAdmin: false,
    isParent: false,
    error: "",
    createError: "",
    isCreated: false,
};

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case REGISTRATION_STARTED:
            return {
                ...state,
                isLoading: true,
                createError: "",
            };
        case LOGIN_STARTED:
            return {
                ...state,
                isLoading: true,
                error: "",
                isLoggedIn: false,
            };
        case REGISTRATION_FAILED:
            return {
                ...state,
                isLoading: false,
                createError: action.data,
            };
        case LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.data,
            };
        case REGISTRATION:
            return {
                ...state,
                isLoading: false,
                isCreated: true,
                createError: "",
            };
        case LOGIN:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                error: "",
                profile: action.data?.profile,
                isAdmin: action.data?.isAdmin,
                isParent: action.data?.isParent,
                name: action.data?.name,
            };
        case NEW_LOGIN:
            return initialState;
        default:
            return state;
    }
}
