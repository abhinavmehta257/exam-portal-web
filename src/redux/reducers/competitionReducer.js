import {
  COMPETITION_CREATE_SUCCESS,
  COMPETITION_CREATE_REQUEST,
  COMPETITION_CREATE_ERROR,
  COMPETITION_NOTIFICATION,
  COMPETITION_FETCH_ERROR,
  COMPETITION_FETCH_SUCCESS,
  COMPETITION_FETCH_REQUEST,
  COMPETITION_UPDATE_REQUEST,
  COMPETITION_UPDATE_SUCCESS,
  COMPETITION_UPDATE_ERROR,
  COMPETITION1_FETCH_REQUEST,
  COMPETITION1_FETCH_SUCCESS,
  COMPETITION1_FETCH_ERROR,
  COMPETITIONS_UPDATE_REQUEST,
  COMPETITIONS_UPDATE_SUCCESS,
  COMPETITIONS_UPDATE_ERROR,
  COMPETITIONS_DELETE_REQUEST,
  COMPETITIONS_DELETE_SUCCESS,
  COMPETITIONS_DELETE_ERROR,
  COMPETITION_STATUS_REQUEST,
  COMPETITION_STATUS_SUCCESS,
  COMPETITION_STATUS_ERROR,
  COMPETITION_RESULT_REQUEST,
  COMPETITION_RESULT_SUCCESS,
  COMPETITION_RESULT_ERROR
} from "../actions/competitionType";

const intialState = {
  status: false,
  loading: false,
  loadingUpdate: false,
  fetchStatus: true,
  action: "Competitions",
  competitionsData: [],
  count: "",
  perPage: "",
  post: "",
  msg: "",
  msgType: "",
  error: "",
};

const competitionReducer = (state = intialState, action) => {
  switch (action.type) {
    // Fetch Assets
    case COMPETITION_CREATE_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case COMPETITION_CREATE_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        competitionsData: action.result,
        msg: action.msg,
        msgType: action.msgType,
      };
    case COMPETITION_CREATE_ERROR:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    case COMPETITION_FETCH_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case COMPETITION_FETCH_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        competitionsData: action.result,
        count: action.count,
        perPage: action.perPage,
        msg: action.msg,
        msgType: action.msgType,
        fetchStatus: action.fetchStatus,
      };
    case COMPETITION_FETCH_ERROR:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };

    case COMPETITION1_FETCH_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case COMPETITION1_FETCH_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        competitionsData: action.result,
        msg: action.msg,
        msgType: action.msgType,
      };
    case COMPETITION1_FETCH_ERROR:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };

    case COMPETITION_NOTIFICATION:
      return {
        ...state,
        msg: action.msg,
        msgType: action.msgType,
      };
    case COMPETITION_UPDATE_REQUEST:
      return {
        ...state,
        loadingUpdate: action.loading,
      };
    case COMPETITION_UPDATE_SUCCESS:
      const filterData = state.competitionsData.filter((val) => {
        return val._id !== action.result._id;
      });
      return {
        ...state,
        loadingUpdate: action.loading,
        competitionsData: [action.result, ...filterData],
        msg: action.msg,
        msgType: action.msgType,
      };
    case COMPETITION_UPDATE_ERROR:
      return {
        ...state,
        loadingUpdate: action.loading,
        error: action.error,
      };

    case COMPETITIONS_UPDATE_REQUEST:
      return {
        ...state,
        loadingUpdate: action.loading,
      };
    case COMPETITIONS_UPDATE_SUCCESS:
      const updateData = state.competitionsData.filter(
        (val) => val._id !== action.result._id
      );
      // console.log(updateData);
      return {
        ...state,
        loadingUpdate: action.loading,
        competitionsData: [action.result, ...updateData],
        msg: action.msg,
        msgType: action.msgType,
      };
    case COMPETITIONS_UPDATE_ERROR:
      return {
        ...state,
        loadingUpdate: action.loading,
        error: action.error,
      };
    case COMPETITIONS_DELETE_REQUEST:
      return {
        ...state,
        loadingUpdate: action.loading,
      };
    case COMPETITIONS_DELETE_SUCCESS:
      const compData = state.competitionsData.filter(
        (val) => val._id !== action.result
      );
      return {
        ...state,
        loadingUpdate: action.loading,
        competitionsData: compData,
        msg: action.msg,
        msgType: action.msgType,
      };
    case COMPETITIONS_DELETE_ERROR:
      return {
        ...state,
        loadingUpdate: action.loading,
        error: action.error,
      };


    case COMPETITION_STATUS_REQUEST:
      return {
        ...state,
        loadingUpdate: action.loading,
      };
    case COMPETITION_STATUS_SUCCESS:
      const competitionUpdate = state.competitionsData.map(val => {
        if (val._id === action.result.id) {
          return { ...val, status: action.result.status }
        } else {
          return val
        }
      })
      // console.log(competitionUpdate);
      return {
        ...state,
        loadingUpdate: action.loading,
        competitionsData: competitionUpdate,
        msg: action.msg,
        msgType: action.msgType,
      };
    case COMPETITION_STATUS_ERROR:
      return {
        ...state,
        loadingUpdate: action.loading,
        error: action.error,
      };

    case COMPETITION_RESULT_REQUEST:
      return {
        ...state,
        loadingUpdate: true,
      }
    case COMPETITION_RESULT_SUCCESS:
      return {
        ...state,
        loadingUpdate: false,
        competitionsData: state.competitionsData
          .map(ele => (ele._id === action.id) ? ({ ...ele, resultOut: !ele.resultOut }) : ele),

      }
    case COMPETITION_RESULT_ERROR:
      return {
        ...state,
        loadingUpdate: false,
        msg: action.msg,
        msgType: "error"
      }
    default:
      return state;
  }
};

export default competitionReducer;
