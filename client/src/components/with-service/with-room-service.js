import React from 'react';
import {RoomServiceContext} from '../service-context';

const WithRoomService = () => (Wrapped) => {
    return (props) => {
        return(
            <RoomServiceContext.Consumer>
               {
                   (RoomService) => {
                       return <Wrapped {...props} RoomService={RoomService}/>
                   }
               } 
            </RoomServiceContext.Consumer>
        )
    };
};

export default WithRoomService;