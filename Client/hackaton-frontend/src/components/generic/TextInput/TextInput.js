import React from "react";
import { Form, FormControl } from "react-bootstrap";
import classNames from "classnames";

export const TextInput = ({
  controlId,
  label,
  isTouched,
  errorMessage,
  className: classNameOverride,
  ...inputProps
}) => {
  const className = classNames(
    isTouched && !errorMessage && "is-valid",
    isTouched && !!errorMessage && "is-invalid",
    classNameOverride
  );

  return (
    <Form.Group controlId={controlId}>
      {label && <Form.Label>{label}</Form.Label>}
      <FormControl type="text" className={className} {...inputProps} />
      {isTouched && errorMessage && (
        <FormControl.Feedback type="invalid">
          {errorMessage}
        </FormControl.Feedback>
      )}
    </Form.Group>
  );
};
