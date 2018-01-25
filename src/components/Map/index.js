import React, {Component} from 'react';
import {Image, View} from "react-native"
import styles from "./mapStyles"
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import moment from 'moment';

const images = {
  pin0: require("../../images/0.png"),
  pin1: require("../../images/1.png"),
  pin2: require("../../images/2.png"),
}

function getIcon(detail) {
  let minutesFromNow = moment.duration(moment().diff(moment(detail.pos.t * 1000))).asMinutes();
  return  minutesFromNow <= 10 ? images.pin1 : minutesFromNow < 60 ? images.pin2 : images.pin0;
}

const Map = ({markers})=> {

  const getMarkers = () => {
    if (markers)
      return markers.map((item) => {
        if (!item.detail.pos.x || !item.detail.pos.y) return null
        return <MapView.Marker
                  key={item.id}
                  coordinate={{latitude: item.detail.pos.y, longitude: item.detail.pos.x}}
                >
                  <Image style={styles.pin} source={getIcon(item.detail)}/>
                </MapView.Marker>
      });
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 57.7033216667,
          longitude: 14.781434,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {getMarkers()}
      </MapView>
    </View>
  );
}

export default Map;
