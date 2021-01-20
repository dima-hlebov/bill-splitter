import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';

const Splitter = ({ firstName, lastName, id, toPay }) => {

    const getShortName = (firstName, lastName) => {
        return `${firstName[0]}${lastName[0]}`;
    }

    return(
        <>
            <div className="splitter d-flex" id={id ? id : null}>
                <span>{getShortName(firstName, lastName)}</span>
            </div>
            {id 
                ? <UncontrolledTooltip  placement="top" autohide={false} target={id}>
                        <div>{`${firstName} ${lastName}`}</div>
                        <div>{toPay ? `To pay: ${toPay}` : null}</div>
                  </UncontrolledTooltip>
                : null
            }
        </>
    )
};

export default Splitter