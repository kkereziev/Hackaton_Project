import React from "react";
import { Formik, Form } from "formik";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { TextInputField } from "src/components/generic/TextInput";
import { RegistrationValidationSchema } from "src/validations/registration";
import { InnerContainer, RegLogLinkSpan } from "./styles";
import { FlexCenteredTopHundred } from "src/components/generic/styles/Containers";
import { NextBtn, IconBtnDiv } from "src/components/generic/styles/Buttons";
import { Link } from "src/components/generic/styles/Link";
import { connect } from "react-redux";
import { register } from "../../store/slice/auth";
import { NavLink, useHistory } from "react-router-dom";
import { Title, TitleDiv } from "src/components/generic/styles/Title";
import monochrome from "src/assets/monochrome.svg";

export const RegistrationPage = ({ register, authError }) => {
  const history = useHistory();
  const handleSubmit = (values) => {
    register({ ...values, history });
  };
  return (
    <Container>
      <Row>
        <Col xs={12} md={5} disply="flex" justify-content="center">
          <InnerContainer>
            <TitleDiv>
              <Title>Register</Title>
            </TitleDiv>
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
                    <IconBtnDiv>
                      <NextBtn disabled={!isValid} type="submit">
                        Register
                      </NextBtn>
                    </IconBtnDiv>
                    <div>
                      <RegLogLinkSpan>Already have an account?</RegLogLinkSpan>
                      <RegLogLinkSpan>
                        <Link as={NavLink} to="/login">
                          {" "}
                          Log In
                        </Link>
                      </RegLogLinkSpan>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </InnerContainer>
        </Col>
        <Col className="d-none d-sm-block" md={7}>
          <FlexCenteredTopHundred>
            <img width="350px" src={monochrome} alt="secondlogo" />
          </FlexCenteredTopHundred>
        </Col>
      </Row>
    </Container>
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
