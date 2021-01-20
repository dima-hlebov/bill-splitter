import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MyInput from './my-input';
import Button from '../button';
import { WithRoomService } from '../with-service';
import { handleError } from '../../helper';
import { addItem } from '../../actions/room';

import './form.sass';

const AddItemForm = ({RoomService, room, addItem}) => {
  const history = useHistory();

  return (
      <Formik
        initialValues={{
          name: '',
          price: 0,
          divideAmoung: 1
        }}
        validationSchema={Yup.object({
            name: Yup.string().required('Name required'),
            price: Yup.number().required('Price required').positive('Price must be positive'),
            divideAmoung: Yup.number().required('Divide amoung required').positive('Divide amoung must be positive').integer()
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const { name, price, divideAmoung } = values;
          const newItem = {
            name,
            price,
            divideAmoung
          }

          RoomService.addItem(room._id, newItem)
            .then(response => {
              const { items } = response.data.room;
              addItem(items[items.length-1]);
              resetForm({});
            })
            .catch(e => {
              handleError(e, history);
            });

          setSubmitting(false);
        }}
      >
        <Form className="my-form my-form--w100">
          <MyInput
            label="Name"
            name="name"
            type="text"
            formGroupStyle={{marginBottom: "0.5rem"}}/>
          <div className="d-flex justify-content-between">
          <MyInput
              prepand="Divide amoung x"
              name="divideAmoung"
              type="number"
              formGroupStyle={{ marginBottom: "0.5rem"}}/>
          <MyInput
            prepand="Price"
            name="price"
            type="number"
            formGroupStyle={{/*marginLeft: "0.25rem",*/ marginBottom: "0.5rem"}}/>
          </div>
          <Button className="button--w100" text="Add item"/>
        </Form>
      </Formik>
  );
};

const mapStateToProps = ({room: {room}}) => {
  return {
    room
  }
};

const mapDispatchToProps = {
  addItem
};

export default WithRoomService()(connect(mapStateToProps, mapDispatchToProps)(AddItemForm));;