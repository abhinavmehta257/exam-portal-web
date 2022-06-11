import Axios from '../helper/axios';
import { BASE_URL, getCookie } from '../helper/common';

const axios = new Axios();

export default class QuestionService {
    static async startQuiz(params) {
        const option = {
            url: `${BASE_URL}/question/start`,
            timeout: 1000 * 60 * 60,
            data: params
        };
        return axios.post(option);
    }

    static async submitQuiz(params) {
        const option = {
            url: `${BASE_URL}/question/submit`,
            data: params,
            timeout: 1000 * 60 * 60,
            withCredentials: true,
            headers: {
                'x-id-token': getCookie('sc-question')
            }
        };
        return axios.post(option);
    }

    static async prevQuestion(params) {
        const option = {
            url: `${BASE_URL}/question/prev`,
            data: params,
            timeout: 1000 * 60 * 60,
            withCredentials: true,
            headers: {
                'x-id-token': getCookie('sc-question')
            }
        };
        return axios.post(option);
    }


    static async uploadQuestions(request) {
        const option = {
            url: `${BASE_URL}/question/format/upload`,
            data: request,
            timeout: 1000 * 60 * 60,
            withCredentials: true,
        }
        return axios.upload(option);
    }

    static async adminLoadQuestions(id, page) {
        const option = {
            url: `${BASE_URL}/question/list/${id}?page=${page}`
        };
        return axios.get(option);
    }

}
