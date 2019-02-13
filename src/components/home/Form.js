import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      select: [3]
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    Object.keys(this.state).map((k) => {
      console.log(k + ': ' + this.state[k]);
    });
    
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={e => this.handleChange(e)} 
          placeholder="abc" name="name" />
        </label>
        <p>
          <label>
            select:
            <select value={this.state.select} onChange={e => this.handleChange(e)} name="select"
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
    );
  }
}

export default Form;