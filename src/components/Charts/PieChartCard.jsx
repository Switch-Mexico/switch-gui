import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip} from 'recharts';
// const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300}, {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COLORS = ['#8884d8',
'#83a6ed',
'#8dd1e1',
'#82ca9d',
'#a4de6c',
'#d0ed57',
'#ffc658'];
//const RADIAN = Math.PI / 180;
/*
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
*/
const style = {
	top: 10,
	left: 0,
	fontSize: 12,
	lineHeight: '24px'
};
export default class PieChartCard extends React.Component {
	render() {
		const data = this.props.entity;
		const lz = this.props.lz;
		return(
			<div className="card PieChartCard border-0 rounded-0" >
				<div className="card-body">

					<h6 style={{marginBottom: 6}} className="card-title fwb">{lz.properties.name}</h6>
					<p style={{fontSize: 12}} className="card-subtitle ">Capacity distribution by type of fuel</p>
					<PieChart width={400} height={140} onMouseEnter={this.onPieEnter}>
						<Tooltip />
						<Pie
							data={data.breakdown}
							dataKey="value"
							cx={180}
							cy={65}
							labelLine={false}
							outerRadius={60}
							fill="#8884d8"
						>
							{ data.breakdown.map((entry, index) => <Cell key={`cell${index}`} fill={COLORS[index % COLORS.length]}/>) }
						</Pie>
						<Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={style}/>
					</PieChart>
					<div className="fuelFilter ml-4">
						<div className="form-check form-check-inline ml-5">
							<input type="checkbox" name="" id="renewable" className="form-check-input"/>
							<label htmlFor="renewable" className="form-check-label">Renewable</label>
						</div>
						<div className="form-check form-check-inline ml-5">
							<input type="checkbox" name="" id="fuel" className="form-check-input"/>
							<label htmlFor="fuel" className="form-check-label">Fuel</label>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
