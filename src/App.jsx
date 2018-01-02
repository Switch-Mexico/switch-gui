import React, { Component } from 'react';
// import logo from './logo.svg';

import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App h-100">
				<Sidebar />
				<MainContent />
			</div>
		);
	}
}

export default App;
