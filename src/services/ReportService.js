import Axios from '../helper/axios';
import { BASE_URL, dateWithTimeZone } from '../helper/common';
import moment from "moment-timezone";

const axios = new Axios();

export default class ReportService {
    static getMonthlyUsers(date) {
        const option = {
            url: `${BASE_URL}/reports/users?date=${moment(date).toISOString()}`,
        };
        return axios.get(option);
    }

    static getMonthlyMemberships(date) {
        const option = {
            url: `${BASE_URL}/reports/memberships?date=${moment(date).toISOString()}`,
        };
        return axios.get(option);
    }

    static getMonthlyEnrollments(date) {
        const option = {
            url: `${BASE_URL}/reports/enrollments?date=${moment(date).toISOString()}`,
        };
        return axios.get(option);
    }

    static getUsersLists(date, page) {
        const option = {
            url: `${BASE_URL}/reports/users/lists?date=${dateWithTimeZone(date)}&page=${page}`,
        };
        return axios.get(option);
    }

    static getMembershipUsers(date, page) {
        const option = {
            url: `${BASE_URL}/reports/membership/users?date=${dateWithTimeZone(date)}&page=${page}`,
        };
        return axios.get(option);
    }

    static getEnrollmentUsers(date, page) {
        const option = {
            url: `${BASE_URL}/reports/enrollments/users?date=${dateWithTimeZone(date)}&page=${page}`,
        };
        return axios.get(option);
    }

    static getAllPromoUsed(startDate, endDate) {
        const tmp = [];
        if (startDate) tmp.push("start=" + dateWithTimeZone(startDate));
        if (endDate) tmp.push("end=" + dateWithTimeZone(endDate));
        const option = {
            url: `${BASE_URL}/reports/enrollments/promos/all${tmp.length > 0 ? '?' : ''}${tmp.join("&")}`,
        };
        return axios.get(option);
    }
}