import React from 'react'
import './list.sass';
import RoomItem from './roomItem';
import AdminItem from './adminItem';
import UserItem from './adminItem';

const List = ({children, headers}) => {

    const renderListHeaders = () => {     
        return headers.map(({header, className}, i) => {
            return (
                <div key={i} className={className}>{header}</div>
            )
        });
    };
    
    return (
        <ul className="list">
            <div className="list__headers d-flex">
                {renderListHeaders()}
            </div>
            {children}
        </ul>
    );
};
export default List;
export {RoomItem, AdminItem, UserItem};