import React, { Component } from 'react';
import Header from "../../components/Header";
import DeviceList from "../../components/DeviceList";
import { connect } from "react-redux";
import { getDevices, getDevice, getDeviceHistory, getDeviceGeoInfo } from '../../actions/deviceActions';
import { ActivityIndicator, AsyncStorage, Text, View} from "react-native"
import { Actions } from "react-native-router-flux"
import styles from "./DeviceListPageStyles"
import MapComponent from "../../components/Map"
import Bottom from "../../components/Bottom"
import ModalGeo from "../../components/ModalGeo"
import SettingsModal from "../../components/Modal"
import { BackHandler } from "react-native"

class DeviceListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            items: [],
            mapType: 'standard',
            showModal: false,
            showDrawModal: false,
            activeItemId: null,
            drawing: false,
            edit: false
        }
    }

    setAsyncInitialState = async () => {
      const sPolygons = await AsyncStorage.getItem('polygons')
      const polygons = JSON.parse(sPolygons) || []
      const token = await AsyncStorage.getItem('token')
      this.setState({polygons, ssid: token})
      return token
    }

    componentDidMount() {
        this.setAsyncInitialState().then((token) => {
            if (!token) {
                Actions.login();
            }
            setTimeout(() => {
              if (this.props.devices.loaded) {
                this.setState({items: this.props.devices.items});
                this.getDetailDeviceInfo(this.props.devices.items)
              } else {
                this.props.dispatch(getDevices(token));
              }
            }, 500)
        })
        BackHandler.addEventListener('hardwareBackPress', this.onBackHandler);
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler);
    }

    onBackHandler = () => {
      if (this.state.showList) {
        this.setState({showList: false})
        return true;
      } else {
        this.props.dispatch({type: 'RESET'});
        AsyncStorage.removeItem('token', () => Actions.login());
        return false;
      }
    }

    getDetailDeviceInfo(devices) {
        for (let i = 0; i < devices.length; i++) {
            this.props.dispatch(
                getDevice(
                    this.state.ssid,
                    devices[i].id,
                    devices.length - 1 === i
                )
            )
        }
    }

    getDeviceGeoInfo(devices) {
        for (let i = 0; i < devices.length; i++) {
            this.props.dispatch(getDeviceGeoInfo(devices[i].id))
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.devices.loaded && !nextProps.devices.gettingInfo) {
            this.setState({items: nextProps.devices.items});
            if (!nextProps.devices.gettingInfo) {
                this.getDetailDeviceInfo(nextProps.devices.items);
                this.getDeviceGeoInfo(nextProps.devices.items);
            }
        }
        if (nextProps.devices.redirect) {
          AsyncStorage.removeItem('token', () => Actions.login());
        }
    }

    toggleList() {
        this.setState((prevState, props)=>({showList: !prevState.showList}))
    }

    getActiveItems() {
        return this.props.devices.loaded ? this.props.devices.items.filter((item) => item.detail) : []
    }

    changeMapDirection(id) {
        this.setState({activeItemId: id});
        let item = this.props.devices.items.find((item) => item.id === id);
        if (item.detail.pos.y) {
            let pos = {latitude: item.detail.pos.y, longitude: item.detail.pos.x};
            this.map.changePosition(pos, id);
        }
    }

    changeMapType(type) {
        this.setState({
            mapType: type,
            showModal: false
        })
    }

    showModal() {
        this.setState({
            showModal: true
        })
    }

    logout() {
        this.props.dispatch({type: 'RESET'});
        AsyncStorage.removeItem('token', () => Actions.login())
    }

    showItemHistory(id, value) {
        this.props.dispatch(getDeviceHistory(this.state.ssid, id, value))

    }

    createPolygon() {

        this.setState({
            drawing: true,
            showDrawModal: false
        })

    }

    finishDraw() {
        this.setState({
            drawing: false
        })
    }

    showDrawModal() {
        this.setState({
            showDrawModal: true
        })
    }

    closeDrawModal() {
        this.setState({
            showDrawModal: false
        })
    }

    addPolygon(path) {
        let polygons = [...this.state.polygons];
        path = Array.from(path)
        let newPolygon = {
            id: this.state.activeItemId,
            path: path
        };
        polygons.push(newPolygon);
        AsyncStorage.setItem('polygons', JSON.stringify(polygons));
        this.setState({
            polygons,
            drawing: false
        });
    }

    makeActive(id) {
        this.setState({
            activeItemId: id
        })
    }

    isPolygonPresent() {
        let polygon = this.state.polygons
          ? this.state.polygons.find((item) => item.id === this.state.activeItemId) : null
        return !!polygon;
    }

    deletePolygon() {
        let polygons = [...this.state.polygons];
        let indexOfPolygon = polygons.findIndex((item) => {
            return item.id === this.state.activeItemId;
        })
        if (indexOfPolygon !== -1) {
            polygons.splice(indexOfPolygon, 1);
            AsyncStorage.setItem('polygons', JSON.stringify(polygons));
            this.setState({
                polygons,
                showDrawModal: false
            })
        }
    }

    editPolygon() {
        this.setState({
            edit: true,
            showDrawModal: false
        })
    }

    finishEdit(path) {
        let polygons = [...this.state.polygons];
        let indexOfEditable = polygons.findIndex((item) => {
            return item.id === this.state.activeItemId;
        });
        polygons[indexOfEditable].path = path;
        AsyncStorage.setItem('polygons', JSON.stringify(polygons));
        this.setState({
            edit: false,
            polygons
        })
    }

    render() {
        return (
            <View style={styles.devicePageWrapper}>
                <Header toggleList={() => this.toggleList()}
                        logout={() => this.logout()}
                />
              {!this.props.devices.lastResponse
                  ? <View style={[styles.loaderWrap]}>
                    {/*<ActivityIndicator size="large" color="grey" />*/}
                      <Text style={styles.loadingText}>Loading...</Text>
                  </View>
                  : [
                      <MapComponent
                        key="1"
                        edit={this.state.edit}
                        makeActive={this.makeActive.bind(this)}
                        polygons={this.state.polygons}
                        savePolygon={(polygon) => this.addPolygon(polygon)}
                        finishDraw={() => this.finishDraw()}
                        drawing={this.state.drawing}
                        activeItemId={this.state.activeItemId}
                        coordinates={this.props.devices.coordinates}
                        geoJSON={this.props.devices.geoJSON}
                        items={this.getActiveItems()}
                        ref={map => this.map = map}
                        mapType={this.state.mapType}
                        finishEdit={this.finishEdit.bind(this)}
                      />,
                      <DeviceList
                          key="2"
                          changeMapDirection={(id) => this.changeMapDirection(id)}
                          loaded={this.props.devices.loaded}
                          items={this.props.devices.items}
                          showList={this.state.showList}
                          activeItemId={this.state.activeItemId}
                          renderToHardwareTextureAndroid={this.state.showList}
                          showHistory={(id, value) => this.showItemHistory(id, value)
                          }/>
                    ]
              }



                <Bottom showModal={() => this.showModal()} showDrawModal={() => this.showDrawModal()}/>

                <SettingsModal mapType={this.state.mapType}
                                changeMapType={(type) => this.changeMapType(type)}
                                showModal={this.state.showModal}/>

                <ModalGeo editPolygon={() => this.editPolygon()}
                          deletePolygon={this.deletePolygon.bind(this)}
                          isPolygonPresent={this.isPolygonPresent()}
                          showModal={this.state.showDrawModal}
                          createPolygon={() => this.createPolygon()}
                          closeDrawModal={() => this.closeDrawModal()}
                          activeItemId={this.state.activeItemId}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const {devices, user} = state;
    return {devices, ssid: user.ssid}
}

export default connect(mapStateToProps)(DeviceListPage)
