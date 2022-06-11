import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleWare from "redux-thunk";
import allReducers from "./redux/reducers";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const isDevelopment = true;
const store =
  isDevelopment
    ? createStore(
      allReducers,
      composeEnhancers(applyMiddleware(thunkMiddleWare))
    )
    : createStore(allReducers, applyMiddleware(thunkMiddleWare));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider
        autoDismiss={true}
        placement="bottom-right"
        newestOnTop={true}
      >
        <App />
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
