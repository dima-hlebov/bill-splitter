import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { InputGroupAddon, InputGroupText, Input, Label } from 'reactstrap';

import { WithRoomService } from '../with-service';
import { handleError } from '../../helper';

import './form.sass';

const PayForm = ({RoomService, room, user}) => {
    const history = useHistory();

    const getCurrSplitter = () => {
        return room.splitters.filter(splitter => splitter.splitter._id === user._id)[0];
    };

    const getToPay = () => {
        const currSplitter = getCurrSplitter();
        return +currSplitter.toPay ? +currSplitter.toPay.toFixed(2) : 0;
    };

    const getIsPaid = () => {
        return getCurrSplitter().splitterPaid;
    };

    return (
        <Formik 
            initialValues={{
                isPaid: false,
                toPay: 0
            }}
            validationSchema={Yup.object({
                isPaid: Yup.boolean()
            })}
            onSubmit={(values, { setSubmitting }) => {
                const { isPaid } = values;
                RoomService.pay(room._id, isPaid)
                    .then(response => {
                        // reducer
                    })
                    .catch(e => {
                        handleError(e, history);
                    });
                setSubmitting(false);
            }}
        >
            {({setFieldValue}) => (
                <Form id="pay-form" className="my-form mt-0 d-flex justify-content-end">
                    <div className="d-flex w-100%">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>To pay</InputGroupText>
                        </InputGroupAddon>
                        <Input name="toPay" type="number" className="my-input my-input--max-w" disabled value={getToPay()}/>
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <div className="mr-2">Is paid?</div>
                                <button type="submit" className="switch">
                                    <Input id="isPaid" name="isPaid" className="switch-input" type="checkbox" onChange={event => setFieldValue('isPaid', event.target.checked)} defaultChecked={getIsPaid()}/>
                                    <Label for="isPaid" className="switch-label"></Label>
                                </button>
                            </InputGroupText>
                        </InputGroupAddon>
                    </div>
                </Form>
            )}
        </Formik>
       
    );
};

const mapStateToProps = ({room: {room}, auth: {user}}) => {
  return {
    room,
    user
  }
};

const mapDispatchToProps = {

};

export default WithRoomService()(connect(mapStateToProps, mapDispatchToProps)(PayForm));;