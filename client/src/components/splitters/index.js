import React from 'react';

import Splitter from './splitter';

import './splitters.sass';

const Splitters = ({ children, className }) => {

    return(
        <div className={`splitters d-flex flex-wrap justify-content-around ${className}`}>
            {children}
        </div>
    )
};

export default Splitters;
export { Splitter }