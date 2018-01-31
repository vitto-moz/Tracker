import {callApi} from '../utils/apiUtils';
import moment from 'moment'

export const  DEVICE_ACTIONS = {
    GET_DEVICES_REQUEST : "GET_DEVICES_REQUEST",
    GET_DEVICES_SUCCESS : 'GET_DEVICES_SUCCESS',
    GET_DEVICES_FAILURE : 'GET_DEVICES_FAILURE',
    GET_DEVICE_REQUEST: 'GET_DEVICE_REQUEST',
    GET_DEVICE_SUCCESS: 'GET_DEVICE_SUCCESS',
    GET_DEVICE_FAILURE: 'GET_DEVICE_FAILURE',
    GET_DEVICE_HISTORY_REQUEST: 'GET_DEVICE_HISTORY_REQUEST',
    GET_DEVICE_HISTORY_SUCCESS: 'GET_DEVICE_HISTORY_SUCCESS',
    GET_DEVICE_HISTORY_FAILURE: 'GET_DEVICE_HISTORY_FAILURE',
    GET_DEVICE_GEO_REQUEST: 'GET_DEVICE_GEO_REQUEST',
    GET_DEVICE_GEO_SUCCESS: 'GET_DEVICE_GEO_SUCCESS',
    GET_DEVICE_GEO_FAILURE: 'GET_DEVICE_GEO_FAILURE',
    CREATE_DEVICE_GEO_REQUEST: 'CREATE_DEVICE_GEO_REQUEST',
    CREATE_DEVICE_GEO_SUCCESS: 'CREATE_DEVICE_GEO_SUCCESS',
    CREATE_DEVICE_GEO_FAILURE: 'CREATE_DEVICE_GEO_FAILURE',
    LAST_DEVICE_RESPONSE: 'LAST_DEVICE_RESPONSE',
};



export function getDeviceHistory(ssid, id, value){
    const config = {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        }

    };
    let today = moment().unix();
    let dataArr = value && value.split(' ');
    let search_date = moment().subtract(dataArr[0], dataArr[1] ).unix();

    let searchQuery = {
        itemId:id,
        type : 1,
        ival1 : search_date, //beginning value
        ival2 : today, //end value
        flags : 0,
        flagsMask : 0,
        loadLocations : true,
        loadCount : '0xffffffff'
    };

    return callApi(
        `ajax.html?svc=messages/load_interval&params=${JSON.stringify(searchQuery)}&ssid=${ssid}`,
        config,
        getDeviceHistoryRequest(),
        getDeviceHistorySuccess,
        getDeviceHistoryFailure,
    )
}
function getDeviceHistoryRequest() {
    return {
        type : DEVICE_ACTIONS.GET_DEVICE_HISTORY_REQUEST
    }
}

function lastDeviceResponse() {
    return {
        type : DEVICE_ACTIONS.LAST_DEVICE_RESPONSE
    }
}

function getDeviceHistorySuccess(response) {
    if(response.error){
        if(response.error === 1){
            return getDeviceHistoryFailure({redirect : true, message: "" })
        }else{
            return getDeviceHistoryFailure({redirect : false, message: "wrong credentials"});
        }
    }

    let coords = response.messages;
    let coordinates = false;

    let geoJSON = [];
    coords.forEach((item, index)=> {
        if(!coordinates &&item.x && item.y){
            coordinates = {
                maxLat : item.y,
                maxLng : item.x,
                minLat : item.y,
                minLng : item.x
            }
        }else {
            if(coordinates){
                if(item.x > coordinates.maxLng){
                    coordinates.maxLng = item.x
                }
                if(item.x < coordinates.minLng){
                    coordinates.minLng = item.x
                }
                if(item.y > coordinates.maxLat){
                    coordinates.maxLat = item.y
                }
                if(item.y < coordinates.minLat) {
                    coordinates.minLat = item.y
                }
            }

        }

        if(item.x && item.y) geoJSON.push(  {lat : item.y, lng : item.x});
    });

    return {
        type : DEVICE_ACTIONS.GET_DEVICE_HISTORY_SUCCESS,
        payload : {
            geoJSON : geoJSON,
            coordinates : coordinates
        }
    }
}

