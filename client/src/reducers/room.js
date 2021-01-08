import * as types from "../constants/ActionTypes";

const selectedRoom = JSON.parse(sessionStorage.getItem("selectedRoom"));

const initialState = selectedRoom
    ? { room: { _id: selectedRoom }, loading: true }
    : { room: {}, loading: true }

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.ROOM_SELECTED:
            return {
                ...state,
                room: {
                    _id: payload
                }
            };
        case types.ROOM_FETCHED:
            return {
                ...state,
                room: payload,
                loading: false
            };
        case types.FETCH_ROOM:
            return {
                ...state,
                loading: true
            };
        case types.ADD_ITEM:
            return {
                ...state,
                room: {
                    ...state.room,
                    items: [...state.room.items, payload]
                }
            };
        case types.REMOVE_ITEM:
            return {
                ...state,
                room: {
                    ...state.room,
                    items: state.room.items.filter((item, index) => index !== payload)
                } 
            };
        default:
        return state;
    }
}

export default reducer;