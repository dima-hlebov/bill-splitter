import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import MyInput from './my-input';
import Button from '../button';
import {WithAuthService} from '../with-service';
import {login} from '../../actions/auth';

import './form.sass';

const SigninForm = ({AuthService, login}) => {

  let history = useHistory();

  return (
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object({
          email: Yup.string()
              .email('Invalid email address')
              .required('Email required'),
          password: Yup.string()
              .min(8, 'Password is too short - should be 8 chars minimum')
              .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers')
              .required('Password required') 
        })}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          const {email, password} = values;
          const user = {
            email,
            password
          }
          AuthService.signin(user)
            .then((res) => login(res.data.user))
            .then(() => {history.push("/rooms")})
            .catch(err => { setFieldError('general', err.response.data.error) });
          setSubmitting(false);
        }}
      >
      {props => (
        <Form className="my-form">
          <MyInput
            label="Email"
            name="email"
            type="email"
          />
          <MyInput
            label="Password"
            name="password"
            type="password"
          />
          <Button className="button--w100" text="Sign-in"/>
          {props.errors.general && <div className="my-form__error-general">{props.errors.general}</div>}
        </Form>
      )}
      </Formik>
  );
};

const mapDispatchToProps = {
  login
};

export default WithAuthService()(connect(null, mapDispatchToProps)(SigninForm));