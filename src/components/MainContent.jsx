// MainContent.jsx
import React from 'react';
import Capacity from './Capacity';
import GenerationDispatch from './Dispatch/GenerationDispatch';
import TransmissionDistribution from './TD/TransmissionDistribution';
import Contributors from './Contributors';
// import SomeLink from './SomeLink';
import { Route } from 'react-router-dom'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
import TableTest from './TableTest';

const Unloaded = () => {
	return (
		<div style={{margin: '30% auto 0', width: '65%', textAlign: 'center'}}>
			<h2 style={{fontWeight: 300, color: '#bbb'}}>Load a project using the <em>Load button</em> on the sidebar</h2>
		</div>
	);
}
export default class MainContent extends React.Component {
	render() {
		return(
			<div className="MainContent">
				<Route exact path="/" render={(props) => <Unloaded />}></Route>
				<Route exact path="/capacity" render={(props) => <Capacity {...props} data={this.props.data} />}></Route>
				<Route exact path="/dispatch" render={(props) => <GenerationDispatch {...props} data={this.props.data} />}></Route>
				<Route exact path="/transmission" render={props => <TransmissionDistribution {...props} data={this.props.data} />}></Route>
				<Route exact path="/contributors" render={(props) => <Contributors content={this.props.content} {...props} />}></Route>
				<Route exact path="/test" render={(props) => <TableTest content={this.props.content} {...props} />}></Route>
			</div>
		);
	}
}
