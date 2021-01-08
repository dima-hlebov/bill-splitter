import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const Splitter = ({ firstName, lastName, id }) => {

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    const getShortName = (firstName, lastName) => {
        return `${firstName[0]}${lastName[0]}`;
    }

    return(
        <>
            <div className="splitter d-flex" id={id ? id : null}>
                <span>{getShortName(firstName, lastName)}</span>
            </div>
            {id ?
                <Tooltip placement="top" isOpen={tooltipOpen} autohide={false} target={id} toggle={toggle}>
                    {`${firstName} ${lastName}`}
                </Tooltip>
                : null
            }
        </>
    )
};

export default Splitter