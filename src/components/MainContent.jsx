// MainContent.jsx
import React from 'react';
import Capacity from './Capacity';
import TransmissionDistribution from './TD/TransmissionDistribution';

export default class MainContent extends React.Component {
	render() {
		return(
			<div className="MainContent">
				<Capacity />
			</div>
		);
	}
}
