// Sidebar.jsx
import React from 'react';

import './Sidebar.css';
import { NavLink } from 'react-router-dom'


export default class Sidebar extends React.Component {
	openFileBrowser = () => {
		this.refs.fileinput.click();
	}
	componentDidMount() {
		this.refs.fileinput.directory = true;
		this.refs.fileinput.webkitdirectory = true;
	}
	render() {
		return (
			<div className="Sidebar">
				<a href="#" className="logo mb-5">
					<img src="/img/logo-w.png" alt="SWITCH-Mexico"/>
				</a>
				<pre ref="result"></pre>
				<ul className="main-nav" role="nav">
					<div style={{textAlign: "center"}}>
						<input type="file" ref="fileinput" id="folder_input" className="d-none" multiple={true} onChange={this.props.loadCSV} />
						<a href="#" onClick={this.openFileBrowser} className="loadProject btn btn-dark">Load project</a>
					</div>
					<li className="">
						<NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
					</li>
					<li className="">
						<NavLink activeClassName="active" to="/capacity">Generation &amp; Storage</NavLink>
					</li>
					<li className="">
						<NavLink activeClassName="active" to="/dispatch">Generation Dispatch</NavLink>
					</li>
					<li className="">
						<NavLink activeClassName="active" to="/transmission">Transmission</NavLink>
					</li>
					<li className="">
						<NavLink activeClassName="active" to="/installed-capacity">Installed Capacity</NavLink>
					</li>
					<li className="disabled">
						<NavLink activeClassName="active" to="/settings">Settings</NavLink>
					</li>
					<li className="disabled">
						<NavLink activeClassName="active" to="/help">Help</NavLink>
					</li>
				</ul>
			</div>
		);
	}
}
