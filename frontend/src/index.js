import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { createBrowserHistory } from "history";
<<<<<<< HEAD

// const
=======
const history = createBrowserHistory();

>>>>>>> 9a192085e101d699aab2b5966658452d76651d14

ReactDOM.render(
  <BrowserRouter history={history}>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
