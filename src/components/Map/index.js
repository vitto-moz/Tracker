import React, {Component} from 'react';
import {View} from "react-native"
import styles from "./mapStyles"
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const Map = ({markers})=> {

  const getMarkers = () => {
    if (markers)
      return markers.map((item) => {
        if (!item.detail.pos.x || !item.detail.pos.y) {
          return null
        }
        console.log('item.detail.pos.y ', item.detail.pos.y);
        return <MapView.Marker
                  key={item.id}
                  title={'ewfsddsfdsa'}
                  coordinate={{latitude: item.detail.pos.y, longitude: item.detail.pos.x}}
                  image={require(`../../images/0.png`)}
                />
      });
  }

  return (
    <View style ={styles.container}>
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
