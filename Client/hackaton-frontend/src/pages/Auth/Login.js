import React from "react";
import { Formik, Form } from "formik";
import { TextInputField } from "src/components/generic/TextInput";
import { LoginValidationSchema } from "src/validations";
import { InnerContainer } from "./styles";
import { BaseDiv } from "src/components/generic/styles/Containers";
import { LogBtn } from "src/components/generic/styles/Buttons";
import { Link } from "src/components/generic/styles/Link";
import { NavLink } from "react-router-dom";

export const Login = () => {
  return (
    <BaseDiv>
      <InnerContainer>
        <h3> Log In</h3>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginValidationSchema}
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
                    {" "}
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
