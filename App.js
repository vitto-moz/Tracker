import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';


import store from "./src/store"

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
});
