import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./src/reducers/index";
import App from "./src/index";

const store = createStore(reducer);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
