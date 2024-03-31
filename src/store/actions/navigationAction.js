const SET_NAVBAR_STATE_ACTION = 'SET_NAVBAR_STATE';
const SET_NAVBAR_STATUSES_STATE = 'SET_NAVBAR_STATUSES_STATE';

const setNavbarState = payload=> ({
    type: SET_NAVBAR_STATE_ACTION,
    payload
});

const setNavbarStatusesState = payload=> ({
    type: SET_NAVBAR_STATUSES_STATE,
    payload
});

export {
    SET_NAVBAR_STATE_ACTION,
    SET_NAVBAR_STATUSES_STATE,
    setNavbarState,
    setNavbarStatusesState
}