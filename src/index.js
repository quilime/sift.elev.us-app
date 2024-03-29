import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from 'react-redux';
import { store, history } from './data/store';
import { ConnectedRouter } from "connected-react-router";
import { CookiesProvider } from 'react-cookie';
// uncomment if you would like to serve the final site with service workers
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </ConnectedRouter>
  </Provider>, document.getElementById("root"));
// registerServiceWorker();