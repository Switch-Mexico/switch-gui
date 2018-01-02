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
			<div className="Capacity container-fluid p-0">
				<h1 className="maintitle">Capacity Distribution</h1>
				<div className="row no-gutters" >
					<div className="col md-8">
						<Filters />
						<div className="card capacitycard">
							<div className="card-header pt-1 pb-1 pl-3" style={{fontSize: 14}}><strong>Mexico</strong></div>
							<div className="card-body p-0 h-100">
								{/*CapacityMap />*/}
							</div>
						</div>
					</div>
					<div className="col-md-4 ml-3">
						<h5>Time filter</h5>
						<div className="row no-gutters">
							<div className="col">
								<PieChartCard />
							</div>
						</div>
						<div className="row no-gutters mt-3">
							<div className="col">
								<StackedChartCard />
							</div>
						</div>
						<div className="row mt-3 no-gutters">
							<div className="col">
								<div className="card border-0 rounded-0 singlenum">
									<h5 className="card-title">Total Installed Capacity</h5>
									<div className="card-body">
										<p className="largenum">1.8M</p>
										<p className="units">MW</p>
									</div>
								</div>
							</div>
							<div className="col ml-2">
								<div className="card border-0 rounded-0 singlenum">
									<h5 className="card-title">Total Projected Capacity</h5>
									<div className="card-body">
										<p className="largenum">250K</p>
										<p className="units">MW</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
