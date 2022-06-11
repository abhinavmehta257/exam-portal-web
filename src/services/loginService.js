import Axios from '../helper/axios';
import { BASE_URL } from '../helper/common';

const axios = new Axios();

export default class LoginService {
  static async login(params) {
    const option = {
      url: `${BASE_URL}/user/login`,
      data: params,
      headers: {
        'Content-Type': 'application/json'
      },
    };
    return axios.post(option);
  }

  static async loginProfiles(params) {
    const option = {
      url: `${BASE_URL}/user/loginProfiles`,
      data: params,
      headers: {
        'Content-Type': 'application/json'
      },
    };
    return axios.post(option);
  }

  static async create(params) {
    const option = {
      url: `${BASE_URL}/user/signup`,
      data: params,
    };
    return axios.upload(option);
  }

  static async info() {
    const option = {
      url: `${BASE_URL}/user/info`,
    };
    return axios.get(option);
  }

  static async sendOtp(email) {
    const option = {
      url: `${BASE_URL}/user/otp`,
      data: { email }
    };
    return axios.post(option);
  }

  static async verifyOtp(email, otp) {
    const option = {
      url: `${BASE_URL}/user/verify/otp`,
      data: { email, otp }
    };
    return axios.post(option);
  }

  static async updatePassword(token, password) {
    const option = {
      url: `${BASE_URL}/user/password`,
      data: { token, password }
    };
    return axios.put(option);
  }

  // TODO: Move to New Service.
  static listStudents() {
    const option = {
      url: `${BASE_URL}/parent/students`,
    };
    return axios.get(option);
  }

  static createStudent(classID, password, name, dob = undefined, token = undefined) {
    let headers = undefined;
    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
      }
    }
    const option = {
      url: `${BASE_URL}/parent/student`,
      data: { classID, name, password, dob },
      headers
    };
    return axios.post(option);
  }
}