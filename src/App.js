import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter, Link} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {routes} from "./router";
import { AuthContext } from './context/auth.context';
import { setUserData } from './store/actions/userAction';
import { User } from './services';
import RouterCombiner from "./router/routeCombiner";
import PrivateRoute from "./router/PrivateRoute";

import Banners from "./components/banners";

import './assets/styles/global.scss';
import {useAmplitude} from "./hooks/useAmplitude";
import LocationProvider from "./router/LocationProvider";
import YandexMetrikaCounter from "./components/shared/yandex-metrics/YandexMetrikaCounter";
import ToolsIcon from './components/shared/icons/ToolsIcon';

const BLOCK_LIST = [] // "daniyar.tuyakov@gorilla-asia.kz"
function App({ login, logout, isAuthenticated, checkDone }) {
    const dispatch = useDispatch();
    const { amplitude } = useAmplitude();
    const [isBanUser, setBannedUser] = useState(false)
    const [user, setUser] = useState();
    const isDev = process.env.NODE_ENV === 'development';

    useEffect(() => {
      amplitude.init()
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            User.get()
                .then(response => {
                    console.log("[App]", response)
                    const u = response.data
                    dispatch(setUserData(u));
                    setUser(u);
                    if (BLOCK_LIST.length && BLOCK_LIST.includes(u?.email)) {
                        setBannedUser(true)
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (user && user.id) {
                User.isActive().then(() => {
                }).catch((error) => {
                    if (error.status == 404) {
                        localStorage.removeItem('authData');
                        location.reload();
                        setUser(null);
                    }
                });
            }
        }, 20000);
        return () => clearInterval(interval);
    }, [user]);

    return (
        <>
            <AuthContext.Provider
              value={{
                login,
                logout,
                isAuthenticated,
                checkDone
              }}
            >
                <BrowserRouter>
                  <Banners.Warning />
                  <LocationProvider>
                    <RouterCombiner
                      routes={routes}
                      PrivateRoute={PrivateRoute}
                      auth={isAuthenticated}
                    />
                  </LocationProvider>
                  {/*<Layout isAuthenticated={isAuthenticated}>*/}
                  {/*    <RouterProvider isAuthenticated={isAuthenticated} isBanUser={isBanUser}></RouterProvider>*/}
                  {/*</Layout>*/}
                  <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                  {
                    isDev && ( // TODO: нужно переделать на дропдаун
                      <Link className={"dev-link"} to={"/develop/icons"}>
                        <ToolsIcon />
                      </Link>
                    )
                  }
                </BrowserRouter>
            </AuthContext.Provider>
            {!isDev && <YandexMetrikaCounter />}
        </>
    );
}

export default App;
