import React from 'react';
import {AuthServiceContext} from '../service-context';

const WithAuthService = () => (Wrapped) => {
    return (props) => {
        return(
            <AuthServiceContext.Consumer>
               {
                   (AuthService) => {
                       return <Wrapped {...props} AuthService={AuthService}/>
                   }
               } 
            </AuthServiceContext.Consumer>
        )
    };
};

export default WithAuthService;