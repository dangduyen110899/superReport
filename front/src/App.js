import {
  routesAdmin
} from "./routes";
import {
  Switch,
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import React, {useState, useEffect} from "react";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import Err from "pages/403";
import { Redirect } from 'react-router'

function App() {
  const [user, setuser] = useState(Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null)
  const showRoute = () => {
    let routes = routesAdmin
    // if (!user?.roles) { 
    //   routes = [routesAdmin[0], routesAdmin[1]]
    // }
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
        {
          !user?.roles && window.location.href!=='http://localhost:3000/' && <Redirect to='/403'/>
        }
      </Router>
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
