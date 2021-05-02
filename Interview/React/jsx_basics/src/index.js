import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Counter from './Container/Counter'
import Clock from './Container/Clock'
import App from './App';
import reportWebVitals from './reportWebVitals';
import Thermo from './Container/Thermometer/Thermometer'


ReactDOM.render(
  <>
  <Thermo />
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
