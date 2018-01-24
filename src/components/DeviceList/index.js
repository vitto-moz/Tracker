import React, {Component} from 'react';
// import '../../containers/deviceList/DeviceList.css';
// import DeviceItem from "../../components/deviceList/deviceItem";
import {Text, View} from "react-native"
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
    changeTrigger(id){
        if(id === this.state.openTrigger){
            this.setState({
                openTrigger : null
            })
        }else {
            this.setState({
                openTrigger : id
            })
        }

    }

    render() {
        let items =[];
      console.log('this.props.loaded ', this.props.loaded);
      if(this.props.loaded){
            items = this.props.items.map((item, index) => {
                return <DeviceItem item={item}
                                   key={item.id}
                                   changeMap={()=> this.props.changeMapDirection(item.id)}
                                   active={item.id === this.props.activeItemId}
                                   changeTrigger={()=>this.changeTrigger(item.id)}
                                   openTrigger={this.state.openTrigger}
                                   showHistory={(value)=>this.props.showHistory(item.id, value)}

                />
            });
        }
        const myScrollbar = {
            width: "100%",
            height: "100%",
        };

        const deviceListStyles = [styles.deviceListWrap]
        if (this.props.showList) deviceListStyles.push(styles.deviceListWrapActive)
        console.log('this.props.loaded ', this.props.loaded);
        return !this.props.loaded ? null :
                <View style={deviceListStyles}>
                    {/*<ul className='list-of-devices'>*/}
                        {/*<Scrollbars style={myScrollbar}>*/}
                            <Text style={styles.deviceListTitle}>
                                Devices : {this.props.items.length}
                            </Text>
                            {items}
                        {/*</Scrollbars>*/}
                    {/*</ul>*/}
                </View>
    }
}


export default (DeviceList)

