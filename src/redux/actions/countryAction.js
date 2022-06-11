import { COUNTRY_FETCH_SUCCESS, COUNTRY_FETCH_REQUEST, COUNTRY_FETCH_ERROR } from './countryType';
import { BASE_URL } from '../../helper/common';
const axios = require("axios");

export const fetchCountry = () => {
    return function (dispatch) {
        dispatch({
            type: COUNTRY_FETCH_REQUEST,
            loading: true,
        });
        var OPTIONS = {
            url: `${BASE_URL}/country/list`,
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                dispatch({
                    type: COUNTRY_FETCH_SUCCESS,
                    loading: false,
                    result: res.data,
                    msg: res.data.msg,
                    msgType: res.data.msgType,
                    fetchStatus: false,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COUNTRY_FETCH_ERROR,
                    loading: false,
                    error: error
                });
            });
    };
};
