import React from "react";
import { Formik, Form } from "formik";
import { TextInputField } from "src/components/generic/TextInput";
import { LoginValidationSchema } from "src/validations";
import { InnerContainer } from "./styles";
import { BaseDiv } from "src/components/generic/styles/Containers";
import { LogBtn } from "src/components/generic/styles/Buttons";
import { Link } from "src/components/generic/styles/Link";

export const RegistrationPage = () => {
  return (
    <BaseDiv>
      <InnerContainer>
        <h3>Register</h3>
        <Formik
          initialValues={{ username: "", password: "", confirmPassword: "" }}
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
                <TextInputField
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                />
                <div>
                  <LogBtn disabled={!isValid} type="submit">
                    Log In
                  </LogBtn>
                </div>
                <div>
                  Already have an account? -->
                  <Link> Log In</Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </InnerContainer>
    </BaseDiv>
  );
};
