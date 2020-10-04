import React from "react";
import { Formik, Form } from "formik";
import { TextInputField } from "src/components/generic/TextInput";
import { InnerContainer, RegLogLinkSpan } from "./styles";
import { FlexCenteredTopHundred } from "src/components/generic/styles/Containers";
import { NextBtn, IconBtnDiv } from "src/components/generic/styles/Buttons";
import { Link } from "src/components/generic/styles/Link";
import { connect } from "react-redux";
import { login } from "../../store/slice/auth";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Title, TitleDiv } from "src/components/generic/styles/Title";
import monochrome from "../../assets/monochrome.svg";
import { Row, Col, Container } from "react-bootstrap";
import { LoginValidationSchema } from "src/validations";

const LoginPage = ({ login, authError }) => {
  const history = useHistory();
  const handleSubmit = (values) => {
    login({ ...values, history });
  };
  return (
    <Container>
      <Row>
        <Col xs={12} md={5} disply="flex" justify-content="center">
          <InnerContainer>
            <TitleDiv>
              <Title> Log In</Title>
            </TitleDiv>
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={handleSubmit}
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
                    {authError && <Alert variant="danger">{authError}</Alert>}
                    <IconBtnDiv>
                      <NextBtn disabled={!isValid} type="submit">
                        Log In
                      </NextBtn>
                    </IconBtnDiv>
                    <div>
                      <RegLogLinkSpan>
                        Don't have an account yet?
                      </RegLogLinkSpan>
                      <RegLogLinkSpan>
                        <Link as={NavLink} to="/register">
                          Register
                        </Link>
                      </RegLogLinkSpan>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </InnerContainer>
        </Col>
        <Col className="d-none d-sm-block" xs={0} md={7}>
          <FlexCenteredTopHundred>
            <img width="350px" src={monochrome} alt="secondlogo" />
          </FlexCenteredTopHundred>
        </Col>
      </Row>
    </Container>
  );
};

export const ConnectedLoginPage = connect(
  (state) => ({
    authError: state.auth.authError,
  }),
  (dispatch) => ({
    login: (values) => dispatch(login(values)),
  })
)(LoginPage);
