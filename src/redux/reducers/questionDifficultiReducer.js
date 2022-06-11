import {
  QUESTION_DIFFICULT_FETCH_REQUEST,
  QUESTION_DIFFICULT_FETCH_SUCCESS,
  QUESTION_DIFFICULT_FETCH_ERROR,
} from "../actions/questionDifficultiType";

const intialState = {
  loading: false,
  fetchStatus: true,
  action: "Questions",
  difficultData: [],
  msg: "",
  msgType: "",
  error: "",
};

const questionDifficulitiReducer = (state = intialState, action) => {
  switch (action.type) {
    // Fetch Assets

    case QUESTION_DIFFICULT_FETCH_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case QUESTION_DIFFICULT_FETCH_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        difficultData: action.result,
        msg: action.msg,
      };
    case QUESTION_DIFFICULT_FETCH_ERROR:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    default:
      return state;
  }
};

export default questionDifficulitiReducer;
