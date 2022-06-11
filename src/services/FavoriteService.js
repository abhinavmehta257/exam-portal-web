import Axios from '../helper/axios';
import { BASE_URL } from '../helper/common';

const axios = new Axios();
const API_URL = `${BASE_URL}/favourite`;
export default class FavoriteService {
    static async addToFavorite(id) {
        const option = {
            url: `${API_URL}`,
            data: {
                question: id
            },
            timeout: 1000 * 60 * 60,
            withCredentials: true,
        }
        return axios.post(option);
    }

    static async loadFavoriteQuestions(page = 1) {
        const option = {
            url: `${API_URL}?page=${page}`,
            timeout: 1000 * 60 * 60,
            withCredentials: true,
        };
        return axios.get(option);
    }

    static async deleteFavorite(id) {
        const option = {
            url: `${API_URL}/${id}`,
            timeout: 1000 * 60 * 60,
            withCredentials: true,
        };
        return axios.delete(option);
    }
}