import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import { Container } from "reactstrap";
import { Route, Switch } from "react-router-dom";
import ClothingPage from "./components/ClothingPage";
import NavFreep from "./components/NavFreep";
import "./style/NavFreep.scss";
import PartnerPage from "./components/PartnerPage";
import MessagingPage from "./components/MessagingPage";
import Message from "./components/Message";
import Footer from "./components/Footer";

function App() {
  return (
    <React.Fragment>
      <header>
        <NavFreep />
      </header>
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/article/:articleId" component={ClothingPage} />
          <Route path="/profil/:profileId" component={Profile} />
          <Route path="/users/:userId" component={ClothingPage} />
          <Route path="/partenaire" component={PartnerPage} />
          <Route path="/messagerie/:idReader" component={MessagingPage} />
          <Route path="/message/:P1/:P2" component={Message} />
        </Switch>
        <Footer />
      </Container>
    </React.Fragment>
  );
}

export default App;
