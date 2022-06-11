import {
    QUESTION_FETCH_REQUEST,
    QUESTION_FETCH_SUCCESS,
    QUESTION_FETCH_ERROR,
    QUESTION_LOAD_REQUEST,
    QUESTION_LOAD_SUCCESS,
    QUESTION_LOAD_ERROR,
} from './questionsType';
import { BASE_URL} from '../../helper/common';

const axios = require("axios");
export const fetchQuestion = (countryId, classId, subjectId, difficultId, skillId, length) => {
    return function (dispatch) {
        dispatch({
            type: QUESTION_FETCH_REQUEST,
            loading: true,
            loadStatus: true,
        });
        var OPTIONS = {
            url: `${BASE_URL}/question/`,
            method: "post",
            data: {
                countryId, classId, subjectId, difficultId, skillId, length
            },
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                dispatch({
                    type: QUESTION_FETCH_SUCCESS,
                    loading: false,
                    result: res.data.result,
                    msg: res.data.msg,
                    msgType: res.data.msgType,
                    loadStatus: res.data.loadStatus,
                    fetchStatus: false,
                });
            })
            .catch((error) => {
                dispatch({
                    type: QUESTION_FETCH_ERROR,
                    loading: false,
                    error: error
                });
            });
    };
};



export const loadMoreQuestion = (countryId, classId, subjectId, difficultId, skillId, length) => {
    // console.log(countryId, classId, subjectId, difficultId, skillId, length);
    return function (dispatch) {
        dispatch({
            type: QUESTION_LOAD_REQUEST,
            loading: true,
        });
        var OPTIONS = {
            url: `${BASE_URL}/question/`,
            method: "post",
            data: {
                countryId, classId, subjectId, difficultId, skillId, length
            },
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                dispatch({
                    type: QUESTION_LOAD_SUCCESS,
                    loading: false,
                    result: res.data.result,
                    msg: res.data.msg,
                    msgType: res.data.msgType,
                    loadStatus: res.data.loadStatus,
                });
            })
            .catch((error) => {
                dispatch({
                    type: QUESTION_LOAD_ERROR,
                    loading: false,
                    error: error
                });
            });
    };
};
