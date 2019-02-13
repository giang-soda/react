import React, { Component } from 'react';

export class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      isToggleOn: true
    };
    // this.activateLasers = this.activateLasers.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  activateLasers(e) {
    e.preventDefault();
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
    console.log('this is:', this);
    console.log('The link was clicked.');
  }

  render() {
    let numbers = [1, 2, 3, 4, 5];
    let listItems = numbers.map((number) =>
      <li key={number.toString()} data-x={number}>{number}</li>
    );
    return (
      <div className="shopping-list">
        <h1>Cart List for {this.props.name}</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <ul>{listItems}</ul>
        <button onClick={(e) => this.activateLasers(e)}>
          Activate Lasers {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      </div>
    );
  }
}

export default ShoppingList;
// Example usage: <ShoppingList name="Mark" />