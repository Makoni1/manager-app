const setRefreshTokenAction = 'SET_REFRESH_TOKEN_ACTION';

const setRefreshToken = (payload) => ({
    type: setRefreshTokenAction,
    payload
});

export { setRefreshToken, setRefreshTokenAction };
