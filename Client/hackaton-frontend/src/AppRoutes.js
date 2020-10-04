import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  Dashboard,
  CreateTimesheet,
  CurrentTimesheet,
  ConnectedLoginPage as Login,
  ConnectedRegistrationPage as Register,
} from "src/pages";
import { useSelector } from "react-redux";
import { LoadingSpinner } from "src/components/generic/Spinner";
import { Navigation } from "./components/Navigation";
import { Container } from "react-bootstrap";

export const AppRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/createTimesheet" exact component={CreateTimesheet} />
          <Route path="/timesheet/:name" exact component={CurrentTimesheet} />
          <Redirect to="/dashboard" exact />
        </Switch>
      </div>
    );
  } else if (user === null) {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/logout" exact component={Login} />
          <Redirect to="/login" exact />
        </Switch>
      </div>
    );
  } else {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }
};
