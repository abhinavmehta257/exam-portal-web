import Axios from '../helper/axios';
import { BASE_URL } from '../helper/common';

const axios = new Axios();
const API_URL = `${BASE_URL}/query`;
export default class UserHelpService {
    static async getMyQueries(page = 1) {
        const option = {
            url: `${API_URL}/my?page=${page}`,
            timeout: 1000 * 60 * 60,
            withCredentials: true,
        };
        return axios.get(option);
    }

    static async askQuery(message, questionId) {
        const option = {
            url: `${API_URL}`,
            data: {
                questionId,
                message
            },
            timeout: 1000 * 60 * 60,
            withCredentials: true,
        }
        return axios.post(option);
    }
    
    static async getCompleteQueries(id) {
        const option = {
            url: `${API_URL}/single/${id}`,
            timeout: 1000 * 60 * 60,
            withCredentials: true,
        };
        return axios.get(option);
    }
}