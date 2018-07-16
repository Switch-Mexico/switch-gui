// Sidebar.jsx
import React from 'react';

import './Sidebar.css';
import { NavLink } from 'react-router-dom'


export default class Sidebar extends React.Component {
	render() {
		return (
			<div className="Sidebar">
				<a href="#" className="logo mb-5">
					<img src="/img/logo-w.png" alt="SWITCH-Mexico"/>
				</a>

				<ul className="main-nav" role="nav">
					<li className="disabled">
						<NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
					</li> 
					<li className="">
						<NavLink activeClassName="active" to="/capacity">Generation &amp; Storage</NavLink>
					</li>
					<li className="disabled">
						<NavLink activeClassName="active" to="/dispatch">Generation Dispatch</NavLink>
					</li>
					<li className="">
						<NavLink activeClassName="active" to="/transmission">Transmission</NavLink>
					</li>
					{/*<li>
						<NavLink activeClassName="active" to="">&nbsp;  &nbsp; &nbsp; Dispatch</NavLink>
					</li>*/}
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

