import React, { Component } from 'react';
// import logo from './logo.svg';

import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { BrowserRouter as Router } from "react-router-dom";

import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {isProjectLoaded: false };
		this.loadProject = this.loadProject.bind(this);
	}
	loadProject() {
		this.setState({isProjectLoaded: true});
	}
	render() {
		return (
			<Router>
				<div className="App h-100">
					<Sidebar isProjectLoaded={this.state.isProjectLoaded} loadProject={this.loadProject} />
					<MainContent />
				</div>
			</Router>
		);
	}
}

export default App;
