import React, { Component } from 'react';
import {  Route, Switch, Redirect } from 'react-router'
import {Provider} from "react-redux";
import Login from './containers/login/Login';
import configureStore from "./store/store";
import DeviceListPage from "./containers/deviceList/DeviceListPage";

let store = configureStore();

export default class AppRouter extends Component<{}> {

  render() {
    return (
      <Router>
        <Scene key="login" component={Login} title="Login" hideNavBar={true} initial />
        {/*<Scene key="devices" component={DeviceListPage} title="Devices" hideNavBar={true} />*/}
      </Router>
    )
  }
}

export default AppRouter;