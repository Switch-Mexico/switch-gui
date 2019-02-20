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
		case 'gen_cap.txt':
			const capacity = parseTSV(text);
			var capacity_source_data_map = {};
			var capacity_tech_data_map = {};
			var gen_energy_source_list = [];
			var gen_tech_list = [];
			for (var i = 0; i < capacity.length; i++) {
				const capacity_entry = capacity[i];
				const gen_energy_source = capacity_entry['gen_energy_source'];
				const gen_tech = capacity_entry['gen_tech'];
				const period = capacity_entry['PERIOD'];

				//Process data for gen_tech
				if (!(gen_tech in gen_tech_list)){
					gen_tech_list.push(gen_tech);
				}
				if (!(period in capacity_tech_data_map)) {
					capacity_tech_data_map[period] = {};
					capacity_tech_data_map[period]['PERIOD'] = capacity_entry['PERIOD'];
				}
				if (!(gen_tech in capacity_tech_data_map[period])) {
					capacity_tech_data_map[period][gen_tech] =
						parseFloat(capacity_entry['GenCapacity']);
				} else {
					capacity_tech_data_map[period][gen_tech] =
						capacity_tech_data_map[period][gen_tech]
						+ parseFloat(capacity_entry['GenCapacity']);
				}

				//Process data for gen_energy_source
				if (!(gen_energy_source in gen_energy_source_list)){
					gen_energy_source_list.push(gen_energy_source);
				}
				if (!(period in capacity_source_data_map)) {
					capacity_source_data_map[period] = {};
					capacity_source_data_map[period]['PERIOD'] = capacity_entry['PERIOD'];
				}
				if (!(gen_energy_source in capacity_source_data_map[period])) {
					capacity_source_data_map[period][gen_energy_source] =
						parseFloat(capacity_entry['GenCapacity']);
				} else {
					capacity_source_data_map[period][gen_energy_source] =
						capacity_source_data_map[period][gen_energy_source]
						+ parseFloat(capacity_entry['GenCapacity']);
				}
			}
			data['gen_tech_list'] = [...new Set(gen_tech_list)].reverse();
			data['gen_energy_source_list'] = [...new Set(gen_energy_source_list)].reverse();
			data['gen_cap_tech'] = Object.values(capacity_tech_data_map)
			data['gen_cap_energy_source'] = Object.values(capacity_source_data_map)
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
