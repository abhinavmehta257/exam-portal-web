import { FAVORITE_FETCH, FAVORITE_FETCH_ERROR, FAVORITE_FETCH_START, FAVORITE_REMOVE } from "../actions/FavoriteActions";

// Sample
const initialState = {
    isLoading: false,
    questions: [],
    end: false,
    page: 0,
    maxPage: 0,
    error: '',
};

export default function FavoriteReducer(state = initialState, action) {
    switch (action.type) {
        case FAVORITE_FETCH_START:
            return {
                ...state,
                isLoading: true,
                maxPage: state.maxPage < action.data,
                page: action.data
            }
        case FAVORITE_FETCH:
            return {
                ...state,
                isLoading: false,
                questions: state.questions.concat(action.data || [])
            }
        case FAVORITE_FETCH_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.data
            }
        case FAVORITE_REMOVE:
            return {
                ...state,
                questions: state.questions.filter((ele) => ele._id !== action.data)
            }
        default:
            return state
    }
}