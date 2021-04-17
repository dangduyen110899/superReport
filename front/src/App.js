import {
  routes
} from "./routes";
import {
  Switch,
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import React, {useState, useEffect} from "react";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { Redirect } from 'react-router'
import { StoreProvider } from './store'
import { PrivateRoute } from "components/PrivateRoute";

function App() {
  const [user, setuser] = useState(Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null)
  console.log(routes, user)
  const showRoute = () => {
    let result = routes.map((route, index) => {
      if (route.role) {
        return (
          <PrivateRoute
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.components}
            roles={route.role}
          />
        )
      } else {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.components}
          />
        );
      }
    });

    return (
      <StoreProvider>
        <Router>
          <Switch>{result}</Switch>
          <ToastContainer hideProgressBar autoClose={3000} />
          {/* {
            !user?.roles && window.location.href!=='http://localhost:3000/' && <Redirect to='/403'/>
          } */}
        </Router>
      </StoreProvider>
    );
  };

  // useEffect(() => {
  //   setuser(Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null)
  // }, [user])

  console.log("user", user)
  return (
    showRoute()
  );
}

export default App;
