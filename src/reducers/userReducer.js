import {USER_ACTIONS} from '../actions/userActions';

function initializeState() {
    let initObj = {
      loading : false,
      user : null,
      error : null
    };

    return Object.assign({}, initObj);
}

export default function user(state = initializeState(), action = {}) {
    switch(action.type){
        case USER_ACTIONS.LOGIN_REQUEST : {
            return {
                ...state,
                loading : true,
                error : null,
                type : action.type
            }
        }
        case USER_ACTIONS.LOGIN_SUCCESS : {
            return  {
                ...state,
                ...action.payload,
                loading : false,
                error : null,
                type : action.type,

                user : action.payload.user
            }
        }
        case USER_ACTIONS.LOGIN_FAILURE : {
            return {
                ...state,
                error : action.error.message,
                loading  : false,
                type : action.type
            }
        }
        default : {
            return state
        }
    }
}