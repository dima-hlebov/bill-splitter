import * as types from '../constants/ActionTypes';

export const login = (user) => {
    const {_id, firstName, secondName, token} = user;
    const userData = {
        id: _id,
        firstName,
        secondName,
        token
    };
    return{
        type: types.LOGIN_SUCCESS,
        payload: userData
    }
}

export const logout = () => {
    return{
        type: types.LOG_OUT
    }
}