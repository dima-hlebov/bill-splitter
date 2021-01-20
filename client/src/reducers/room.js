import * as types from "../constants/ActionTypes";

const selectedRoom = JSON.parse(sessionStorage.getItem("selectedRoom"));

const initialState = selectedRoom
    ? { room: { _id: selectedRoom }, loading: true }
    : { room: {}, loading: true }

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    const getPayeesByItemIndex = (index) => {
        return state.room.items[index].payees;
    };

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
                splitters: state.room.splitters.map(splitter => {
                    if(state.room.items[payload].payees.filter(payee => payee._id === splitter.splitter._id).length > 0){
                        splitter.toPay -= state.room.items[payload].price/state.room.items[payload].divideAmoung;
                        return splitter;
                    }
                    return splitter;
                }),
                room: {
                    ...state.room,
                    items: state.room.items.filter((item, index) => index !== payload)
                } 
            };
        case types.ADD_PAYEE:
            return{
                ...state,
                room: {
                    ...state.room,
                    splitters: state.room.splitters.map(splitter => {
                        if(splitter.splitter._id === payload.payee._id){
                          splitter.toPay += state.room.items[payload.itemIndex].price/state.room.items[payload.itemIndex].divideAmoung;
                          return splitter;
                        }
                        return splitter;
                    }),
                    items: state.room.items.map((item, i) => {
                        if(i === payload.itemIndex){
                            return {
                                ...item, 
                                payees: [...getPayeesByItemIndex(payload.itemIndex), payload.payee]}
                        }
                        return item
                    })
                }
            }
        case types.REMOVE_PAYEE:
            return{
                ...state,
                room: {
                    ...state.room,
                    splitters: state.room.splitters.map(splitter => {
                        if(splitter.splitter._id === payload.payee._id){
                          splitter.toPay -= state.room.items[payload.itemIndex].price/state.room.items[payload.itemIndex].divideAmoung;
                          return splitter;
                        }
                        return splitter;
                    }),
                    items: state.room.items.map((item, i) => {
                        if(i === payload.itemIndex){
                            return {
                                ...item, 
                                payees: getPayeesByItemIndex(payload.itemIndex).filter((payee, index) => payee._id !== payload.payee._id)}
                        }
                        return item
                    })
                }
            }
        default:
        return state;
    }
}

export default reducer;