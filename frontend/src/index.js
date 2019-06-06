import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import ClothingPage from "./components/ClothingPage";
import Profile from "./components/Profile";

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/article" component={ClothingPage} />
      <Route path="/article/:articleId" component={ClothingPage} />
      <Route path="/profil" component={Profile} />
      <Route path="/profil/:profilId" component={Profile} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
