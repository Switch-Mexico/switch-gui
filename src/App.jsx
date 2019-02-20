// App.jsx

import React, { Component } from 'react';

import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { BrowserRouter as Router } from "react-router-dom";
import { parseCSV, parseTSV, constructPeriods, calculateTD } from './helpers';

import './App.css';

function readCSV(e, instance) {
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
			data['periods'] = constructPeriods(text);
		break;
		case 'load_zones.tab':
			data['td'] = {'existingTD': calculateTD(text)};
		break;
		case 'dispatch.csv':
			const dispatch = parseCSV(text);
			const dispatch_data_map = {};
			const gen_energy_source_list = [];
			for (var i = 0; i < dispatch.length; i++) {
				const dispatch_entry = dispatch[i];
				const gen_energy_source = dispatch_entry['gen_energy_source'];
				const timestamp = dispatch_entry['timestamp'];
				if (!(gen_energy_source in gen_energy_source_list)){
					gen_energy_source_list.push(gen_energy_source);
				}
				if (!(timestamp in dispatch_data_map)) {
					dispatch_data_map[timestamp] = {};
					dispatch_data_map[timestamp]['timestamp'] = dispatch_entry['timestamp'];
				}
				if (!(gen_energy_source in dispatch_data_map[timestamp])) {
					dispatch_data_map[timestamp][gen_energy_source] =
						parseFloat(dispatch_entry['DispatchGen_MW']);
				} else {
					dispatch_data_map[timestamp][gen_energy_source] =
						dispatch_data_map[timestamp][gen_energy_source]
						+ parseFloat(dispatch_entry['DispatchGen_MW']);
				}
			}
			data['dispatch_energy_source_list'] = [...new Set(gen_energy_source_list)].reverse();
			data['dispatch'] = Object.values(dispatch_data_map);
		break;
		case 'DispatchGen.tab':
			data['dispatchGen'] = parseTSV(text);
		break;
		case 'generation_projects_info.tab':
			data['generation_projects_info'] = parseTSV(text);
		break;
		case 'timepoints.tab':
			data['timepoints'] = parseTSV(text);
		break;
		default: break;
	}
	instance.setState({data});
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
