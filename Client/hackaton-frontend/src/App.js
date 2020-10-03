import React, { useEffect } from "react";
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
      <AppRoutes />
    </BrowserRouter>
  );
}

export default connect(null, (dispatch) => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
}))(App);
