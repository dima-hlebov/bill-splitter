import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";

import MyInput from './my-input';
import Button from '../button'
import { WithAuthService } from '../with-service';

import './form.sass';

const SignupForm = ({AuthService}) => {

  let history = useHistory();

  return (
      <Formik
        initialValues={{
          firstName: '',
          secondName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .required('Required'),
            secondName: Yup.string()
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .required('Required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords doesn\'t match')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          const {firstName, secondName, email, password} = values;
          const user = {
            firstName,
            secondName,
            email,
            password
          }
          AuthService.signup(user)
            .then(() => {history.push("/sign-in")})
            .catch(err => { setFieldError('general', err.response.data.error) });
          setSubmitting(false);
        }}
      >
      {props => (
        <Form className="my-form">
          <MyInput
            label="First Name"
            name="firstName"
            type="text"
          />
          <MyInput
            label="Second Name"
            name="secondName"
            type="text"
          />
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
          <MyInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
          />
          <Button className="button--w100" text="Sign-up"/>
          {props.errors.general && <div className="my-form__error-general">{props.errors.general}</div>}
        </Form>
      )}
      </Formik>
  );
};

export default WithAuthService()(SignupForm);
