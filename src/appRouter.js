import React, { Component } from 'react';
import {  Route, Switch, Redirect } from 'react-router'
import {Provider} from "react-redux";
import Login from './containers/login/Login';
import configureStore from "./store/store";
import DeviceListPage from "./containers/deviceList/DeviceListPage";

let store = configureStore();

class AppRouter extends Component {
    render() {
        return (
            <Provider store={store}>
                <Switch>
                    <Route exact path={'/'} component={Login}/>
                    <Route exact path={'/devices'} component={DeviceListPage}/>
                    <Redirect  to={'/'}/>
                </Switch>
            </Provider>
        );
    }
}

export default AppRouter;