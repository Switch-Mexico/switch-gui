import React from 'react';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const data = [
	{name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
	{name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
	{name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
	{name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
	{name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
	{name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
	{name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
export default class StackedChartCart extends React.Component{
	render() {
		return(
			<div className="card border-0 rounded-0 mt-2">
				<div className="card-body p-0 pb-2">
					<h6 className="card-title fwb" style={{padding: '16px 10px 0'}}>Load zone Capacity Distribution</h6>
					<BarChart width={380} height={200} data={data} margin={{top: 20, right: 5, left: 0, bottom: 5}}>
						<XAxis dataKey="name"/>
						<YAxis/>
						<CartesianGrid strokeDasharray="3 3"/>
						<Tooltip/>
						<Legend />
						<Bar dataKey="pv" stackId="a" fill="#8884d8" />
						<Bar dataKey="uv" stackId="a" fill="#82ca9d" />
					</BarChart>
				</div>
			</div>
		);
	}
}
