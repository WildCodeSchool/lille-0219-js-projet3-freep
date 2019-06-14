import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import { Container } from "reactstrap";
import { Route, Switch } from "react-router-dom";
import ClothingPage from "./components/ClothingPage";
import NavFreep from "./components/Navbar";
import "./style/navbar.css";
import PartnerPage from "./components/PartnerPage";
import MessagingPage from "./components/MessagingPage";

function App() {
  return (
    <Container>
      <header>
        <NavFreep />
      </header>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/article" component={ClothingPage} />
        <Route path="/article/:articleId" component={ClothingPage} />
        <Route path="/profil" component={Profile} />
        <Route path="/profil/:profilId" component={Profile} />
        <Route path="/partenaire" component={PartnerPage} />
        <Route path="/messagerie" component={MessagingPage} />
        <Route path="message" component={Message} />
      </Switch>
    </Container>
  );
}

export default App;
