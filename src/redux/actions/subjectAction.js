import { SUBJECT_FETCH_SUCCESS, SUBJECT_FETCH_REQUEST, SUBJECT_FETCH_ERROR } from './subjectType';
import { BASE_URL } from '../../helper/common';
const axios = require("axios");

export const fetchSubject = () => {
    return function (dispatch) {
        dispatch({
            type: SUBJECT_FETCH_REQUEST,
            loading: true,
        });
        var OPTIONS = {
            url: `${BASE_URL}/subject/list`,
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                dispatch({
                    type: SUBJECT_FETCH_SUCCESS,
                    loading: false,
                    result: res.data,
                    msg: res.data.msg,
                    msgType: res.data.msgType,
                    fetchStatus: false,
                });
            })
            .catch((error) => {
                dispatch({
                    type: SUBJECT_FETCH_ERROR,
                    loading: false,
                    error: error
                });
            });
    };
};
