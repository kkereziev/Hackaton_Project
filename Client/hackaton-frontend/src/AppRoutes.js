import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  Dashboard,
  CreateTimesheet,
  CurretTimesheet,
  Login,
  Register,
} from "src/pages";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/createTimesheet" exact component={CreateTimesheet} />
      <Route path="/timesheet/:name" exact component={CurretTimesheet} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/logout" exact component={Login} />
      <Redirect to="/dashboard" exact />
    </Switch>
  );
};
