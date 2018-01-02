// Capacity.jsx

import React from 'react';

import CapacityMap from './CapacityMap';

import './Capacity.css';

export default class Capacity extends React.Component {
	render() {
		return(
			<div className="Capacity">
				<h1 className="maintitle">Capacity Distribution</h1>
				<div className="row">
					<div className="col md-8">
						<div className="card">
							<div className="card-header">Mexico</div>
						</div>
						<div className="card-body p-0">
							<CapacityMap />
						</div>
					</div>
					<div className="col-md-4">
						<h2>This is the other</h2>
					</div>
				</div>
			</div>
		);
	}
}
