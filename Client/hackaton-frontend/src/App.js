import React from "react";
import { Navigation } from "./components/Navigation";

import { CurrentTimeSheet } from "src/pages/CurrentTimeSheet/CurrentTimeSheet";

function App() {
  return (
    <div>
      <Navigation />
      <CurrentTimeSheet />
    </div>
  );
}

export default App;
