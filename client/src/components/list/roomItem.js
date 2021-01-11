import React from 'react';

import Close from '../close/close'

import './list.sass';
import adminImg from './img/admin.svg';

const roomItem = ({text, admin, onDelete, onSelect}) => {

    return (
        <li className="list__item" onClick={onSelect}>
            <div className="d-flex list__item-wrapper">
                <div className="item-name">{text}</div>
                {admin ? <div className="item-admin"><img src={adminImg} alt="admin icon"/></div> : null}
                <div className="item-remove"><Close onDelete={onDelete}/></div>
            </div>
        </li>
    );
};



export default roomItem;