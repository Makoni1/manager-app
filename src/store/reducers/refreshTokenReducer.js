import { setRefreshTokenAction } from '../actions/refreshTokenAction';

const initialState = {
    token: false
};

export const refreshTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case setRefreshTokenAction:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
};
