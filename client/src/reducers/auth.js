import * as types from "../constants/ActionTypes";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.LOGIN_SUCCESS:
        return {
            ...state,
            isLoggedIn: true,
            user: payload,
        };
        case types.LOG_OUT:
        return {
            ...state,
            isLoggedIn: false,
            user: null,
        };
        default:
        return state;
    }
}

export default reducer