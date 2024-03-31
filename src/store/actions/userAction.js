const setUserDataAction = 'SET_USER_DATA';

const setUserData = (payload) => ({
    type: setUserDataAction,
    payload
});

export { setUserData, setUserDataAction };
