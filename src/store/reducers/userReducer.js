import { setUserDataAction } from '../actions/userAction';

const initialState = {};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case setUserDataAction:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
