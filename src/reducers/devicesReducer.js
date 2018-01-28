import {DEVICE_ACTIONS} from '../actions/deviceActions';
import {USER_ACTIONS} from '../actions/userActions'
function initializeState() {
    let initObj = {
      loaded : false,
      devices : [],
      error : null,
      geoJSON : null,
      coordinates : null
    };

    return Object.assign({}, initObj);
}

export default function devices(state = initializeState(), action = {}) {
    switch(action.type){
        case USER_ACTIONS.LOGIN_SUCCESS : {
            return {
                ...state,
                redirect : false
            }
        }
        case DEVICE_ACTIONS.GET_DEVICE_HISTORY_REQUEST:{
            return {
                ...state,
                type: action.type,
                history_load : true
            }
        }
        case DEVICE_ACTIONS.GET_DEVICE_HISTORY_FAILURE:{
            return {
                ...state,
                type: action.type,
                history_load : false
            }
        }
        case DEVICE_ACTIONS.GET_DEVICE_HISTORY_SUCCESS:{
            return {
                ...state,
                type: action.type,
                geoJSON : action.payload.geoJSON.map(point => ({
                    latitude: point.lat,
                    longitude: point.lng
                })),
                coordinates : action.payload.coordinates,
                history_load : false
            }
        }
        case DEVICE_ACTIONS.GET_DEVICES_REQUEST : {
            return {
                ...state,
                error : null,
                type : action.type,
                redirect : false
            }
        }
        case DEVICE_ACTIONS.GET_DEVICES_SUCCESS : {
            return  {
                ...state,
                ...action.payload,
                loaded : true,
                error : null,
                type : action.type,
                redirect : false
            }
        }
        case DEVICE_ACTIONS.GET_DEVICES_FAILURE : {
            return {
                ...state,
                error : action.payload.message,
                redirect : action.payload.redirect,
                loaded  : false,
                type : action.type
            }
        }
        case DEVICE_ACTIONS.GET_DEVICE_REQUEST : {
            return {
                ...state,
                type : action.type,
                gettingInfo : true
            }
        }
        case DEVICE_ACTIONS.GET_DEVICE_SUCCESS : {
            let items = [...state.items];
            let indexDevice = state.items.findIndex(item => {
                return item.id === action.payload.id;
            });
            if(indexDevice !== -1){
                items[indexDevice].detail = action.payload
            }
            return {
                ...state,
                type : action.type,
                items
            }
        }
        case DEVICE_ACTIONS.GET_DEVICE_FAILURE : {
            return {
                ...state,
                type : action.type
            }
        }
        default : {
            return state
        }
    }
}