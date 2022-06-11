import {
    LOGIN_PROFILE,
    LOGIN_PROFILE_STARTED,
    LOGIN_PROFILE_FAILED,
    LOGIN_ADD_PROFILE,
    LOGIN_HIDE_PROFILE,
    LOGIN_ADMIN
} from "../actions/LoginActions";
import { NEW_LOGIN } from "../actions/UserActions";

// Sample
const initialState = {
    profiles: [],
    error: '',
    token: '',
    selectedProfile: null,
    isLoading: false,
    showProfiles: false,
};

export default function LoginReducers(state = initialState, action) {
    switch (action.type) {
        case LOGIN_PROFILE_STARTED:
            return {
                ...state,
                isLoading: true
            }
        case LOGIN_PROFILE:
            return {
                ...state,
                isLoading: false,
                profiles: action.data?.profiles || [],
                selectedProfile: null,
                token: action.data?.token || '',
                showProfiles: true
            }
        case LOGIN_PROFILE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.data || ''
            }
        case LOGIN_ADD_PROFILE:
            return {
                ...state,
                profiles: state.profiles.concat(action.data || [])
            }
        case LOGIN_HIDE_PROFILE:
            return {
                ...state,
                showProfiles: false
            }
        case NEW_LOGIN:
            return initialState;
        case LOGIN_ADMIN:
            return initialState
        default:
            return state
    }
}