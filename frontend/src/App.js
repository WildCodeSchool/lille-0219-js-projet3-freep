import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import { Container } from 'reactstrap';
import "./App.css";
import NavFreep from "./components/navbar";
import './style/navbar.css';
    
function App() {
  return (
    <Container>
      <header>
        <NavFreep />
      </header>
      <HomePage />
      <Profile />
    </Container>

  );
}

export default App;
