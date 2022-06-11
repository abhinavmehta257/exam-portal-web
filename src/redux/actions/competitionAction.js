import {
  COMPETITION_UPDATE_REQUEST,
  COMPETITION_UPDATE_SUCCESS,
  COMPETITION_UPDATE_ERROR,
  COMPETITION_CREATE_ERROR,
  COMPETITION_CREATE_REQUEST,
  COMPETITION_CREATE_SUCCESS,
  COMPETITION_FETCH_REQUEST,
  COMPETITION_FETCH_SUCCESS,
  COMPETITION_FETCH_ERROR,
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
  COMPETITION_RESULT_ERROR,
  COMPETITION_RESULT_SUCCESS
} from "./competitionType";
import { BASE_URL, getCookie, parseAxiosError } from "../../helper/common";
import CompetitionService from "../../services/CompetitionService";

const axios = require("axios");
export const createCompetitions = (data) => {
  return function (dispatch) {
    dispatch({
      type: COMPETITION_CREATE_REQUEST,
      loading: true,
    });
    var OPTIONS = {
      url: `${BASE_URL}/competition/`,
      method: "post",
      data,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${getCookie('token')}`,
      },
      credential: true
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch({
          type: COMPETITION_CREATE_SUCCESS,
          loading: false,
          result: res.data.result,
          msg: res.data.msg,
          msgType: res.data.msgType,
          fetchStatus: false,
        });
      })
      .catch((error) => {
        dispatch({
          type: COMPETITION_CREATE_ERROR,
          loading: false,
          error: error,
        });
      });
  };
};

export const fetchCompetitions = (page) => {
  return function (dispatch) {
    dispatch({
      type: COMPETITION_FETCH_REQUEST,
      loading: true,
    });
    var OPTIONS = {
      url: `${BASE_URL}/competition?page=${page}`,
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch({
          type: COMPETITION_FETCH_SUCCESS,
          loading: false,
          result: res.data.result,
          count: res.data.count,
          perPage: res.data.perPage,
          msg: res.data.msg,
          msgType: res.data.msgType,
          fetchStatus: true,
        });
      })
      .catch((error) => {
        dispatch({
          type: COMPETITION_FETCH_ERROR,
          loading: false,
          error: error,
        });
      });
  };
};

export const updateCompetitions = (competitionId, chooseQues) => {
  return function (dispatch) {
    dispatch({
      type: COMPETITION_UPDATE_REQUEST,
      loading: true,
    });
    var OPTIONS = {
      url: `${BASE_URL}/competition/`,
      method: "patch",
      data: {
        competitionId,
        chooseQues,
      },
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${getCookie('token')}`,
      },
      credential: true
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch({
          type: COMPETITION_UPDATE_SUCCESS,
          loading: false,
          result: res.data.result,
          msg: res.data.msg,
          msgType: res.data.msgType,
        });
      })
      .catch((error) => {
        dispatch({
          type: COMPETITION_UPDATE_ERROR,
          loading: false,
          error: error,
        });
      });
  };
};

export const fetchCompetition = (id) => {
  return function (dispatch) {
    dispatch({
      type: COMPETITION1_FETCH_REQUEST,
      loading: true,
    });
    var OPTIONS = {
      url: `${BASE_URL}/competition/fetchCompetitionById/${id}`,
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${getCookie('token')}`,
      },
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch({
          type: COMPETITION1_FETCH_SUCCESS,
          loading: false,
          result: res.data.result,
          msg: res.data.msg,
          msgType: res.data.msgType,
        });
      })
      .catch((error) => {
        dispatch({
          type: COMPETITION1_FETCH_ERROR,
          loading: false,
          error: error,
        });
      });
  };
};

export const updateCompetition = (updatedData) => {
  return function (dispatch) {
    dispatch({
      type: COMPETITIONS_UPDATE_REQUEST,
      loading: true,
    });
    var OPTIONS = {
      url: `${BASE_URL}/competition/updateCompetitions`,
      method: "post",
      data: {
        updatedData,
      },
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${getCookie('token')}`,
      },
      credential: true
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch({
          type: COMPETITIONS_UPDATE_SUCCESS,
          loading: false,
          result: res.data.result[0],
          msg: res.data.msg,
          msgType: res.data.msgType,
        });
        // console.log(res.data.result);
      })
      .catch((error) => {
        // console.log(error);
        dispatch({
          type: COMPETITIONS_UPDATE_ERROR,
          loading: false,
          error: error,
        });
      });
  };
};

export const deleteCompetitions = (id) => {
  return function (dispatch) {
    dispatch({
      type: COMPETITIONS_DELETE_REQUEST,
      loading: true,
    });
    var OPTIONS = {
      url: `${BASE_URL}/competition/deleteCompetitions/${id}`,
      method: "delete",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${getCookie('token')}`,
      },
      credential: true
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch({
          type: COMPETITIONS_DELETE_SUCCESS,
          loading: false,
          result: res.data.id,
          msg: res.data.msg,
          msgType: res.data.msgType,
        });
        // console.log(res);
      })
      .catch((error) => {
        dispatch({
          type: COMPETITIONS_DELETE_ERROR,
          loading: false,
          error: error,
        });
      });
  };
};


export const competitionStatus = (id, status) => {
  return function (dispatch) {
    dispatch({
      type: COMPETITION_STATUS_REQUEST,
      loading: true,
    });
    var OPTIONS = {
      url: `${BASE_URL}/competition/competitionstatus/${id}/${status}`,
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${getCookie('token')}`,
      },
      Credential: true
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch({
          type: COMPETITION_STATUS_SUCCESS,
          loading: false,
          result: res.data.result,
          msg: res.data.msg,
          msgType: res.data.msgType,
        });
      })
      .catch((error) => {
        dispatch({
          type: COMPETITION_STATUS_ERROR,
          loading: false,
          error: error,
        });
      });
  };
};

/**
 * Update the Result of Competition.
 * @param {bool} resultOut Boolean Variable to Specify if Result is Out or not.
 * @param {String} id Competition ID.
 */
export function updateResult(resultOut, id) {
  return dispatch => {
    dispatch({ type: COMPETITION_RESULT_REQUEST });
    CompetitionService.updateResult(id, resultOut)
      .then(() => {
        dispatch({ type: COMPETITION_RESULT_SUCCESS, id });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: COMPETITION_RESULT_ERROR, msg: parseAxiosError(err) });
      });
  }
}