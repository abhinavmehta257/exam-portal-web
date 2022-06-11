import {
  QUESTION_DIFFICULT_FETCH_REQUEST,
  QUESTION_DIFFICULT_FETCH_SUCCESS,
  QUESTION_DIFFICULT_FETCH_ERROR,
} from "./questionDifficultiType";
import { BASE_URL } from "../../helper/common";

const axios = require("axios");

export const fetchDifficulType = () => {
  return function (dispatch) {
    dispatch({
      type: QUESTION_DIFFICULT_FETCH_REQUEST,
      loading: true,
    });
    var OPTIONS = {
      url: `${BASE_URL}/difficulty/list`,
      method: "get",

      headers: {
        "content-type": "application/json",
      },
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch({
          type: QUESTION_DIFFICULT_FETCH_SUCCESS,
          loading: false,
          result: res.data,
          msg: "",
          msgType: "success",
          fetchStatus: false,
        });
      })
      .catch((error) => {
        dispatch({
          type: QUESTION_DIFFICULT_FETCH_ERROR,
          loading: false,
          error: error,
        });
      });
  };
};
