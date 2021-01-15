import React, { Component } from 'react';
import Header from './Components/Header'
import MainContainer from './Components/MainContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MainContainer/>
      </div>
    );
  }
}

export default App;
