import * as types from '../constants/ActionTypes';

export const setRooms = (rooms) => {
    return{
        type: types.ROOMS_FETCHED,
        payload: rooms
    }
}

export const fetchRooms = () =>{
    return{
        type: types.FETCH_ROOMS
    };
};

export const addRoom = (room) => {
    return{
        type: types.ROOM_ADDED,
        payload: room
    }
}

export const removeRoom = (index) => {
    return{
        type: types.REMOVE_ROOM,
        payload: index
    }
}