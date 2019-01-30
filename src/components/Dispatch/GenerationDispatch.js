import React from 'react';
import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	AreaChart,
	Area
} from 'recharts';
import { parseCSV } from '../../helpers';
const gen_energy_source_list =
	[ 'coal'
	, 'diesel'
	, 'fuel_oil'
	, 'geosteam'
	, 'water_nonrenewable'
	, 'natural_gas'
	, 'solar'
	, 'uranium'
	, 'water_renewable'
	, 'wind'
	, 'solar_distributed'
	, 'natural_gas_cogen'
];

export default class GenerationDispatch extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
		fetch('/dispatch.csv')
			.then((r) => r.text())
			.then((text) => {
				const dispatch = parseCSV(text);
				var dispatch_data_map = {};
				for (var i = 0; i < dispatch.length; i++) {
					var dispatch_entry = dispatch[i];
					var gen_energy_source = dispatch_entry['gen_energy_source'];
					var timestamp = dispatch_entry['timestamp'];
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
				this.setState({data:Object.values(dispatch_data_map)});
			}
		)
	}

	render() {
		return (
			<div>
				<h1 className="maintitle">Generation Dispatch (MW)</h1>
				<AreaChart width={1000} height={400} data={this.state.data}
				            margin={{top: 0, right: 0, left: 0, bottom: 0}}>
	        <CartesianGrid strokeDasharray="3 3"/>
	        <XAxis dataKey="timestamp"/>
	        <YAxis/>
	        <Tooltip/>
					<Legend/>
					<Area type='monotone' dataKey='coal' stackId="1" stroke='#192b42' fill='#192b42' />
					<Area type='monotone' dataKey='diesel' stackId="1" stroke='#c78181' fill='#c78181' />
					<Area type='monotone' dataKey='fuel_oil' stackId="1" stroke='#41264f' fill='#41264f' />
					<Area type='monotone' dataKey='natural_gas' stackId="1" stroke='#91b29f' fill='#91b29f' />
					<Area type='monotone' dataKey='uranium' stackId="1" stroke='#8dd228' fill='#8dd228' />
					<Area type='monotone' dataKey='solar_distributed' stackId="1" stroke='#facc40' fill='#facc40' />
					<Area type='monotone' dataKey='natural_gas_cogen' stackId="1" stroke='#b8adba' fill='#b8adba' />
					<Area type='monotone' dataKey='water_nonrenewable' stackId="1" stroke='#669999' fill='#669999' />
					<Area type='monotone' dataKey='water_renewable' stackId="1" stroke='#003366' fill='#003366' />
					<Area type='monotone' dataKey='geosteam' stackId="1" stroke='#cd5c5c' fill='#cd5c5c' />
					<Area type='monotone' dataKey='solar' stackId="1" stroke='#ffe697' fill='#ffe697' />
					<Area type='monotone' dataKey='wind' stackId="1" stroke='#336699' fill='#336699' />
	      </AreaChart>
			</div>
		);
	}
}
