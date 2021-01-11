import * as types from '../constants/ActionTypes';

export const setSelectedRoom = (roomID) => {
    sessionStorage.setItem('selectedRoom', JSON.stringify(roomID));
    return{
        type: types.ROOM_SELECTED,
        payload: roomID
    }
}

export const setRoom = (room) => {
    return{
        type: types.ROOM_FETCHED,
        payload: room
    }
}

export const fetchRoom = () => {
    return{
        type: types.FETCH_ROOM
    };
};

export const addItem = (item) => {
    return{
        type: types.ADD_ITEM,
        payload: item
    }
};

export const removeItem = (index) => {
    return{
        type: types.REMOVE_ITEM,
        payload: index
    }
};

export const selectItem = (itemIndex, payee) => {
    return{
        type: types.ADD_PAYEE,
        payload: {itemIndex, payee}
    }
};

export const unSelectItem = (itemIndex, payee) => {
    return{
        type: types.REMOVE_PAYEE,
        payload: {itemIndex, payee}
    }
};
