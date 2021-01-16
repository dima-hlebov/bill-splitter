import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';

const Splitter = ({ firstName, lastName, id }) => {

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
                        {`${firstName} ${lastName}`}
                  </UncontrolledTooltip>
                : null
            }
        </>
    )
};

export default Splitter