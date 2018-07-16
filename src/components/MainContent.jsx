// MainContent.jsx
import React from 'react';
import Capacity from './Capacity';
import TransmissionDistribution from './TD/TransmissionDistribution';
import { BrowserRouter, Route, Link } from 'react-router-dom'

export default class MainContent extends React.Component {
	render() {
		return(
			<div className="MainContent">
				<Route exact path="/capacity" component={Capacity}></Route>
				<Route exact path="/transmission" component={TransmissionDistribution}></Route>
			</div>
		);
	}
}
