import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";

import App from "./components/App/App";
import ErrorBoundry from "./components/ErrorBoundry/ErrorBoundry";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./redux/configureStore";
import { AppState } from "./redux";
import { AuthRestProvider } from './components/Context/AuthContext'
import AuthRestAPI from "./service/AuthRestAPI";

const store = configureStore({} as AppState);
const authRestAPI: AuthRestAPI = new AuthRestAPI();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <AuthRestProvider value={authRestAPI}>
        <App />
      </AuthRestProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
