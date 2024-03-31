import axios from 'axios';
import { configData } from "./api-config";
import store from '../store';
import {setRefreshToken} from '../store/actions/refreshTokenAction';

const storageName = 'authData';

const apiClient = axios.create({
    baseURL: configData.BASE_URL+'api/'          //'https://server.biny.co/api/'
});

// const apiClient = axios.info({
//     baseURL: 'http://test-server.biny.co/api/'          //'https://server.biny.co/api/'
// });

apiClient.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem('authData') || '{}').token;
        return {
            ...config,
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const request = error.config;
        if (!request.url.includes('login') && !request.url.includes('session') && error.response) {
            const state = store.getState();
            if (error.response.status === 401 && request && !state.refreshToken.token) {
                store.dispatch(setRefreshToken(true));
                axios
                    .post(configData.BASE_URL+'api/v1/users/refresh-token', null, {
                        withCredentials: true
                    })
                    .then((response) => {
                        console.log('refresh response => ', response);
                        localStorage.setItem(
                            storageName,
                            JSON.stringify({token: response.data.token, isAuthenticated: true})
                        );
                        request.headers.Authorization = `Bearer ${response.data.token}`;
                        axios.defaults.headers.common[
                            'Authorization'
                            ] = `Bearer ${response.data.token}`;
                        store.dispatch(setRefreshToken(false));
                        return axios.request(request);
                    })
                    .catch((error) => {
                        if (error.response?.status === 401 && !window.location.search.includes("?unauthorized=")) {
                          store.dispatch(setRefreshToken(false));
                          localStorage.clear();
                          window.location.href = '/login?unauthorized=1';
                        }
                    });
            }
        }
        return Promise.reject(error?.response?.data || error);
    }
);

const {get, post, put, delete: destroy} = apiClient;
export {get, post, put, destroy};
