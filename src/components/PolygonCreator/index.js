import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import styles from "./polygonCreatorStyles"
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;


const PolygonCreatorWrapper = (WrappedComponent) => {
  return class PolygonCreator extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        polygons: [],
        editing: null,
        creatingHole: false,
      };
    }

    finish() {
      const { polygons, editing } = this.state;
      const coordinates = [...editing.coordinates]
      console.log('coordinates ', coordinates);
      this.props.polygonFinish(coordinates)
      this.setState({
        polygons: [...polygons, editing],
        editing: null,
        creatingHole: false,
      });
    }

    createHole() {
      const { editing, creatingHole } = this.state;
      if (!creatingHole) {
        this.setState({
          creatingHole: true,
          editing: {
            ...editing,
            holes: [
              ...editing.holes,
              [],
            ],
          },
        });
      } else {
        const holes = [...editing.holes];
        if (holes[holes.length - 1].length === 0) {
          holes.pop();
          this.setState({
            editing: {
              ...editing,
              holes,
            },
          });
        }
        this.setState({ creatingHole: false });
      }
    }

    onPress(e) {
      const { editing, creatingHole } = this.state;
      if (!editing) {
        this.setState({
          editing: {
            id: id++,
            coordinates: [e.nativeEvent.coordinate],
            holes: [],
          },
        });
      } else if (!creatingHole) {
        this.setState({
          editing: {
            ...editing,
            coordinates: [
              ...editing.coordinates,
              e.nativeEvent.coordinate,
            ],
          },
        });
      } else {
        const holes = [...editing.holes];
        holes[holes.length - 1] = [
          ...holes[holes.length - 1],
          e.nativeEvent.coordinate,
        ];
        this.setState({
          editing: {
            ...editing,
            id: id++, // keep incrementing id to trigger display refresh
            coordinates: [
              ...editing.coordinates,
            ],
            holes,
          },
        });
      }
    }

    render() {
      const mapOptions = {
        scrollEnabled: true,
      };

      if (this.state.editing) {
        mapOptions.scrollEnabled = false;
        mapOptions.onPanDrag = e => this.onPress(e);
      }

      return (
        <View style={styles.container}>
          <WrappedComponent {...this.props}
                            onPressHandler={e => this.onPress(e)}
          >
            {this.state.polygons.map(polygon => (
              <MapView.Polygon
                key={polygon.id}
                coordinates={polygon.coordinates}
                holes={polygon.holes}
                strokeColor="#F00"
                fillColor="rgba(255,0,0,0.5)"
                strokeWidth={1}
              />
            ))}
            {this.state.editing && (
              <MapView.Polygon
                key={this.state.editing.id}
                coordinates={this.state.editing.coordinates}
                holes={this.state.editing.holes}
                strokeColor="#000"
                fillColor="rgba(255,0,0,0.5)"
                strokeWidth={1}
              />
            )}
          </WrappedComponent>
          {/*<MapView*/}
            {/*provider={this.props.provider}*/}
            {/*style={styles.map}*/}
            {/*mapType={MapView.MAP_TYPES.HYBRID}*/}
            {/*initialRegion={this.state.region}*/}
            {/*onPress={e => this.onPress(e)}*/}
            {/*{...mapOptions}*/}
          {/*>*/}
            {/**/}
          {/*</MapView>*/}
          <View style={styles.buttonContainer}>
            {this.state.editing && (
              <TouchableOpacity
                onPress={() => this.createHole()}
                style={[styles.bubble, styles.button]}
              >
                <Text>{this.state.creatingHole ? 'Finish Hole' : 'Create Hole'}</Text>
              </TouchableOpacity>
            )}
            {this.state.editing && (
              <TouchableOpacity
                onPress={() => this.finish()}
                style={[styles.bubble, styles.button]}
              >
                <Text>Finish</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    }
  }

  // PolygonCreator.propTypes = {
  //   provider: MapView.ProviderPropType,
  // };


}


export default PolygonCreatorWrapper;