import React from 'react';

import Close from '../close/close'

import './list.sass';
import Splitters, { Splitter } from '../splitters';

const AdminItem = ({text, divideAmoung, price, onDelete, onSelect}) => {
    return (
        <li className="list__item" onClick={onSelect}>
            <Splitters className="splitters--badges">
                <Splitter firstName="Dima" lastName="Hlebov" />
            </Splitters>
            <div className="d-flex list__item-wrapper">
                <div className="item-name">{text}</div>
                <div className="item-divide">x {divideAmoung}</div>
                <div className="item-price">{price}</div>
                <div className="item-remove"><Close onDelete={onDelete}/></div>
            </div>
        </li>
    );
};



export default AdminItem;