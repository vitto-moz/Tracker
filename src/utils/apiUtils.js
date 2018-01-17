import "isomorphic-fetch";
import {HOST} from "./config";

export function checkStatus(response) {

    if (!response.ok) {
        // (response.status < 200 || response.status > 300)
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
    return response;
}


export function parseJSON(response) {


    return response.json();
}

/**
 * A utility to call a restful service.
 *
 * @param url The restful service end point.
 * @param config The config object of the call. Can be null.
 * @param request The request action.
 * @param onRequestSuccessCallbacks The callback function to create request success action.
 *                 The function expects response json payload as its argument.
 * @param onRequestFailure The callback function to create request failure action.
 *                 The function expects error as its argument.
 */
export function callApi(url,
                        config,
                        request,
                        onRequestSuccessCallbacks,
                        onRequestFailure) {
    return dispatch => {

        dispatch(request);
        let format_endpoint = function (url) {
            return HOST  + url
        };

        return fetch(format_endpoint(url), config)
            .then(checkStatus)
            .then(parseJSON)
            .then(json => {
                onRequestSuccessCallbacks instanceof Array
                    ? onRequestSuccessCallbacks.map(fn => dispatch(fn(json)))
                    : dispatch(onRequestSuccessCallbacks(json));
            })
            .catch(error => {

                const response = error.response;
                if (response === undefined) {
                    let message = 'Something went wrong, we’re currently fixing it';
                    dispatch(onRequestFailure(message));
                } else {
                    error.status = response.status;

                    switch (error.status) {
                        case 413 : {
                            let message = 'The image is too large, try again with another image';
                            dispatch(onRequestFailure(message));
                            break;
                        }
                        case 500 : {
                            let message = 'Something went wrong, we’re currently fixing it';
                            dispatch(onRequestFailure(message));
                            break;
                        }
                        case 502 : {
                            let message = 'Server is not available';
                            dispatch(onRequestFailure(message));
                            break;
                        }
                        default : {
                            error.statusText = response.statusText;
                            response.text().then(text => {
                                try {
                                    const json = JSON.parse(text);
                                    error.message = json.message;
                                } catch (ex) {
                                    error.message = text;
                                }
                                dispatch(onRequestFailure(error.message));
                            });
                        }
                    }


                }
            });
    };
}