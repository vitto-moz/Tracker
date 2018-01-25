import React, {Component} from 'react';
import {getDeviceHistory} from '../../../actions/deviceActions';
import {connect} from "react-redux";
import {Text, View} from "react-native"
import {Button} from "react-native-elements"
import styles from "./historyBlockStyles"
import { AsyncStorage } from "react-native"

const HISTORY_ARR = [
    {time: '3 hours', value: 0},
    {time: '8 hours', value: 1},
    {time: '24 hours', value: 2},
    {time: '3 days', value: 3},
    {time: '7 days', value: 4},
];

class HistoryBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {pickedValue: 0}
    }

  setAsyncInitialState = async () => {
    const token = await AsyncStorage.getItem('token')
    this.setState({
      pickedValue: 0,
      ssid: token || this.props.ssid
    })
  }

  componentWillMount() {
    this.setAsyncInitialState()
  }

    pickValue(value) {
        this.setState({pickedValue: value})
    }

    getHistory() {
        this.props.dispatch(getDeviceHistory(this.state.ssid, this.props.id, HISTORY_ARR[this.state.pickedValue].time))
    }

    render() {
        const historyTimes = HISTORY_ARR.map((item, index) => {
            return <View key={index}
                         onPress={() => this.pickValue(item.value)}
                            className={this.state.pickedValue === index ? 'active' : ''}
                    >
                        <Text>Past {item.time}</Text>
                    </View>
        });
        return <View className='history-list '>
                {historyTimes}
                <Button containerViewStyle={styles.loginSubmitButton}
                  backgroundColor='#00aeef'
                  title={this.props.history_load ? 'Loading' : 'View WayPoints'}
                  onPress={() => this.getHistory()}/>
              </View>

    }

}

function mapStateToProps(state) {
    const {user, devices} = state;
    return {ssid: user.ssid, history_load: devices.history_load}
}

export default connect(mapStateToProps)(HistoryBlock)
