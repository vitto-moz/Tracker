import React, {Component} from 'react';
import {Text, View} from "react-native"
import styles from "./mapStyles"
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const Map = ()=> {


  return (
    <View style ={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
    </View>
  );
}

export default Map;
