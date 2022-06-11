import {
  QUESTION_SKILL_FETCH_REQUEST,
  QUESTION_SKILL_FETCH_SUCCESS,
  QUESTION_SKILL_FETCH_ERROR,
} from "./skillType";
import { BASE_URL } from "../../helper/common";

const axios = require("axios");

export const fetchSkillType = () => {
  return function (dispatch) {
    dispatch({
      type: QUESTION_SKILL_FETCH_REQUEST,
      loading: true,
    });
    var OPTIONS = {
      url: `${BASE_URL}/skill/all`,
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch({
          type: QUESTION_SKILL_FETCH_SUCCESS,
          loading: false,
          result: res.data,
          msg: "",
          msgType: "",
          fetchStatus: false,
        });
      })
      .catch((error) => {
        dispatch({
          type: QUESTION_SKILL_FETCH_ERROR,
          loading: false,
          error: error,
        });
      });
  };
};
