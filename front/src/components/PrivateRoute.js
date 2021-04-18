
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from "js-cookie";
const currentUser = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        if (!currentUser) {
            return <Redirect to={{ pathname: '/'}} />
        }

        if (roles && roles.includes(currentUser.roles)) {
            console.log("roles", roles)
            return <Component {...props} />
        }

        return <Redirect to={{ pathname: '/403'}} />
        
    }} />
)