import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import moment from 'moment';
// import Collapsible from 'react-collapsible';
import HistoryBlock from '../../containers/DeviceListPage/historyBlock';
import {Image, Text, View} from "react-native"
import styles from "./deviceItemStyles"
/**
 * Return status of the devise base on it's last activity
 * @param detail Device detail
 * @returns {string} (active, offline, passive)
 */

const images = {
    green1: require("../../images/green1.png"),
    green2: require("../../images/green2.png"),
    green3: require("../../images/green3.png"),
    gray1: require("../../images/gray1.png"),
    gray2: require("../../images/gray2.png"),
    gray3: require("../../images/gray3.png"),
    signal_1: require("../../images/signal_1.png"),
    signal_2: require("../../images/signal_2.png"),
    signal_3: require("../../images/signal_3.png"),
    signal_4: require("../../images/signal_4.png"),
    signal_5: require("../../images/signal_5.png"),
}

function getDeviceStatus(detail) {
    let minutesFromNow = moment.duration(moment().diff(moment(detail.pos.t * 1000))).asMinutes();
    return minutesFromNow <= 10 ? "active" : minutesFromNow < 60 ? "passive" : "offline";
}

function getDeviceBattery(detail) {
    let batteryLevel;
    if(!detail.pos.p) {
        return <Text>0.00 V</Text>
    }
    if (detail.pos.p.battery_level) {
        let level = (detail.pos.p.battery_level - 1) / (100 / 3) + 1;
        let filename = `${getDeviceStatus(detail) === "active" ? "green" : "gray"}${parseInt(level)}`;
        console.log('filename ', filename);
        return (
          <View style={styles.batteryLevelWrap}>
              <Image style={styles.batteryIcon} source={images[filename]} />
              <Text style={styles.batteryLevel}>{detail.pos.p.battery_level}%</Text>
          </View>
        )
    } else {
        let voltage = detail.pos.p.battery ? parseFloat(detail.pos.p.battery) : 0;
        batteryLevel = <Text style={styles.batteryLevel}>{voltage.toFixed(2) + " V"}</Text>
    }
    return <View>{batteryLevel}</View>
}

function getGSMIcon(detail) {
    let getLevel = (gsmSignal, limits) => {
        let level = 0;
        for (let l of limits) {
            level++;
            if (gsmSignal < l)
                break;
        }
        return level
    };

    let isMinifinder = detail['hw'] === 646 || detail['hw'] === 2798;
    if (isMinifinder) {
        if (getDeviceStatus(detail) !== "offline") {
            let gsmSignal = detail['pos']['p']['gsm_csq'];
            if (detail['hw'] === 646) {
                let level = getLevel(gsmSignal, [10, 14, 17, 20, 999]);
                return <Image style={styles.batteryIcon} source={images[`signal_${level}`]} />
            } else {
                let level = getLevel(gsmSignal, [6, 9, 12, 20, 999]);
                return <Image style={styles.batteryIcon} source={images[`signal_${level}`]} />
            }
        }
        return <Image style={styles.batteryIcon} source={require("../../images/signal_offline.png")} />
    }
}

function getGPSIcon(detail) {
    let hardware = detail['hw'];
    let isMinifinder = hardware === 646 || hardware === 2798;
    if (isMinifinder) {
        let status = getDeviceStatus(detail);
        let gpsSignal = detail['pos']['p']['sats_in_view'];
        if (status !== "offline" || gpsSignal < 2) {
            return <Image style={styles.batteryIcon} source={require("../../images/satellite.png")} />
        } else {
          return <Image style={styles.batteryIcon} source={require("../../images/satellite_offline.png")} />
        }
    }
    return null
}

function getSpeedIcon(detail) {
    let status = getDeviceStatus(detail);
    let speed = detail['pos']['s'];
    if (status !== "offline") {
        return speed > 0 ?
          <Image style={styles.batteryIcon} source={require("../../images/arrow-right.png")} /> :
          <Image style={styles.batteryIcon} source={require("../../images/arrow-minus.png")} />;
    } else {
        return speed > 0 ?
          <Image style={styles.batteryIcon} source={require("../../images/arrow-right-gray.png")} /> :
          <Image style={styles.batteryIcon} source={require("../../images/arrow-minus-gray.png")} />;
    }
}

const DeviceStatuses = ({detail}) => {
    if (detail) {
        return <View style={styles.deviceStatusWrap}>
                  {getDeviceBattery(detail)}
                  {getGPSIcon(detail)}
                  {getGSMIcon(detail)}
                  {getSpeedIcon(detail)}
                </View>
    }
    return null

};

DeviceStatuses.propTypes = {
    Detail: PropTypes.shape({
        detail: PropTypes.object
    }),
    changeMap: PropTypes.func

};


const Trigger = ()=>{
    return <div className='trigger-more'><img src={require('../../images/more.png')} alt=""/></div>
};
const HistoryTrigger = ()=> {
    return <div className='history-trigger'>
                <Image source={require('../../images/pin-mini.png')} />
                <span>History</span>
            </div>
};


const DeviceItem = ({item, changeMap , openTrigger, changeTrigger, showHistory, active}) => {
    const {nm, detail, id} = item;

    const status = detail ? getDeviceStatus(detail) : "";
    const time = status === "active" ?
        <Image style={styles.activenessIcon} source={require("../../images/timegreen.png")} />:
        status === "passive" ?
          <Image style={styles.activenessIcon} source={require("../../images/timeyellow.png")} /> :
          <Image style={styles.activenessIcon} source={require("../../images/timered.png")} />;

    return (
        <View style={styles.deviceItem}>
            <View style={active ? styles.deviceMainInfo : [styles.deviceMainInfo, styles.deviceMainInfoActive] }
                  onPress={changeMap}>
                <Text style={styles[`deviceName${status}`]}>
                    {nm}
                </Text>
                <View style={styles.deviceMainInfoDescription}>
                    <Text style={styles.timeAgoWrap}>
                      {time} {detail ? <Text>{moment(detail.pos.t * 1000).fromNow()}</Text> : null}
                    </Text>
                    {/*<br/>*/}
                    <DeviceStatuses detail={detail}/>
                </View>
            </View>
            {/*<Collapsible handleTriggerClick={changeTrigger} trigger={ <Trigger  /> }*/}
                         {/*open={openTrigger === id} >*/}
                {/*<Collapsible trigger={<HistoryTrigger/>}>*/}
                   {/*<HistoryBlock showHistory={showHistory} id={id}/>*/}
                {/*</Collapsible>*/}
            {/*</Collapsible>*/}

        </View>

    );
};

DeviceItem.propTypes = {
    Item: PropTypes.shape({
        nm: PropTypes.string.isRequired,
        detail: PropTypes.object
    }),
    changeMap: PropTypes.func,
    changeTrigger : PropTypes.func,
    showHistory : PropTypes.func
};

export default DeviceItem;