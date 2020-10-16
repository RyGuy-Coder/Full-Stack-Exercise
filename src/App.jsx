// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import { getForms, saveForms } from '../services';
import React from "react"

import Error from "./components/Error"
import HomePage from "./pages/Home"
import FormPage from "./pages/Form"
import LoginPage from "./pages/Login"
import RegistrationPage from "./pages/Registration"
import AdminPage from "./pages/Admin"

import {
    BrowserRouter as Router,
        Switch,
        Route,
        Link,
        Redirect
} from "react-router-dom";

function isAuth() {
    if (localStorage.getItem('paToken')) {
        return true;
    } else {
        return false;
    }
}

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={(props) => (
            isAuth()
            ? <Component {...props} />
            : <Redirect to='/login' />
        )} />
    )
}


function App() {
    return (
        <Router>
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
                <PrivateRoute path="/admin" component={AdminPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegistrationPage} />
                <Route path="/form" component={FormPage} />
                <Route path="/" component={HomePage} />
                <Route path="*" component={HomePage} />
            </Switch>
        </Router>
    );
}

export default App;

