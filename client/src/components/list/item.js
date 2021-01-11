import React from 'react';

import Close from '../close/close'

import './list.sass';
import Splitters, { Splitter } from '../splitters';

const Item = ({text, divideAmoung, payees, price, onDelete, admin, onToggleItem, selected}) => {
    const renderSplitters = () => {
        if(payees){
            return payees.map((payee, i) => {
                const { _id: id, firstName, secondName } = payee;
                return (<Splitter key={id} id={`splitter${i}`} firstName={firstName} lastName={secondName}/>);
            })
        }
        return null
    };

    return (
        <li className="list__item" onClick={onToggleItem}>
            <Splitters className="splitters--badges">
                {renderSplitters()}
            </Splitters>
            <div className="d-flex list__item-wrapper">
                <div className="item-name">{text}</div>
                {/* <div className="item-divide">x {divideAmoung}</div> */}
                <div className="item-price">{price}</div>
                {admin ? <div className="item-remove"><Close onDelete={onDelete}/></div> : null}
            </div>
        </li>
    );
};



export default Item;