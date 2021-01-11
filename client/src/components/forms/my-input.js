import React from 'react';
import { useField, ErrorMessage } from 'formik';
import { FormGroup, Label, Input, InputGroupAddon, InputGroupText } from 'reactstrap';

import './input.sass';

const MyInput = ({ prepand, label, children, formGroupStyle, ...props }) => {
    const [field, meta] = useField(props);
    const renderInput = () => {
      if(prepand){
        return(
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{prepand}</InputGroupText>
            <Input className={"my-input " + (meta.touched && meta.error ? "my-form__input-error" : "")} {...field} {...props} />
          </InputGroupAddon>
        )
      }else{
        return (<Input className={"my-input " + (meta.touched && meta.error ? "my-form__input-error" : "")} {...field} {...props} />)
      }
    };
    return (
      <FormGroup style={formGroupStyle}>
        {label ? <Label htmlFor={props.id || props.name}>{label}</Label> : null}
        {renderInput()}
        <ErrorMessage component="div" className="my-form__error" name={field.name}/>
      </FormGroup>
    );
};

export default MyInput;