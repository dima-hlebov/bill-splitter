import React, { useState, useRef } from 'react';
import { Tooltip } from 'reactstrap';

import ShareImg from './share-blue.svg';

import './share.sass'

const Share = ({link}) => {

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const shareInputRef = useRef(null);

    const onClick = () => {
        console.log(link)
        setTooltipOpen(!tooltipOpen);
        setTimeout(() =>{setTooltipOpen(tooltipOpen => !tooltipOpen); }, 2000);
        shareInputRef.current.select();
        document.execCommand('copy');
    };

    return(
        <>
            <div id="share" className="share text-center">
                <textarea type="hidden" value={link} ref={shareInputRef}/>
                <button onClick={onClick}><img src={ShareImg} alt="share link"/></button>
            </div>
            <Tooltip placement="top" isOpen={tooltipOpen} target="share">
                Share link copied!
            </Tooltip>
        </>
    )
}

export default Share;