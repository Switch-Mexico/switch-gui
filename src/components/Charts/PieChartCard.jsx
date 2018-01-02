import React from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';
const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;                    
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
export default class PieChartCard extends React.Component {
	render() {
		return(
			<div className="card PieChartCard border-0 rounded-0" >
				<div className="card-body">

					<h5 style={{marginBottom: 6}} className="card-title fwb">Balancing Area Title</h5>
					<p style={{fontSize: 12}} className="card-subtitle ">Capacity distribution by type of fuel</p>
					<PieChart width={300} height={200} onMouseEnter={this.onPieEnter}>
						<Pie
							data={data} 
							cx={160} 
							cy={100} 
							labelLine={false}
							label={renderCustomizedLabel}
							outerRadius={80} 
							fill="#8884d8"
						>
							{ data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>) }
						</Pie>
					</PieChart>
					<div className="fuelFilter">
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
