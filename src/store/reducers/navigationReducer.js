import {
    SET_TABBAR_STATE_ACTION,
    SET_NAVBAR_STATE_ACTION,
    SET_NAVBAR_STATUSES_STATE
} from '../actions/navigationAction';

const initialState = {
    statuses: []
}

export const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAVBAR_STATUSES_STATE:
            return {
                ...state,
                statuses: action.payload
            };
        default:
            return state;
    }
}