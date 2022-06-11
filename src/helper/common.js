import moment from "moment-timezone";

export const BASE_URL = "http://localhost:8080/api";
// export const BASE_URL = "/api";
export const IMAGE_URL = "http://localhost:8080/uploadFile/"; // Use CDN

// TODO: Use environment 

export function getCookie(cookiename) {
    // Get name followed by anything except a semicolon
    const cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
}


export function setToken(token) {
    const date = new Date();
    date.setTime(date.getTime() + 240 * 60 * 1000); // FIXME: 240mins
    document.cookie = `token=${token};expires=${date.toUTCString()};path=/`;
}

export function setPracticeToken(token) {
    const date = new Date();
    date.setTime(date.getTime() + 8 * 60 * 60 * 1000); // 8hrs 
    document.cookie = `sc-question=${token};expires=${date.toUTCString()};path=/`;
}


export function parseAxiosError(err) {
    let data = [];
    console.log(err);
    if (err.response) {
        // console.log(err.response.data);
        // console.log(err.response.status);
        // TODO: Fix Error.
        if (err.response.status === 401 && window.location.pathname !== '/') {
            // TODO: uncomment
            // const host = window.location.protocol + "//" + window.location.host;
            // window.location = host + '?out=1';
        }
        if (err.response.data.errors) {
            data = err.response.data.errors;
        } else if (err.response.data.error) {
            data = err.response.data.error;
        }
    }
    return data;
}

export function arrayError(callback) {
    if (!callback) return () => { };
    return (err) => {
        // console.log(err);
        callback(parseAxiosError(err));
    }
}

export function stringError(callback) {
    if (!callback) return () => { };
    return (err) => {
        // console.log(err);
        const data = parseAxiosError(err);
        callback(Array.isArray(data) ? data.join(' , ') : data);
    }
}

export function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export function toDictionary(array) {
    const tmp = {};
    array.forEach(ele => tmp[ele._id] = ele);
    return tmp;
}

export function dateWithTimeZone(date){ 
    return encodeURIComponent(moment(date).format());
}