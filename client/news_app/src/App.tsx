import React from 'react';
import logo from './logo.svg';
import Title from './Title'
import Submit from './components/Submit'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>News Response Check</h1>
        <Submit />
      </header>
    </div >
  );
}

export default App;
