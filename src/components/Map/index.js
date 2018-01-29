import React, {PureComponent} from "react"
import { compose, withProps } from "recompose"
import moment from 'moment';
import MapView, {Polygon, Polyline, Callout, PROVIDER_GOOGLE} from 'react-native-maps'
import {Image, Text, View} from "react-native"
import styles from "./mapStyles"
import PolygonCreatorWrapper from "../PolygonCreator"

const images = {
  pin0: require("../../images/0.png"),
  pin1: require("../../images/1.png"),
  pin2: require("../../images/2.png"),
}

function getBatteryLevel(detail) {
    let batteryLevel;
    if (detail.pos.p.battery_level) {
        return <Text> {detail.pos.p.battery_level} %</Text>
    } else {
        let voltage = detail.pos.p.battery ? parseFloat(detail.pos.p.battery) : 0;
        batteryLevel = voltage.toFixed(2) + " V"
    }
    return <Text>{batteryLevel}</Text>
}

function getIcon(detail) {
  let minutesFromNow = moment.duration(moment().diff(moment(detail.pos.t * 1000))).asMinutes();
  return  minutesFromNow <= 10 ? images.pin1 : minutesFromNow < 60 ? images.pin2 : images.pin0;
}

function getMapCenter(coordinates) {
    return {
        latitude : (coordinates.maxLat + coordinates.minLat)/2,
        longitude : (coordinates.maxLng + coordinates.minLng)/2,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
    }
}

function getZoomLevel(coordinates, mapDim) {
    let WORLD_DIM = { height: mapDim.height, width: mapDim.width };
    let ZOOM_MAX = 15;

    function latRad(lat) {
        let sin = Math.sin(lat * Math.PI / 180);
        let radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    let ne = {latitude : coordinates.maxLat, longitude  : coordinates.maxLat};
    let sw = {latitude : coordinates.minLat, longitude  : coordinates.minLat};

    let latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI;

    let lngDiff = ne.lng - sw.lng;
    let lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

    let latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
    let lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
}

let map;

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        apiKey: "AIzaSyCnG1ZdIPat5LMZpivpPsEGDocqrlWkGlY",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
)((props) => {

    let center = props.pos
      ? props.pos
      : { latitude: -34.397, longitude: 150.644 };
    center = { ...center, latitudeDelta: 0.015, longitudeDelta: 0.0121 }

    let zoom = !props.zoomUpdated ? 15 : props.zoom;

    let mrks = props.markers.map((item) => {
        if(!item.detail.pos.x || !item.detail.pos.y) {
            return null
        }
        return    <MapView.Marker
                        key={item.id}
                        coordinate={{latitude: item.detail.pos.y, longitude: item.detail.pos.x}}
                        onPress={() => {
                          props.toggleZoom({latitude: item.detail.pos.y, longitude: item.detail.pos.x},item.id);
                        }}
                    >
                        <Image style={styles.pin}
                               source={getIcon(item.detail)}/>


                        <Callout
                                onPress={() => props.closeInfo()}
                                onCloseClick={() => props.closeInfo()}
                                tooltip={true}
                            >
                              {!props.drawing && <View style={styles.googleMapsInfoBox}>

                                    <Text style={{
                                        textAlign: 'center',
                                        color: 'yellow',
                                        fontSize: 18,
                                        fontWeight: 'bold'
                                    }}>
                                        {item.nm}
                                    </Text>

                                    {item.detail.pos.l
                                        ? <Text style={styles.calloutAddress}>
                                                <Image source={require('../../images/pin-mini.png')}
                                                        style={{width: 50, height: 70, marginRight: 10}}/>
                                        {item.detail.pos.l}
                                            </Text>
                                        : null
                                    }

                                  <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingTop: 5,
                                    borderTopWidth: 1,
                                    borderColor: '#50585b'
                                  }}>
                                      <Text style={styles.calloutInfo}>
                                        {item.detail['pos']['s']} km/h
                                      </Text>
                                      <Text style={styles.calloutInfo}>
                                        {item.detail['pos']['z']} m
                                      </Text>
                                      <Text style={styles.calloutInfo}>
                                        {getBatteryLevel(item.detail)}
                                      </Text>
                                  </View>
                                </View>
                              }
                            </Callout>
                  </MapView.Marker>
    });

      if (props.changeMapSettings) {
        // center = getMapCenter(props.coordinates);

        if ( props.geoJSON ) {
          map.fitToCoordinates(
            props.geoJSON,
            {edgePadding: {top: 100, right: 100, bottom: 100, left: 100}, animated: false}
          )
        }
      } else {
        if (props.mapReady) {
          map.animateToRegion(
            center,
          )
        }
      }

    let polygons = props.polygons ? props.polygons.map((item) => {
        if(props.activeItemId === item.id && props.edit) {
            return <Polygon key ={item.id}
                            coordinates={item.path}
                            fillColor="#99d5eb33"
                            editable={true}
                            ref={(polygon)=> this.polygon = polygon}/>

        } else {
            return <Polygon key ={item.id}
                            fillColor="#99d5eb33"
                            coordinates={item.path}
                            editable={false}/>
        }

    }) : null

    return  <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                // region={ !props.geoJSON ? center : null}
                ref={ ref => map = ref}
                // defaultZoom={4}
                zoom={zoom}
                zoomEnabled={true}
                fitToElements={true}
                mapType={props.mapType}
                onZoomChanged={()=>props.zoomChanged(this.map.getZoom())}
                onPress={props.onPressHandler}
                onLayout={props.onMapLayout}
            >
                {mrks}

                { props.geoJSON?
                    <Polyline
                        coordinates={props.geoJSON}
                        strokeWidth={6}
                        strokeOpacity={0.8}
                        strokeColor={"#FF0000"}
                        geodesic={true}
                    /> : null}

                {polygons}

                {props.drawing ? props.children : null}

                {/*{props.drawing*/}
                  {/*? <PolygonCreator ref={(poligonDraw)=>this.poligonDraw = poligonDraw}*/}
                                    {/*provider={PROVIDER_GOOGLE}*/}
                    {/*defaultDrawingMode={window.google.maps.drawing.OverlayType.POLYGON}*/}
                    {/*drawingControl = {false}*/}
                    {/*defaultOptions={{*/}
                        {/*polygonOptions: {*/}
                            {/*fillColor: `#151cff`,*/}
                            {/*fillOpacity: 1,*/}
                            {/*strokeWeight: 5,*/}
                            {/*clickable: false,*/}
                            {/*editable: false,*/}
                            {/*zIndex: 1,*/}
                        {/*},*/}
                    {/*}}*/}
                    {/*onPolygonComplete={(value) => props.polygonFinish(value)}*/}

                {/*/> : null}*/}

                {/*{props.edit*/}
                  {/*? <button className={'finish-edit-btn'}*/}
                            {/*onClick={() => props.finishEdit(this.polygon.getPath().getArray())}>*/}
                        {/*Save*/}
                    {/*</button>*/}
                  {/*: null*/}
                {/*}*/}


    </MapView>
});

