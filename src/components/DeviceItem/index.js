import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import moment from 'moment';
// import Collapsible from 'react-collapsible';
import HistoryBlock from '../../containers/DeviceListPage/historyBlock';
import {Image} from "react-native"
/**
 * Return status of the devise base on it's last activity
 * @param detail Device detail
 * @returns {string} (active, offline, passive)
 */
function getDeviceStatus(detail) {
    let minutesFromNow = moment.duration(moment().diff(moment(detail.pos.t * 1000))).asMinutes();
    return minutesFromNow <= 10 ? "active" : minutesFromNow < 60 ? "passive" : "offline";
}

function getDeviceBattery(detail) {
    let batteryLevel;
    if(!detail.pos.p) {
        return <span>0.00 V</span>
    }
    if (detail.pos.p.battery_level) {
        let level = (detail.pos.p.battery_level - 1) / (100 / 3) + 1;
        let filename = `${getDeviceStatus(detail) === "active" ? "green" : "gray"}${parseInt(level)}.svg`;
        let img = <Image style={styles.batterycon} source={{uri: `../../images/${filename}`}} />
        return <span>{img} {detail.pos.p.battery_level} %</span>
    } else {
        let voltage = detail.pos.p.battery ? parseFloat(detail.pos.p.battery) : 0;
        batteryLevel = voltage.toFixed(2) + " V"
    }
    return <span>{batteryLevel}</span>
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
                return <Image style={styles.batterycon} source={{uri: `../../images/signal_${level}.svg`}} />
            } else {
                let level = getLevel(gsmSignal, [6, 9, 12, 20, 999]);
                return <Image style={styles.batterycon} source={{uri: `../../images/signal_${level}.svg`}} />
            }
        }
        return <Image style={styles.batterycon} source={require("../../images/signal_offline.svg")} />
    }
}

function getGPSIcon(detail) {
    let hardware = detail['hw'];
    let isMinifinder = hardware === 646 || hardware === 2798;
    if (isMinifinder) {
        let status = getDeviceStatus(detail);
        let gpsSignal = detail['pos']['p']['sats_in_view'];
        if (status !== "offline" || gpsSignal < 2) {
            return <Image style={styles.batterycon} source={require("../../images/satellite.svg")} />
        } else {
          return <Image style={styles.batterycon} source={require("../../images/satellite_offline.svg")} />
        }
    }
    return null
}

function getSpeedIcon(detail) {
    let status = getDeviceStatus(detail);
    let speed = detail['pos']['s'];
    if (status !== "offline") {
        return speed > 0 ?
          <Image style={styles.batterycon} source={require("../../images/arrow-right.svg")} /> :
          <Image style={styles.batterycon} source={require("../../images/arrow-minus.svg")} />;
    } else {
        return speed > 0 ?
          <Image style={styles.batterycon} source={require("../../images/arrow-right-gray.svg")} /> :
          <Image style={styles.batterycon} source={require("../../images/arrow-minus-gray.svg")} />;
    }
}

const DeviceStatuses = ({detail}) => {
    if (detail) {
        return <p>{getDeviceBattery(detail)} {getGPSIcon(detail)} {getGSMIcon(detail)}{getSpeedIcon(detail)}</p>
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
    return <div className='trigger-more'><img src={require('../../images/more.svg')} alt=""/></div>
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
        <Image style={styles.batterycon} source={require("../../images/timegreen.svg")} />:
        status === "passive" ?
          <Image style={styles.batterycon} source={require("../../images/timeyellow.svg")} /> :
          <Image style={styles.batterycon} source={require("../../images/timered.svg")} />;

    return (
        <View style={styles.deviceItem}>

            {/*<div className={`device-main-info ${active?'active': ''}`} onClick={changeMap}>*/}
                {/*<p className={`device-name ${status}`}>*/}
                    {/*{nm}*/}
                {/*</p>*/}
                {/*<span className="device-main-info-description">*/}
                {/*{time} {detail ? <span>{moment(detail.pos.t * 1000).fromNow()}</span> : null}*/}
                {/*<br/>*/}
                {/*<DeviceStatuses detail={detail}/>*/}
                {/*</span>*/}
            {/*</div>*/}
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