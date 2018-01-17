import React, { Component } from 'react';
import Login from './containers/login/Login';
// import DeviceListPage from "./containers/deviceList/DeviceListPage";
import {Router, Scene} from "react-native-router-flux"

export default class AppRouter extends Component<{}> {

  render() {
    return (
      <Router>
        <Scene key="login" component={Login} title="Login" hideNavBar={true} initial />
      </Router>
    )
  }
}