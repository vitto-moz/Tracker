import React, { Component } from 'react';
import Login from './containers/login/Login';
import {Router, Scene} from "react-native-router-flux"
import DeviceListPage from "./containers/deviceList/DeviceListPage"

export default class AppRouter extends Component<{}> {

  render() {
    return (
      <Router>
        <Scene key="login" component={Login} title="Login" hideNavBar={true} initial />
        <Scene key="devices" component={DeviceListPage} title="Devices" hideNavBar={true} />
      </Router>
    )
  }
}