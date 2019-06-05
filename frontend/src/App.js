import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import { Container } from 'reactstrap';
import "./App.css";

function App() {
  return (
    <Container>
      <HomePage />
      <Profile />
    </Container>
  );
}

export default App;
