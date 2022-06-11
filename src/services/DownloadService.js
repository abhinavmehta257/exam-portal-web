import Axios from '../helper/axios';
import { BASE_URL } from '../helper/common';

const axios = new Axios();

const API_URL = `${BASE_URL}/download`;

export default class DownloadService {

    static async listBooks(filters) {
        const option = {
            url: `${API_URL}/list`,
            timeout: 1000 * 60 * 60,
            data: {
                filters,
            }
        };
        return axios.post(option);

    }

    static async listDownloadSubjects() {
        const option = {
            url: `${API_URL}/subject/list`,
        };
        return axios.get(option);
    }

    static async listDownloadTypes() {
        const option = {
            url: `${API_URL}/type/list`,
        };
        return axios.get(option);
    }

    static async createSubject(title) {
        const option = {
            url: `${API_URL}/subject`,
            timeout: 1000 * 60 * 60,
            data: {
                title,
            }
        };
        return axios.post(option);
    }

    static async createExam(title, countries) {
        const option = {
            url: `${API_URL}/exam`,
            timeout: 1000 * 60 * 60,
            data: {
                title,
                countries
            }
        };
        return axios.post(option);
    }

    static async createType(title) {
        const option = {
            url: `${API_URL}/type`,
            timeout: 1000 * 60 * 60,
            data: {
                title,
            }
        };
        return axios.post(option);
    }

    static async listDownloadExams() {
        const option = {
            url: `${API_URL}/exam/list`,
        };
        return axios.get(option);
    }

    static async createBook(request) {
        const option = {
            url: `${API_URL}`,
            data: request,
            timeout: 1000 * 60 * 60,
            withCredentials: true,
        }
        return axios.upload(option);
    }
}