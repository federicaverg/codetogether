import React from 'react';
import ReactDOM from 'react-dom';
import './App.less';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
