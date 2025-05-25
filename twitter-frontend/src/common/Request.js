import axios from "axios";

export const authReq = axios.create({
    baseURL: "http://127.0.0.1:8080/api/auth/"
});

export const userReq = axios.create({
    baseURL: "http://127.0.0.1:8080/api/users"
});

export const tweetReq = axios.create({
    baseURL: "http://127.0.0.1:8080/api/tweets"
});

export const setAuthToken = (token) => {
    // Make sure this is the right way to set headers
    userReq.defaults.headers =  {
        Authorization: `Bearer ${token}`
    }
    tweetReq.defaults.headers =  {
        Authorization: `Bearer ${token}`
    }
    // console.log("Updated headers: ");
    // console.log(userReq.defaults.headers);
    // console.log(tweetReq.defaults.headers);
}