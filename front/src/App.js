import {
  routesAdmin
} from "./routes";
import {
  Switch,
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";

function App() {

  const showRoute = () => {
    const routes = routesAdmin

    let result = routes.map((route, index) => {
    return (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.components}
      />
    );
    });

    return (
      <Router>
        <Switch>{result}</Switch>
        <ToastContainer hideProgressBar autoClose={3000} />
      </Router>
    );
  };

  return (
    showRoute()
  );
}

export default App;
