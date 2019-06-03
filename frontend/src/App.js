import React from 'react';
import Navbar from "./components/navbar";
import './style/navbar.css';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
        <hr className="border-gold" />
      </header>
    </div>
  );
}

export default App;
