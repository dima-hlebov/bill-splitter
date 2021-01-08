import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

import './alert-modal.sass'
import Close from '../close/close';
import Button from '../button';

const AlertModal = ({modal, onClose, onConfirm, text}) => {
    return (
      <Modal 
        isOpen={modal} 
        toggle={onClose} 
        backdrop={true}
        keyboard={true} 
        className="my-modal"
        size='md'
        centered={true}>
        <ModalBody>
          <Close onDelete={onClose} className="justify-content-end"/>
          <div className="modal-content__text">{text}</div>
        </ModalBody>
        <ModalFooter>
          <Button className="button--inline" text="Yes" onClick={onConfirm}/>
          <Button className="button--inline" text="No" onClick={onClose}/>
        </ModalFooter>
      </Modal>
  );
}

export default AlertModal;