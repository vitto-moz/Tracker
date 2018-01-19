import React, { Component } from 'react';
import { Provider } from "react-redux"
import AppRouter from "./src/appRouter"
import configureStore from "./src/store"
import {
StyleSheet,
} from 'react-native';


let store = configureStore();

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    )
  }
}
