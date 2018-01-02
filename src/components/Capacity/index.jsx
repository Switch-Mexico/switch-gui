// Capacity.jsx

import React from 'react';

import CapacityMap from './CapacityMap';
import Filters from './Filters';

// Charts
import PieChartCard from '../Charts/PieChartCard';
import StackedChartCard from '../Charts/StackedChartCard';

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
							<div className="card-header pt-1 pb-1 pl-3" style={{fontSize: 14}}><strong>Mexico</strong></div>
							<div className="card-body p-0 h-100">
								{/*CapacityMap />*/}
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<h5>Time filter</h5>
						<div className="row">
							<PieChartCard />
						</div>
						<div className="row">
							<StackedChartCard />
						</div>
						<div className="row">
						</div>
					</div>
				</div>
			</div>
		);
	}
}
