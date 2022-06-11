import { PRACTICE_SIDEBAR_START, PRACTICE_SIDEBAR_ERROR, PRACTICE_SIDEBAR_DONE, PRACTICE_UPDATE_TITLE } from '../actions/PracticeAction';

// Sample
const initialState = {
    isLoading: false,
    skills: [],
    error: '',
    difficulties: [],
    title: '',
};

export default function PracticeReducer(state = initialState, action) {
    switch (action.type) {
        case PRACTICE_SIDEBAR_START:
            return {
                ...state,
                isLoading: true,
                error: '',
                difficulties: action.data || []
            }
        case PRACTICE_SIDEBAR_DONE:
            return {
                ...state,
                isLoading: false,
                error: '',
                skills: action?.data || []
            }
        case PRACTICE_SIDEBAR_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action?.data || ''
            }
        case PRACTICE_UPDATE_TITLE:
            return {
                ...state,
                title: action?.data || ''
            }
        default:
            return state
    }
}