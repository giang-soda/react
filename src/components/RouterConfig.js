import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import Containment from './home/Containment';
import Form from './home/Form';
import ShoppingList from './home/ShoppingList';
import Contact from './Router/Contact'

class RouterConfig extends Component {
	render() {
		return (
			/*<Router>
		      <Route path = "/" component = {Containment}>
		         
		         <Route path = "home" component = {Containment} />
		         <Route path = "about" component = {Form} />
		         <Route path = "contact" component = {ShoppingList} />
		      </Route>
		   </Router>*/
			<Router>
			    <div>
			      <ul>
			        <li>
			          <Link to="/">Home</Link>
			        </li>
			        <li>
			          <Link to="/about">About</Link>
			        </li>
			        <li>
			          <Link to="/topics">Topics</Link>
			        </li>
			      </ul>

			      <hr />

			      <Route exact path="/" component={Containment} />
			      <Route path="/about" component={Form} />
			      <Route path="/topics" component={Contact} />
			    </div>
			  </Router>
	  	)
	}
}

export default RouterConfig;