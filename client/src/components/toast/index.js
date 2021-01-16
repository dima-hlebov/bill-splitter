import React from 'react'
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

import './my-toast.sass';

const MyToast = ({ text }) => {
    return(
        <div className="my-toast">
            <Toast isOpen={text ? true : false}>
                <ToastHeader>
                    Notification
                </ToastHeader>
                <ToastBody>
                    {text ? text : null}
                </ToastBody>
            </Toast>
        </div>
    )
};

export default MyToast;