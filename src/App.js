import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Editor from './Editor'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
     <Router>
		<div>
			<Switch>
			  <Route path="/edit">
				<Editor />
			  </Route>
			  <Route path="/">
				<Home />
			  </Route>
			</Switch>
      </div>
    </Router>
  );
}

export default App;
