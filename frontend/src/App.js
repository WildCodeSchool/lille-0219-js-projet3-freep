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
import EditProfile from "./components/EditProfile";
import Search from "./components/Search";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (user ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

const App = ({ user }) => (
  <React.Fragment>
    <header>
      <NavFreep />
    </header>
    <Container>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/inscription" component={Registration} />
        {/* <Route path="/emprunt/:userId" component={BorrowPage} /> */}
        <PrivateRoute path="/search" component={Search} />
        <PrivateRoute path="/accueil" component={HomePage} user={user} />
        <PrivateRoute path="/profil/:profileId" component={Profile} />
        <PrivateRoute path="/message/:P1/:P2" component={Message} />
        <PrivateRoute path="/emprunt/:userId" component={BorrowPage} />
        <PrivateRoute path="/article/:articleId" component={ClothingPage} />
        <PrivateRoute path="/partenaire" component={PartnerPage} />
        <PrivateRoute path="/messagerie/:idReader" component={MessagingPage} />
        <PrivateRoute path="/modification" component={EditProfile} />
      </Switch>
      <Footer />
    </Container>
  </React.Fragment>
);

const mapStateToProps = state => {
  return {
    user: state.loginReducer.isLoggedIn
  };
};

const withConnect = connect(
  mapStateToProps,
  null
)(App);

export default withConnect;
