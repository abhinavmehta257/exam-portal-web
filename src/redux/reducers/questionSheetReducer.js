// import { MdPendingActions } from 'react-icons/md';
import {
    QUESTION_FETCH_REQUEST,
    QUESTION_FETCH_SUCCESS,
    QUESTION_FETCH_ERROR,
    QUESTION_LOAD_REQUEST,
    QUESTION_LOAD_SUCCESS,
    QUESTION_LOAD_ERROR,
    QUESTION_NOTIFICATION,
} from '../actions/questionsType';

const intialState = {
    loading: false,
    loading1: false,
    loading2: false,
    fetchStatus: true,
    loadStatus: true,
    action: "Questions",
    questionData: [],
    startExamQuestionData: [],
    msg: "",
    msgType: "",
    error: "",
};

const questionsReducer = (state = intialState, action) => {
    switch (action.type) {
        // Fetch Assets
        case QUESTION_FETCH_REQUEST:
            return {
                ...state,
                loading: action.loading,
                fetchStatus: action.fetchStatus,
            };
        case QUESTION_FETCH_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                questionData: action.result,
                loadStatus: action.loadStatus,
                fetchStatus: action.fetchStatus,
                msg: action.msg,
                msgType: action.msgType
            };
        case QUESTION_FETCH_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
            };
        // Fetch Assets
        case QUESTION_LOAD_REQUEST:
            return {
                ...state,
                loading2: action.loading,
            };
        case QUESTION_LOAD_SUCCESS:
            return {
                ...state,
                loading2: action.loading,
                questionData: [...state.questionData, ...action.result],
                loadStatus: action.loadStatus,
                msg: action.msg,
                msgType: action.msgType
            };
        case QUESTION_LOAD_ERROR:
            return {
                ...state,
                loading2: action.loading,
                error: action.error,
            };
        case QUESTION_NOTIFICATION:
            return {
                ...state,
                msg: action.msg,
                msgType: action.msgType,
            };
        default:
            return state;
    }
};

export default questionsReducer;
