import React, { Component } from 'react';
// import logo from './logo.svg';

import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { BrowserRouter as Router } from "react-router-dom";
import {parseTSV} from './helpers';

import './App.css';
function readCSV(e, instance) {
	// console.log(reader.fileName);
	let text = e.target.result;
	const data = {...instance.state.data};
	switch(e.target.fileName) {
		case 'rps_targets.tab':
			data['rps'] = parseTSV(text);
		break;
		case 'transmission_lines.tab':
			data['transmission_lines'] = parseTSV(text);
		break;
		case 'periods.tab':
			alert("Periods not enabled");
		break;
		default: break;
	}
	instance.setState({data});
	// this.setState({content: e.target.result});
}
class App extends Component {
	constructor() {
		super();
		this.state = {isProjectLoaded: false, content: null, data: null };
		this.loadProject = this.loadProject.bind(this);
	}
	loadProject() {
		this.setState({isProjectLoaded: true});
	}
	loadCSV = (e) => {
		let files = e.target.files;
		for (var i = 0; i < files.length; i++) {
			let reader = new FileReader();
			reader.onload = (e) => {
				readCSV.call(reader, e, this);
			};
			reader.fileName = files[i].name;
			reader.readAsText(files[i]);
		}
	}
	render() {
		return (
			<Router>
				<div className="App h-100">
					<Sidebar loadCSV={this.loadCSV} isProjectLoaded={this.state.isProjectLoaded} loadProject={this.loadProject} />
					<MainContent data={this.state.data} content={this.state.content} />
				</div>
			</Router>
		);
	}
}

export default App;
