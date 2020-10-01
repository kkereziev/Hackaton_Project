import React from "react";
import { Formik, Form } from "formik";
import { Alert } from "react-bootstrap";
import { TextInputField } from "src/components/generic/TextInput";
import { RegistrationValidationSchema } from "src/validations/registration";
import { InnerContainer } from "./styles";
import { BaseDiv } from "src/components/generic/styles/Containers";
import { LogBtn } from "src/components/generic/styles/Buttons";
import { Link } from "src/components/generic/styles/Link";
import { connect } from "react-redux";
import { register } from "../../store/slice/auth";
import { NavLink, useHistory } from "react-router-dom";

export const RegistrationPage = ({ register, authError }) => {
  const history = useHistory();
  const handleSubmit = (values) => {
    register({ ...values, history });
  };
  return (
    <BaseDiv>
      <InnerContainer>
        <h3>Register</h3>
        <Formik
          initialValues={{
            username: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={RegistrationValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid }) => {
            return (
              <Form>
                <TextInputField name="username" label="Username" />
                <TextInputField
                  name="password"
                  type="password"
                  label="Password"
                  autoComplete="current password"
                />
                <TextInputField
                  name="passwordConfirmation"
                  type="password"
                  label="Confirm Password"
                />
                {authError && <Alert variant="danger">{authError}</Alert>}
                <div>
                  <LogBtn disabled={!isValid} type="submit">
                    Sign in
                  </LogBtn>
                </div>
                <div>
                  Already have an account?
                  <Link as={NavLink} to="/login">
                    {" "}
                    Log In
                  </Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </InnerContainer>
    </BaseDiv>
  );
};

export const ConnectedRegistrationPage = connect(
  (state) => ({
    authError: state.auth.authError,
  }),
  (dispatch) => ({
    register: (values) => dispatch(register(values)),
  })
)(RegistrationPage);
