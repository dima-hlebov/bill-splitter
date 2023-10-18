import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';

import MyInput from './my-input';
import Button from '../button';
import { WithRoomService } from '../with-service';
import { addRoom, fetchRooms } from '../../actions/rooms';
import { handleError } from '../../helper';

import './form.sass';

const AddRoomForm = ({ RoomService, addRoom, fetchRooms }) => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Name required')
      })}
      onSubmit={(values, { setSubmitting, setFieldError, resetForm }) => {
        const { name } = values;
        const room = {
          name
        }
        fetchRooms();
        RoomService.addRoom(room)
          .then((res) => {
            addRoom(res.data.room);
            resetForm({})
          })
          .catch(e => {
            handleError(e, history)
          });
        setSubmitting(false);
      }}
    >
      <Form className="my-form">
        <div className="d-flex">
          <MyInput
            placeholder="Name"
            name="name"
            type="text"
            formGroupStyle={{ marginBottom: "0" }} />
          <Button className="button ml-2" text="Add new room" />
        </div>
      </Form>
    </Formik>
  );
};

const mapDispatchToProps = {
  addRoom,
  fetchRooms
}

export default WithRoomService()(connect(null, mapDispatchToProps)(AddRoomForm));