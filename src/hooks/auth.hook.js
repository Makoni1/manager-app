import { useCallback, useState, useEffect } from 'react';

const storageName = 'authData';

export const useAuth = () => {
    const [checkDone, setCheckDone] = useState(false);
    const [token, setToken] = useState(null)
    
    const login = useCallback((token) => {
        localStorage.setItem(
            storageName,
            JSON.stringify({ token: token})
        );
        setToken(token)
        setCheckDone(true);
    }, []);

    const logout = useCallback(() => {
        console.log('logout 2')
        localStorage.removeItem(storageName);
        sessionStorage.clear();
    }, []);

    useEffect(() => {
        const data = localStorage.getItem(storageName) ? JSON.parse(localStorage.getItem(storageName)) : {}
        if(data && data.token){
            login(data.token)
        }
    }, [login])

    return { login, logout, token, checkDone };
}


