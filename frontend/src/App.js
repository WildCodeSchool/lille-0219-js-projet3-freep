import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import { Container } from "reactstrap";
import { Route, Switch, Redirect } from "react-router-dom";
import ClothingPage from "./components/ClothingPage";
import NavFreep from "./components/NavFreep";
import "./style/NavFreep.scss";
import PartnerPage from "./components/PartnerPage";
import MessagingPage from "./components/MessagingPage";
import Message from "./components/Message";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Registration from "./components/Registration";
import BorrowPage from "./components/BorrowPage";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("user");
  return (
    <Route
      {...rest}
      render={props => (token ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

function App() {
  return (
    <React.Fragment>
      <header>
        <NavFreep />
      </header>
      <Container className="container">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/accueil" component={HomePage} />
          <Route path="/article/:articleId" component={ClothingPage} />
          <PrivateRoute path="/profil/:profileId" component={Profile} />
          {/* <Route path="/users/:userId" component={ClothingPage} /> */}
          <Route path="/partenaire" component={PartnerPage} />
          <Route path="/messagerie/:idReader" component={MessagingPage} />
          <Route path="/registration" exact component={Registration} />
          <Route path="/message/:P1/:P2" component={Message} />
          <Route path="/emprunt/:userId" component={BorrowPage} />
        </Switch>
        <Footer />
      </Container>
    </React.Fragment>
  );
}

export default App;
