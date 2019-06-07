import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import { Container } from "reactstrap";
import { Route, Switch } from "react-router-dom";
import ClothingPage from "./components/ClothingPage";
import "./App.css";

function App() {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/article" component={ClothingPage} />
        <Route path="/article/:articleId" component={ClothingPage} />
        <Route path="/profil" component={Profile} />
        <Route path="/profil/:profilId" component={Profile} />
      </Switch>
    </Container>
  );
}

export default App;
