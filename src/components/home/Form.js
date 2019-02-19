import React, { Component } from 'react';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      product: {
        name: '',
        c: '',
        select: [3]
      }
      
    };
    this.product = '';
  }

  handleChange(event) {
    this.product = event.target.value;
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    Object.keys(this.state.product).map((k) => {
      console.log(k + ': ' + this.state[k]);
    });
    
  }
  convertC () {
    return isNaN(this.state.c) ? 'error' : parseFloat(this.state.c) + 5;
  }

  convertF () {
    return isNaN(this.state.c) ? 'error' : parseFloat(this.state.c) + 100;
  }

  render () {
    return (
      <div>
        <p>
          <input type="text" value={this.product} onChange={e => this.handleChange(e)} 
          placeholder="abc" name="name" />
        </p>
        <p>label: {this.product}</p>
      </div>
    )
  }
  /*render() {
    let fahrenheit = 1;
    return (
      <div>

      <TemperatureInput scale="f" temperature={fahrenheit}
          onTemperatureChange={this.convertF} />

      <p>
      { this.state.c ? 'nhiet do c: ' + this.convertC() : ''}
      </p>
      <p>
      { this.state.c ? 'nhiet do f: ' + this.convertF() : ''}
      </p>
      <p>
      text input: {this.state.name}
      </p>
      <form onSubmit={e => this.handleSubmit(e)}>
        <label>
          nhiet do:
          <input type="text" value={this.state.c} onChange={e => this.handleChange(e)} 
          placeholder="abc" name="c" />
        </label>

        <label>
          Name:
          <input type="text" value={this.state.product.name} onChange={e => this.handleChange(e)} 
          placeholder="abc" name="name" />
        </label>
        <p>
          <label>
            select:
            <select value={this.state.product.select} onChange={e => this.handleChange(e)} name="select"
              multiple={true}>
              <option value="1">Grapefruit</option>
              <option value="2">Lime</option>
              <option value="3">Coconut</option>
              <option value="4">Mango</option>
            </select>
          </label>
        </p>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }*/
}

export default Form;