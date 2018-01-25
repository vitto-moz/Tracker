import React, {Component} from 'react';
// import '../../containers/deviceList/DeviceList.css';
// import DeviceItem from "../../components/deviceList/deviceItem";
import {FlatList, Text, View} from "react-native"
// import { Scrollbars } from 'react-custom-scrollbars';
import styles from './deviceListStyles';
import DeviceItem from "../DeviceItem/index"


class DeviceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openTrigger : null,
        }
    }
    changeTrigger = (id) => {
      if (id === this.state.openTrigger) this.setState({ openTrigger : null })
      else this.setState({ openTrigger : id})
    }

    getItemsList = () => {
      if(this.props.loaded){
        return <FlatList
          data={this.props.items}
          keyExtractor={item => item.id}
          extraData={this.state}
          renderItem={({item}) => {
            return <DeviceItem item={item}
                               changeMap={ ()=> this.props.changeMapDirection(item.id) }
                               active={ item.id === this.props.activeItemId }
                               changeTrigger={ () => this.changeTrigger(item.id) }
                               openTrigger={ this.state.openTrigger }
                               showHistory={ (value)=>this.props.showHistory(item.id, value)}/>
          }}
        />
      }
    }

    render() {
        return !this.props.loaded ? null :
          <View style={this.props.showList ? styles.deviceListWrap : [styles.deviceListWrap, styles.deviceListWrapActive]}>
            <Text style={styles.deviceListTitle}>
                Devices : {this.props.items.length}
            </Text>
            {this.getItemsList()}
          </View>
    }
}


export default DeviceList