const WrappedWithPolygonCreator = PolygonCreatorWrapper(MyMapComponent)

class MapComponent extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            // zoom : 4,
            isOpen : false,
            openId : null,
            zoomUpdated : true,
            loaded : false,
            changeMapSettings : false,
            mapReady: false
        }
    }
    changePosition(pos, id){
        pos.longitude && pos.latitude
          ? this.setState({pos, zoomUpdated : false, openId : id, isOpen:true, changeMapSettings : false } )
          : null;
    }
    onZoomChange(e){
        if(typeof e === 'number') {
            this.setState({
                zoom: e,
                zoomUpdated: true,
                changeMapSettings: false
            })
        }
    }
    toggleZoom(pos, id){
        this.setState({
            zoomUpdated : false,
            pos,
            openId : id === this.state.openId ? null : id,
            isOpen : !(id === this.state.openId),
            changeMapSettings : false
        });
        this.props.makeActive(id)
    }
    closeInfo(){
        this.setState({
            isOpen : false,
            openId : null,
        })
    }

    onMapLayout = () => {
      this.setState({mapReady: true})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.items.length > 0 && !this.state.loaded){
            let item = nextProps.items[0];
            this.setState({
                pos : {latitude: item.detail.pos.y, longitude: item.detail.pos.x},
                loaded : true
            })
        }
        if(JSON.stringify(nextProps.coordinates)!==JSON.stringify(this.props.coordinates)){
            this.setState({
                changeMapSettings : true
            })
        }
    }

    render() {
        return (
            <WrappedWithPolygonCreator  pos={this.state.pos}
                                         markers={this.props.items}
                                         mapType={this.props.mapType}
                                         zoomChanged={(e)=>this.onZoomChange(e)}
                                         zoom={this.state.zoom}
                                         zoomUpdated={this.state.zoomUpdated}
                                         toggleZoom={(pos, id)=>this.toggleZoom(pos, id)}
                                         isOpen={this.state.isOpen}
                                         openId={this.state.openId}
                                         closeInfo={()=>this.closeInfo()}
                                         geoJSON={this.props.geoJSON}
                                         coordinates={this.props.coordinates}
                                         changeMapSettings={this.state.changeMapSettings}
                                         drawing={this.props.drawing}
                                         polygonFinish={(coordinates) => {
                                            this.props.savePolygon(coordinates)
                                         }}
                                         mapReady={this.state.mapReady}
                                         onMapLayout={this.onMapLayout}
                                         polygons={this.props.polygons}
                                         edit={this.props.edit}
                                         activeItemId={this.props.activeItemId}
                                         finishEdit={(path)=>this.props.finishEdit(path)}
            />

        )
    }
}

export default MapComponent;
