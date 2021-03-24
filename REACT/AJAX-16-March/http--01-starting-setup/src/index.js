import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Setting up default configuration 
// ****************************************************************
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/'
axios.defaults.headers.common['Authorization']='AUTH_TOKEN'
axios.defaults.headers.post['Content-Type'] = 'application/json'


// Interceptors
// ***********************************************************
axios.interceptors.request.use(request=>{
    console.log(request)
    return request;
},error=>{
    console.log(error)
    return Promise.reject(error)
})

axios.interceptors.response.use(response=>{
    console.log(response)
    return response;
},error=>{
    console.log(error)
})
// ***********************************************************
ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();

