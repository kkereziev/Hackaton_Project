import React from "react";
import { Field } from "formik";
import { TextInput } from "./TextInput";

const TextInputWrapper = ({ form, field, ...rest }) => {
  const errorMessage = form.errors[field.name];
  const isTouched = form.touched[field.name];
  return (
    <TextInput
      isTouched={isTouched}
      errorMessage={errorMessage}
      {...field}
      {...rest}
    />
  );
};

export const TextInputField = ({ name, ...rest }) => {
  return <Field name={name} component={TextInputWrapper} {...rest} />;
};
