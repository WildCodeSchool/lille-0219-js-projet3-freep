import React from "react";
import "./App.scss";
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
import Search from "./components/Search";

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
      <Container>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/users/:userId" component={ClothingPage} />
          <Route path="/login" exact component={Login} />
          <Route path="/registration" exact component={Registration} />
          <Route path="/loader" component={Loader} />
          <Route path="/emprunt/:userId" component={BorrowPage} />
          <PrivateRoute path="/search" component={Search} />
          <Route exact path="/inscription" component={Registration} />
          <PrivateRoute path="/accueil" component={HomePage} />
          <PrivateRoute path="/profil/:profileId" component={Profile} />
          <PrivateRoute path="/message/:P1/:P2" component={Message} />
          <PrivateRoute path="/emprunt/:userId" component={BorrowPage} />
          <PrivateRoute path="/article/:articleId" component={ClothingPage} />
          <PrivateRoute path="/partenaire" component={PartnerPage} />
          <PrivateRoute
            path="/messagerie/:idReader"
            component={MessagingPage}
          />
        </Switch>
        <Footer />
      </Container>
    </React.Fragment>
  );
}

export default App;
