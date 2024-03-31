import { createStore, combineReducers } from "redux";
import { navigationReducer } from "./reducers/navigationReducer";
import { userReducer } from './reducers/userReducer';
import { refreshTokenReducer } from "./reducers/refreshTokenReducer";

const initialState = {};

const reducers = combineReducers({
    navigation: navigationReducer,
    user: userReducer,
    refreshToken: refreshTokenReducer,
});

export default createStore(
    (state, action) => reducers(state, action),
    initialState
    // +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);