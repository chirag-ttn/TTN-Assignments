import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, combineReducers,applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'

import registerServiceWorker from './registerServiceWorker';
import counter from './store/reducer/counter'
import results from './store/reducer/results'
import thunk from 'redux-thunk'
const rootReducer = combineReducers({
    ctr:counter,
    res:results
})
const logger = store=>{
    return next=>{
        return action=>{
            console.log('logger  dispatched',action)
            const result = next(action);
            console.log('logger store',store.getState());
            return action;
        }
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
