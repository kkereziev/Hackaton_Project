import React from "react";
import { Formik, Form } from "formik";
import { TextInputField } from "src/components/generic/TextInput";
import { LoginValidationSchema } from "src/validations";
import { InnerContainer } from "./styles";
import { BaseDiv } from "src/components/generic/styles/Containers";
import { LogBtn } from "src/components/generic/styles/Buttons";
import { Link } from "src/components/generic/styles/Link";
import { connect } from "react-redux";
import { login } from "../../store/slice/auth";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const LoginPage = ({ login }) => {
  const history = useHistory();
  const handleSubmit = (values) => {
    login({ ...values, history });
  };
  return (
    <BaseDiv>
      <InnerContainer>
        <h3> Log In</h3>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginValidationSchema}
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

                <div>
                  <LogBtn disabled={!isValid} type="submit">
                    Log In
                  </LogBtn>
                </div>
                <div>
                  Don't have an account yet?
                  <Link as={NavLink} to="/register">
                    Register
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

export const ConnectedLoginPage = connect(null, (dispatch) => ({
  login: (values) => dispatch(login(values)),
}))(LoginPage);
