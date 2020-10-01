import React from "react";
import { Navigation } from "./components/Navigation";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
