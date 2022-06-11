import { getCookie } from "./common";

const axios = require("axios");
axios.defaults.withCredentials = true;

export default class Axios {
  get(options) {
    options.method = "get";
    options.headers = options.headers ? options.headers : this.getHeaders();
    return new Promise((resolve, reject) => {
      axios(options)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  post(options) {
    options.method = "POST";
    options.headers = options.headers ? options.headers : this.getHeaders();
    // options.timeout = 1000 * 500;
    options.headers["content-type"] = "application/json";
    return new Promise((resolve, reject) => {
      axios(options)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  upload(options) {
    options.method = "POST";
    if (!options.headers) {
      options.headers = {};
    }
    options.headers = {
      ...(options.headers),
      ...(this.getHeaders()),
      'content-type': "multipart/form-data"
    };

    return new Promise((resolve, reject) => {
      axios(options)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  patch(options) {
    options.method = "PATCH";
    options.headers = options.headers ? options.headers : this.getHeaders();
    // options.timeout = 1000 * 500;
    options.headers["content-type"] = "application/json";
    return axios(options);
  }

  put(options) {
    options.method = "PUT";
    options.headers = options.headers ? options.headers : this.getHeaders();
    // options.timeout = 1000 * 500;
    options.headers["content-type"] = "application/json";
    return new Promise((resolve, reject) => {
      axios(options)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  delete(options) {
    options.method = "DELETE";
    options.headers = this.getHeaders();
    return new Promise((resolve, reject) => {
      axios(options)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getHeaders() {
    return {
      Authorization: `Bearer ${getCookie('token')}`,
    };
  }
}

// module.exports = axios1;
