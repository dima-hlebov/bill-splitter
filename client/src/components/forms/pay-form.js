import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { InputGroupAddon, InputGroupText, Input, Label } from 'reactstrap';

import { WithRoomService } from '../with-service';
// import { handleError } from '../../helper';

import './form.sass';

const PayForm = ({RoomService, room, addItem}) => {
//   const history = useHistory();

  return (
      <Formik
        initialValues={{
            isPaid: false,
            sum: 0
        }}
        validationSchema={Yup.object({
            isPaid: Yup.boolean().required('Paied required'),
            Sum: Yup.number().required('Price required').positive('Price must be positive').integer(),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            // const { sum, isPaied } = values;
            console.log(values)
        //   RoomService.addItem(room._id, newItem)
        //     .then(response => {
        //       const { items } = response.data.room;
        //       addItem(items[items.length-1]);
        //       resetForm({});
        //     })
        //     .catch(e => {
        //       handleError(e, history);
        //     });

            setSubmitting(false);
        }}
      >
        {props => (
            <Form id="pay-form" className="my-form mt-0 d-flex justify-content-end">
            <div className="d-flex w-100%">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Sum</InputGroupText>
                </InputGroupAddon>
                <Input name="sum" type="number" className="my-input my-input--max-w" disabled value={room.sum ? room.sum.toFixed(2) : 0}/>
                <InputGroupAddon addonType="append">
                    <InputGroupText>
                        <div className="mr-2">Is paid?</div>
                        <button className="switch">
                            <Input id="isPaied" name="isPaid" className="switch-input" type="checkbox" onChange={(e) =>{ console.log(props.values); props.submitForm()} }/>
                            <Label for="isPaied" className="switch-label"></Label>
                        </button>
                    </InputGroupText>
                </InputGroupAddon>
            </div>
            </Form>
        )}
      </Formik>
  );
};

const mapStateToProps = ({room: {room}}) => {
  return {
    room
  }
};

const mapDispatchToProps = {
  
};

export default WithRoomService()(connect(mapStateToProps, mapDispatchToProps)(PayForm));;