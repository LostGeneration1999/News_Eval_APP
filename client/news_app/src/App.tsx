import React from 'react';
import logo from './logo.svg';
import Title from './Title'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <React.Fragment>
          <Title />
        </React.Fragment>
      </header>
    </div >
  );
}

export default App;
