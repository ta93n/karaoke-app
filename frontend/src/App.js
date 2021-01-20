import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import MainContainer from './Components/MainContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <MainContainer/>
      </BrowserRouter>
    );
  }
}

export default App;