function getDeviceHistoryFailure(error) {
    return {
        type : DEVICE_ACTIONS.GET_DEVICE_HISTORY_FAILURE,
        payload : error,
    }
}

export function getDevice(ssid, id, last) {
    const config = {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return callApi(
        `ajax.html?svc=core/search_item&params=${JSON.stringify({"itemId":id,
            "flags":0})}&ssid=${ssid}`,
        config,
        getDeviceRequest(),
        getDeviceSuccess.bind(null, last),
        getDeviceFailure.bind(null, last),
    )
}
export function getDevices(ssid) {

    let dataFromApi = {
        "spec":{
            "itemsType":"avl_unit",
            "propName":"sys_name",
            "propValueMask":"*",
            "sortType":"sys_name"
        },
        "force":1,
        "flags":1,
        "from":0,
        "to":0xffffffff
    };

    const config = {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        }

    };
    return callApi(
        `ajax.html?svc=core/search_items&params=${JSON.stringify(dataFromApi)}&ssid=${ssid}`,
        config,
        getDevicesRequest(),
        getDevicesSuccess,
        getDevicesFailure,
    )
}

function getDevicesRequest() {
    return {
        type : DEVICE_ACTIONS.GET_DEVICES_REQUEST
    }
}

function getDevicesSuccess(response) {
    if(response.error){
        if(response.error === 1){
            return getDevicesFailure({redirect : true, message: "" })
        }else{
            return getDevicesFailure({redirect : false, message: "wrong credentials"});
        }
    }
    return {
        type : DEVICE_ACTIONS.GET_DEVICES_SUCCESS,
        payload : response
    }
}

function getDevicesFailure(error) {
    return {
        type : DEVICE_ACTIONS.GET_DEVICES_FAILURE,
        payload : error,

    }
}


function getDeviceRequest() {
    return {
        type : DEVICE_ACTIONS.GET_DEVICE_REQUEST
    }
}


function getDeviceSuccess(last, response) {
    if(response.error){
        return getDeviceFailure(last, {message: "wrong credentials"});
    }
    return (dispatch) => {
        last && dispatch(lastDeviceResponse())
        dispatch({ type : DEVICE_ACTIONS.GET_DEVICE_SUCCESS, payload : response })
    }
}

function getDeviceFailure(last, error) {
    return (dispatch) => {
        console.log('last ', last);
        last && dispatch(lastDeviceResponse())
        dispatch({ type : DEVICE_ACTIONS.GET_DEVICE_FAILURE, error : error })
    }

}

export function getDeviceGeoInfo(id) {
    const config = {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        }

    };
    return callApi(
        `geo/${id}`,
        config,
        getDeviceGeoRequest(),
        getDeviceGeoSuccess,
        getDeviceGeoFailure,
    )
}

function getDeviceGeoRequest() {
    return {
        type : DEVICE_ACTIONS.GET_DEVICE_GEO_REQUEST
    }
}
function getDeviceGeoSuccess(response) {
    return {
        type : DEVICE_ACTIONS.GET_DEVICE_GEO_SUCCESS,
        payload : response
    }
}

function getDeviceGeoFailure(error) {
    return {
        type : DEVICE_ACTIONS.GET_DEVICE_GEO_FAILURE
    }
}


export function createDeviceGeoInfo(id) {
    const config = {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        }

    };
    return callApi(
        `geo/${id}`,
        config,
        createDeviceGeoRequest(),
        createDeviceGeoSuccess,
        createDeviceGeoFailure,
    )
}

function createDeviceGeoRequest() {
    return {
        type : DEVICE_ACTIONS.CREATE_DEVICE_GEO_REQUEST
    }
}
function createDeviceGeoSuccess(response) {
    return {
        type : DEVICE_ACTIONS.CREATE_DEVICE_GEO_SUCCESS,
        payload : response
    }
}

function createDeviceGeoFailure(error) {
    return {
        type : DEVICE_ACTIONS.CREATE_DEVICE_GEO_FAILURE
    }
}