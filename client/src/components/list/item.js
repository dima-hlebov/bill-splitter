import React from 'react';

import Close from '../close/close'

import './list.sass';
import Splitters, { Splitter } from '../splitters';

const Item = ({text, divideAmoung, payees, price, onDelete, admin, onToggleItem, isPaid}) => {
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
        <li>
            <button className={`list__item ${isPaid ? "list__item--success" : null}`} onClick={onToggleItem}>
                <Splitters className="splitters--badges">
                    {renderSplitters()}
                </Splitters>
                <div className="d-flex list__item-wrapper">
                    <div className="item item-name">{text}</div>
                    <div className="item item-divide">x {divideAmoung}</div>
                    <div className="item item-price">{price}</div>
                    {admin ? <div className="item item-remove"><Close onDelete={onDelete}/></div> : null}
                </div>
            </button>
        </li>
    );
};



export default Item;