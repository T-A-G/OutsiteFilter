import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import './app.scss'
import AppRouter from './Routes/approuter';
import Header from './Components/Header/header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <AppRouter />
        </div>
    );
  }
}

export default App;
