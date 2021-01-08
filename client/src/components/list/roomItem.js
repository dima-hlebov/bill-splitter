import React from 'react';

import Close from '../close/close'

import './list.sass';
import adminImg from './img/admin.svg';

const roomItem = ({text, admin, onDelete, onSelect}) => {

    return (
        <li className="list__item" onClick={onSelect}>
            <div className="d-flex justify-content-between">
                <div className="list__item-name">{text}</div>
                <div className="list__item-wrapper d-flex">
                    {admin ? <div className="list__item-admin d-flex align-items-center"><img src={adminImg} alt="get money back icon"/></div> : null}
                    <Close onDelete={onDelete}/>
                </div>
            </div>
        </li>
    );
};



export default roomItem;