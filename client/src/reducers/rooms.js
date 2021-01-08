import * as types from "../constants/ActionTypes";

const initialState = {
    rooms: null,
    loading: true
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.ROOMS_FETCHED:
            return {
                ...state,
                rooms: payload,
                loading: false
            };
        case types.FETCH_ROOMS:
            return {
                ...state,
                loading: true
            };
        case types.ROOM_ADDED:
            return {
                ...state,
                rooms: [payload, ...state.rooms],
                loading: false
            };
        case types.REMOVE_ROOM:
            return {
                ...state,
                rooms: state.rooms.filter((item, index) => index !== payload)
            };
        default:
            return state;
    }
}

export default reducer