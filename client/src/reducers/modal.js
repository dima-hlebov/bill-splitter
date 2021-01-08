import * as types from "../constants/ActionTypes";

const initialState = {
    modal: false,
    modalProps: {}
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.MODAL_SHOW:
            return {
                ...state,
                modal: payload.modal,
                modalProps: payload.modalProps
            };
        case types.MODAL_HIDE:
            return initialState
        default:
            return state;
    }
}

export default reducer