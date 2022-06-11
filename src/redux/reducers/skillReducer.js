import {
  QUESTION_SKILL_FETCH_REQUEST,
  QUESTION_SKILL_FETCH_SUCCESS,
  QUESTION_SKILL_FETCH_ERROR,
} from "../actions/skillType";

const intialState = {
  loading: false,
  fetchStatus: true,
  action: "skill",
  skillData: [],
  msg: "",
  msgType: "",
  error: "",
};

const skillReducer = (state = intialState, action) => {
  switch (action.type) {
    case QUESTION_SKILL_FETCH_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case QUESTION_SKILL_FETCH_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        skillData: action.result,
        msg: action.msg,
      };
    case QUESTION_SKILL_FETCH_ERROR:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    default:
      return state;
  }
};

export default skillReducer;
