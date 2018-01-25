import React, {PureComponent} from "react"
import { compose, withProps } from "recompose"
// import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline , Polygon } from "react-google-maps";
// import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
// import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import moment from 'moment';
import MapView, {Polygon, PROVIDER_GOOGLE} from 'react-native-maps'
import {Image} from "react-native"
// import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";
import styles from "./mapStyles"

const images = {
  pin0: require("../../images/0.png"),
  pin1: require("../../images/1.png"),
  pin2: require("../../images/2.png"),
}

function getBatteryLevel(detail) {
    let batteryLevel;
    if (detail.pos.p.battery_level) {
        return <span> {detail.pos.p.battery_level} %</span>
    } else {
        let voltage = detail.pos.p.battery ? parseFloat(detail.pos.p.battery) : 0;
        batteryLevel = voltage.toFixed(2) + " V"
    }
    return <span>{batteryLevel}</span>
}

function getIcon(detail) {
  let minutesFromNow = moment.duration(moment().diff(moment(detail.pos.t * 1000))).asMinutes();
  return  minutesFromNow <= 10 ? images.pin1 : minutesFromNow < 60 ? images.pin2 : images.pin0;
}

function getMapCenter(coordinates) {
    return {
        latitude : (coordinates.maxLat + coordinates.minLat)/2,
        longitude : (coordinates.maxLng + coordinates.minLng)/2
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

    let ne = {lat : coordinates.maxLat, lng  : coordinates.maxLat};
    let sw = {lat : coordinates.minLat, lng  : coordinates.minLat};

    let latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI;

    let lngDiff = ne.lng - sw.lng;
    let lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

    let latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
    let lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
}

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

    let zoom = !props.zoomUpdated?15:props.zoom;

    let mrks = props.markers.map((item)=> {
        if(!item.detail.pos.x || !item.detail.pos.y) {
            return null
        }
        return    <MapView.Marker
                        key={item.id}
                        coordinate={{latitude: item.detail.pos.y, longitude: item.detail.pos.x}}
                        onPress={() => {
                          props.toggleZoom({lat: item.detail.pos.y, lng: item.detail.pos.x},item.id);
                        }}
                    >
                        <Image style={styles.pin}
                               source={getIcon(item.detail)}/>
                    {/*{props.isOpen && props.openId === item.id && <InfoBox*/}

                        {/*onClick={()=>props.closeInfo()}*/}
                        {/*onCloseClick={()=>props.closeInfo()}*/}
                        {/*options={{ closeBoxURL: ``,*/}
                            {/*enableEventPropagation: false,*/}
                            {/*alignBottom : true,*/}
                            {/*pixelOffset : new window.google.maps.Size(-167, -55)*/}

                        {/*}}*/}

                    {/*>*/}
                        {/*<div className={'google-maps-info-box'}  >*/}
                            {/*<p style={{textAlign: 'center', color : 'yellow', fontSize : '18px', fontWeight: 'bold'}}>{item.nm}</p>*/}
                            {/*{item.detail.pos.l?*/}
                                {/*<p style={{marginBottom : '5px'}}>*/}
                                    {/*<img src={require('../../images/pin-mini.png')} style={{width : '15px'}} alt=""/> {item.detail.pos.l}</p>:null}*/}

                            {/*<div style={{ display: 'flex', justifyContent: 'space-between',fontSize: `16px`, paddingTop: '5px', fontColor: `#08233B`, borderTop: '1px solid  #50585b' }}>*/}
                                {/*<span>{item.detail['pos']['s'] } km/h</span>*/}
                                {/*<span>{item.detail['pos']['z'] } m</span>*/}
                                {/*<span>{getBatteryLevel(item.detail)}</span>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</InfoBox>}*/}
                  </MapView.Marker>
    });
    if(props.changeMapSettings){
        zoom = getZoomLevel(props.coordinates, {height : this.map.getDiv().offsetHeight, width : this.map.getDiv().offsetWidth});
        center = getMapCenter(props.coordinates);
    }

    let polygons = props.polygons ? props.polygons.map((item) => {
        if(props.activeItemId === item.id && props.edit) {
            return <Polygon key ={item.id} path={item.path} editable={true} ref={(polygon)=> this.polygon = polygon}/>

        } else {
            return <Polygon key ={item.id} path={item.path} editable={false}/>

        }

    }) : null

    return  <MapView

                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={center}
                ref={(map)=>this.map = map}
                // defaultZoom={4}
                zoom={zoom}
                mapTypeId={props.mapType}
                onZoomChanged={()=>props.zoomChanged(this.map.getZoom())}
            >
                {mrks}

                {props.geoJSON?
                    <Polyline
                    path={props.geoJSON}
                    options={{strokeColor :"#FF0000", strokeOpacity : 0.8, strokeWidth : 0.8, fillOpacity : 0, geodesic : true}}
                    /> : null}

                {polygons}

                {props.drawing?  <DrawingManager ref={(poligonDraw)=>this.poligonDraw = poligonDraw}
                    defaultDrawingMode={window.google.maps.drawing.OverlayType.POLYGON}
                    drawingControl = {false}
                    defaultOptions={{
                        polygonOptions: {
                            fillColor: `#151cff`,
                            fillOpacity: 1,
                            strokeWeight: 5,
                            clickable: false,
                            editable: false,
                            zIndex: 1,
                        },
                    }}
                    onPolygonComplete={(value) => props.polygonFinish(value)}

                /> : null}
                {props.edit
                  ? <button className={'finish-edit-btn'}
                            onClick={() => props.finishEdit(this.polygon.getPath().getArray())}>
                        Save
                    </button>
                  : null
                }


    </MapView>
}

);

class MapComponent extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            zoom : 4,
            isOpen : false,
            openId : null,
            zoomUpdated : true,
            loaded : false,
            changeMapSettings : false,
        }
    }
    changePosition(pos, id){
        this.setState({pos, zoomUpdated : false, openId : id, isOpen:true, changeMapSettings : false } )
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
            openId : id===this.state.openId?null:id,
            isOpen : !(id===this.state.openId),
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
    polygonFinish(polygon) {
        window.google.maps.event.clearInstanceListeners(polygon);
        polygon.setMap(null);
        let path = (polygon.getPath().getArray());
        this.props.savePolygon(path);
    }
    render() {
        return (
            <MyMapComponent  pos={this.state.pos}
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
                             polygonFinish={(e)=>this.polygonFinish(e)}
                             polygons={this.props.polygons}
                             edit={this.props.edit}
                             activeItemId={this.props.activeItemId}
                             finishEdit={(path)=>this.props.finishEdit(path)}
            />

        )
    }
}

export default MapComponent;
