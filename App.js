import React, { Component } from 'react';
import { Provider } from "react-redux"
import AppRouter from "./src/appRouter"
import {
StyleSheet,
} from 'react-native';


import store from "./src/store"

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
});
