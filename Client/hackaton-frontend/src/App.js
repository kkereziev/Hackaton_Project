import React, { useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { connect } from "react-redux";
import { fetchCurrentUser } from "./store/slice/auth";

function App({ fetchCurrentUser }) {
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default connect(null, (dispatch) => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
}))(App);
