// Capacity.jsx

import React from 'react';

import CapacityMap from './CapacityMap';
import Filters from './Filters';

// Charts
import PieChartCard from '../Charts/PieChartCard';
import StackedChartCard from '../Charts/StackedChartCard';

import './Capacity.css';

import data from '../../data/powerPlants';
import lz_pjs from '../../data/lz_projs';

let propMap = {
	'bas': 'balanceArea',
	'lzs': 'loadZone',
	'pjs': 'project'
};

export default class Capacity extends React.Component {
	constructor() {
		super();
		this.state = {
			balanceArea: null,
			loadZone: null,
			project: null
		};
		this.updateSelected = this.updateSelected.bind(this);
	}
	updateSelected(select, value) {
		const prop = propMap[select];
		const current = {...this.state};
		current[prop] = value ? value : null;
		if(select === "bas")
			current['loadZone'] = null;
		else if(select === "lzs")
			current['project'] = null;
		if(current['balanceArea'] === null){
			current['loadZone'] = null;
		}
		if(current['loadZone'] === null){
			current['project'] = null;
		}
		this.setState(current);
	}
	render() {
		return(
			<div className="Capacity container-fluid p-0">
				<h1 className="maintitle">Capacity Distribution</h1>
				<div className="row no-gutters">
					<div className="col md-8">
						<Filters data={data.country} lz_pjs = {lz_pjs} {...this.state} updateSelected={this.updateSelected} />
						<div className="card capacitycard" style={{height: '94%'}}>
							<div className="card-header pt-1 pb-1 pl-3" style={{fontSize: 14}}><strong>Mexico</strong></div>
							<div className="card-body p-0 h-100">
								{/*<CapacityMap data={data} />*/}
							</div>
						</div>
					</div>
					<div className="col-md-4 ml-3">
						<h5>Time filter</h5>
						<div className="row no-gutters">
							<div className="col">
								{/*<PieChartCard />*/}
							</div>
						</div>
						<div className="row no-gutters mt-3">
							<div className="col">
								{/*<StackedChartCard />*/}
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
