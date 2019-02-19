import React, { Component } from 'react';

class FancyBorder extends Component {
	render() {
		return (
		    <div className={'FancyBorder FancyBorder-' + this.props.color}>
		      {this.props.children}
		    </div>
	  	);
	}
}

class Containment extends Component {
	render() {
		return (
		    <FancyBorder color="blue">
		      <h1 className="Dialog-title">
		        Welcome
		      </h1>
		      <p className="Dialog-message">
		        Thank you for visiting our spacecraft!
		      </p>
		    </FancyBorder>
	  	);
	}
}

export default Containment;