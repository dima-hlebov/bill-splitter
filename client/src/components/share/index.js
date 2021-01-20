import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

import ShareImg from './share-blue.svg';

import './share.sass'

const Share = ({link}) => {

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const onClick = () => {
        setTooltipOpen(!tooltipOpen);
        setTimeout(() =>{setTooltipOpen(tooltipOpen => !tooltipOpen); }, 2000);
        navigator.clipboard.writeText(link)
    };

    return(
        <>
            <div id="share" className="share text-center">
                <button onClick={onClick}><img src={ShareImg} alt="share link"/></button>
            </div>
            <Tooltip placement="top" isOpen={tooltipOpen} target="share">
                Invite link copied!
            </Tooltip>
        </>
    )
}

export default Share;