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
import Loader from "./components/Loader";
import Registration from "./components/Registration";
import BorrowPage from "./components/BorrowPage";
import EditProfile from "./components/EditProfile";
import Search from "./components/Search";
import UploadClothePictures from "./components/UploadClothePictures";
import Uploader from "./components/Upload";

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
          <Route exact path="/inscription" component={Registration} />
          <PrivateRoute path="/search" component={Search} />
          <PrivateRoute path="/accueil" component={HomePage} />
          <PrivateRoute path="/profil/:profileId" component={Profile} />
          <PrivateRoute path="/profil" />
          <PrivateRoute path="/modification" component={EditProfile} />
          <PrivateRoute path="/message/:P1/:P2" component={Message} />
          <PrivateRoute path="/emprunt/:userId" component={BorrowPage} />
          <PrivateRoute path="/emprunt" />
          <PrivateRoute path="/article/:articleId" component={ClothingPage} />
          <PrivateRoute path="/partenaire" component={PartnerPage} />
          <PrivateRoute
            path="/messagerie/:idReader"
            component={MessagingPage}
          />
          <PrivateRoute path="/messagerie" />
          <Route path="/upload" component={Uploader} />
          <Route path="/uploadclothepicture" component={UploadClothePictures} />
        </Switch>
        <Footer />
      </Container>
    </React.Fragment>
  );
}

export default App;
