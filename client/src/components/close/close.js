import React from 'react';

import './close.sass';
import cross from './cross.svg';

const Close = ({onDelete, className}) => {
    return(
        <span className={`cross d-flex align-items-center justify-content-end ${className}`} >
            <img src={cross} alt="cross" onClick={(e) => {e.stopPropagation(); onDelete()}}/>
        </span>
    );
};

export default Close;