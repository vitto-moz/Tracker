import {callApi} from '../utils/apiUtils';

export const  USER_ACTIONS = {
    LOGIN_REQUEST : "LOGIN_REQUEST",
    LOGIN_SUCCESS : 'LOGIN_SUCCESS',
    LOGIN_FAILURE : 'LOGIN_FAILURE'
};

export function login(credentials) {
    const config = {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        }

    };
    return callApi(
        `ajax.html?svc=core/login&params=${JSON.stringify(credentials)}`,
        config,
        loginRequest(),
        loginSuccess,
        loginFailure,
    )
}

function loginRequest() {
    return {
        type : USER_ACTIONS.LOGIN_REQUEST
    }
}

function loginSuccess(response) {
    if(response.error){
        return loginFailure({message: "wrong credentials"});
    }
    return {
        type : USER_ACTIONS.LOGIN_SUCCESS,
        payload : response
    }
}

function loginFailure(error) {
    return {
        type : USER_ACTIONS.LOGIN_FAILURE,
        error : error
    }
}
