import React from "react";
import { Navigation } from "./components/Navigation";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

import { CurrentTimeSheet } from "src/pages/CurrentTimeSheet/CurrentTimeSheet";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
