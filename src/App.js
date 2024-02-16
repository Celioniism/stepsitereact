import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Make sure this line is correct
import { WindowServiceProvider } from "./shared/WindowServiceContext";
import AppRoutes from "./shared/routes";

const App = () => {
  return (
    <Router>
      <WindowServiceProvider>
        <AppRoutes />
      </WindowServiceProvider>
    </Router>
  );
};

export default App;
