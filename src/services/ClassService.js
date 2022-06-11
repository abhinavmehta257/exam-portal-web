import Axios from '../helper/axios';
import { BASE_URL } from '../helper/common';

const axios = new Axios();

export default class ClassService {
    static async listClassesAuth(token = undefined) {
        let headers = undefined;
        if (token) {
            headers = {
                Authorization: `Bearer ${token}`,
            }
        }
        const option = {
            url: `${BASE_URL}/class/list`,
            headers
        };
        return axios.get(option);
    }

    static async listDifficulty() {
        const option = {
            url: `${BASE_URL}/difficulty/list`,
        };
        return axios.get(option);
    }

    static async listSubjects() {
        const option = {
            url: `${BASE_URL}/subject/list`,
        };
        return axios.get(option);
    }

    static async listSkills(subjects = []) {
        const option = {
            url: `${BASE_URL}/skill/list?subject=${subjects.join(',')}`,
        };
        return axios.get(option);
    }


    static async listSkillsSubtopic(subjects) {
        const option = {
            url: `${BASE_URL}/skill/list/subtopics?subjects=${subjects.join(',')}`,
        };
        return axios.get(option);
    }

    static async listCountries() {
        const option = {
            url: `${BASE_URL}/country/list`,
        };
        return axios.get(option);
    }

    static async listFormats() {
        const option = {
            url: `${BASE_URL}/question/format/list`,
        };
        return axios.get(option);
    }


    static async listClasses() {
        const option = {
            url: `${BASE_URL}/class/all/list`,
        };
        return axios.get(option);
    }

    static async addSubject(title, classes) {
        const option = {
            url: `${BASE_URL}/subject`,
            timeout: 1000 * 60 * 60,
            data: {
                title,
                classes
            }
        };
        return axios.post(option);
    }

    static async addSkill(subjectId, title, classes) {
        const option = {
            url: `${BASE_URL}/skill/${subjectId}`,
            timeout: 1000 * 60 * 60,
            data: {
                title,
                classes
            }
        };
        return axios.post(option);
    }

    static async addSubtopic(skillId, title, classes) {
        const option = {
            url: `${BASE_URL}/subtopic/${skillId}`,
            timeout: 1000 * 60 * 60,
            data: {
                title,
                classes
            }
        };
        return axios.post(option);
    }

    static async deleteSubject(id) {
        const option = {
            url: `${BASE_URL}/subject/${id}`,
            timeout: 1000 * 60 * 60,
        };
        return axios.delete(option);
    }
    static async deleteSkill(id) {
        const option = {
            url: `${BASE_URL}/skill/${id}`,
            timeout: 1000 * 60 * 60,
        };
        return axios.delete(option);
    }
    static async deleteSubtopic(id) {
        const option = {
            url: `${BASE_URL}/subtopic/${id}`,
            timeout: 1000 * 60 * 60,
        };
        return axios.delete(option);
    }
}