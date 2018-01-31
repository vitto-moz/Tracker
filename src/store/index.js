import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import user from '../reducers/userReducer';
import devices from '../reducers/devicesReducer';
import reduxReset from 'redux-reset'
import { composeWithDevTools } from 'remote-redux-devtools';


const rootReducer = combineReducers({
    user,
    devices,
});

const initialState = {};

export default function configureStore() {
    let store;

    if (module.hot && __DEV__) {
        store = createStore(
            rootReducer,
            initialState,
            composeWithDevTools(
                applyMiddleware(thunkMiddleware),
                reduxReset()
            )
        );
    } else {
        store = createStore(
            rootReducer,
            initialState,
            compose(applyMiddleware(thunkMiddleware), reduxReset(), f => f),

        );
    }

    return store;
}