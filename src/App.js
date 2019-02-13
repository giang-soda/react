import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import { ShoppingList, Cart } from './components/home/ShoppingList';
import Form from './components/home/Form';

class App extends Component {
  render() {


    return (
      <div>
        <Form />
      </div>
    );
    /*const user = {
        firstName: 'Harper a d',
        lastName: 'Perez'
    };
    const element = (
      <h1 className="aaa">
        Hello, {this.formatName(user)}! , firstName: {user.lastName}
      </h1>
    );
    const shopVar = <ShoppingList name="Sara" />;
    const cartVar = <Cart name="Sara" />;
    return (
      <div className="App">
        {element}
        <header className="App-header">
        {shopVar}
        {cartVar}
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React a
          </a>
        </header>
      </div>
    );*/
  }
}

export default App;
