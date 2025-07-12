import { API_BASE_URL, ACCESS_TOKEN, REFRESH_TOKEN } from "./constants.js"

import axios from "axios";

async function refreshAccessToken() {
    let jwtToken = localStorage.getItem(REFRESH_TOKEN);
    await axios.get(`${API_BASE_URL}/auth/refresh`, { headers: { Authorization: "Bearer " + jwtToken, retry: true } }).then(response => { //MUST send with a 'retry' header marked as true, otherwise will trigger an infinite loop in the response interceptor
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
        localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
    }).catch(error => {
        console.log(error);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
    });
    console.log('Refreshed JWT');

}

axios.interceptors.request.use(
    function (config) { //Adds JWT stored in localStorage to the authorization headers of every request that does not explicitly set an authorization header
        let jwtToken = localStorage.getItem(ACCESS_TOKEN);
        if (jwtToken && !config.headers["Authorization"]) {
            config.headers["Authorization"] = "Bearer " + jwtToken;
        }
        return config;
    },
    async function (error) {
        return Promise.reject(error);
    }
);


axios.interceptors.response.use((response) => {
    return response;
}, async function (error) {
    const originalRequest = error.config;
    if (error.response) {
        if (error.response.status === 401) { //if response is 401 unauthorized
            if (!originalRequest.headers["retry"]) { //if we have not retried the request with a refreshed jwt
                originalRequest.headers["retry"] = true; //flag this upcoming request as a retry attempt
                await refreshAccessToken(); //attempt to refresh jwt using refresh token
                let newJwtToken = localStorage.getItem(ACCESS_TOKEN);
                originalRequest.headers["Authorization"] = "Bearer " + newJwtToken;
                return axios(originalRequest); //send original request again using a refreshed jwt. this request is flagged as a 'retry' attempt, in order to avoid an infinite loop.
            }
            localStorage.clear();
            window.location.href = window.location.origin + "/user/login/form"; //log the user out and redirect user to login page if a 401 error is returned after jwt refresh attempt. 
        }
    }

    return Promise.reject(error);
})