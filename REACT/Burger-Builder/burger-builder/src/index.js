import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom'
//Wraps the App component to provide routing functionality throughout the application
import App from './App';
import {Provider} from 'react-redux'

import reportWebVitals from './reportWebVitals';
// Helps to check performance
import {createStore, applyMiddleware,compose, combineReducers } from 'redux'

import BurgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'
import thunk from 'redux-thunk'
import authReducer from './store/reducers/auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// combineReducers -> helps to combine multiple reducers and return an object 
const rootReducer = combineReducers({
  burgerBuilder:BurgerBuilderReducer,
  order:orderReducer,
  auth:authReducer
}) 
// createStore => Creates a Redux store that holds the complete state tree of your app. 
// There should only be a single store in your app.
const store = createStore(rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
// composeEnhancers => Provides functionality to enhance the store with third party capablities
// and can apply middlewares

// PROVIDER = //Wraps the App component to provide global store throughout the application
// BrowserRouter = //Wraps the App component to provide routing functionality throughout the application

const app = (
  <Provider store = {store}>
  
  <BrowserRouter>
  <App />
  </BrowserRouter>
  </Provider>
)
ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
