// Capacity.jsx

import React from 'react';

import CapacityMap from './CapacityMap';
import Filters from './Filters';

// Charts
import PieChartCard from '../Charts/PieChartCard';

import './Capacity.css';

export default class Capacity extends React.Component {
	render() {
		return(
			<div className="Capacity">
				<h1 className="maintitle">Capacity Distribution</h1>
				<div className="row" style={{height: '85%'}}>
					<div className="col md-8">
						<Filters />
						<div className="card capacitycard">
							<div className="card-header">Mexico</div>
							<div className="card-body p-0 h-100">
								<CapacityMap />
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<h5>Time filter</h5>
						<PieChartCard />
					</div>
				</div>
			</div>
		);
	}
}
