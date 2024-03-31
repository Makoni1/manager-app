import React, { useEffect, useRef } from 'react';
import App from './App';
import { useAuth } from './hooks/auth.hook';
import { useDispatch, useSelector } from 'react-redux';
import { User } from './services';
import { setUserData } from './store/actions/userAction';

const AppContainer = () => {

    const { login, logout, token, checkDone } = useAuth();
    const isAuthenticated = !!token
    // const { login, logout, isAuthenticated, checkDone } = useAuth();
    const dispatch = useDispatch();
    // const { token } = useSelector((state) => state.refreshToken);
    useEffect(() => {
        let cancel = false;
        if (!token) {
            if (isAuthenticated) {
                User.get()
                    .then((response) => {
                        if (cancel) return;
                        dispatch(setUserData(response.data));
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                return () => (cancel = true);
            }
        }
    }, [dispatch, isAuthenticated, token]);

    // useRefreshAuth(isAuthenticated, true);

    return (
        <App
            checkDone={checkDone}
            login={login}
            logout={logout}
            isAuthenticated={isAuthenticated}
        />
    );
}

export default AppContainer