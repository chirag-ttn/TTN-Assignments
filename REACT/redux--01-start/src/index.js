import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'

import registerServiceWorker from './registerServiceWorker';
import counter from './store/reducer/counter'
import results from './store/reducer/results'
const rootReducer = combineReducers({
    ctr:counter,
    res:results
})
const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
