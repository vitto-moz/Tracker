import React, {Component} from 'react';
import {getDeviceHistory} from '../../actions/deviceActions';
import {connect} from "react-redux";

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
        this.state = {
            pickedValue: 0,
            ssid: localStorage.getItem('token') ? localStorage.getItem('token') : this.props.ssid
        }
    }

    pickValue(value) {
        this.setState({
            pickedValue: value
        })
    }

    getHistory() {
        this.props.dispatch(getDeviceHistory(this.state.ssid, this.props.id, HISTORY_ARR[this.state.pickedValue].time))
    }

    render() {
        const historyTimes = HISTORY_ARR.map((item, index) => {
            return <li key={index} onClick={() => this.pickValue(item.value)}
                       className={this.state.pickedValue === index ? 'active' : ''}><p>Past {item.time}</p></li>
        });
        return <ul className='history-list '>
            {historyTimes}
            <button type='button'
                    onClick={() => {
                        this.getHistory()
                    }}>{this.props.history_load ? 'Loading' : 'View WayPoints'}</button>
        </ul>
    }

}

function mapStateToProps(state) {
    const {user, devices} = state;
    return {ssid: user.ssid, history_load: devices.history_load}
}

export default connect(mapStateToProps)(HistoryBlock)
