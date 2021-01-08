import * as types from '../constants/ActionTypes';

export const showModal = (modalProps) => {
    return{
        type: types.MODAL_SHOW,
        payload: {modal: true, modalProps:{ ...modalProps }}
    }
}

export const hideModal = () => {
    return{
        type: types.MODAL_HIDE,
    }
}