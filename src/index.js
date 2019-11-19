import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Router } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import store from './config/store.js'
import Main from './containers/Main.jsx'
//GTM
import TagManager from 'react-gtm-module';
const tagManagerArgs = {
    gtmId: 'GTM-KLGPSMS'
}
TagManager.initialize(tagManagerArgs)

ReactDOM.render(
  <Provider store={store}>
      <App />
 </Provider>, document.getElementById('root')
);

registerServiceWorker();
