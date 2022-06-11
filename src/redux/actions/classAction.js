import { CLASS_FETCH_SUCCESS, CLASS_FETCH_REQUEST, CLASS_FETCH_ERROR } from './classType';
import { BASE_URL } from '../../helper/common';

const axios = require("axios");
export const fetchClass = (countryCode) => {
    return function (dispatch) {
        dispatch({
            type: CLASS_FETCH_REQUEST,
            loading: true,
        });
        var OPTIONS = {
            url: `${BASE_URL}/class/filter/${countryCode}`,
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                dispatch({
                    type: CLASS_FETCH_SUCCESS,
                    loading: false,
                    result: res.data.result,
                    msg: res.data.msg,
                    msgType: res.data.msgType,
                    fetchStatus: false,
                });
            })
            .catch((error) => {
                dispatch({
                    type: CLASS_FETCH_ERROR,
                    loading: false,
                    error: error
                });
            });
    };
};
