import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { configData } from "../services/api-config";
const storageName = 'authData';

export const useRefreshAuth = (authParamether, allowToAuth) => {
    const { token } = useSelector((state) => state.refreshToken);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!token) {
                if (authParamether) {
                    axios
                        .post(configData.BASE_URL+'api/v1/users/refresh-token', {
                            withCredentials: true
                        })
                        .then((response) => {
                            сonsole.log('REFRESH RESPONCE', response)
                            localStorage.setItem(
                                storageName,
                                JSON.stringify({
                                    token: response.data.token,
                                    isAuthenticated: allowToAuth
                                })
                            );
                            axios.defaults.headers.common[
                                'Authorization'
                            ] = `Bearer ${response.data.token}`;
                        });
                }
            }
        }, 30000);
        return () => clearInterval(intervalId);
    }, [token, authParamether]);
};
