// Sidebar.jsx
import React from 'react';

import './Sidebar.css';

export default class Sidebar extends React.Component {
	render() {
		return (
			<div className="Sidebar">
				<a href="#" className="logo mb-5">
					<img src="/img/logo-w.png" alt="SWITCH-Mexico"/>
				</a>

				<ul className="main-nav" role="nav">
					<li className="">
						<a href="#">Information</a>
					</li>
					<li className="active">
						<a href="#">Capacity</a>
					</li>
					<li>
						<a href="#">Dispatch</a>
					</li>
					<li>
						<a href="#">Transmission &amp; Distribution</a>
					</li>
					<li className="">
						<a href="#">Settings</a>
					</li>
				</ul>
			</div>
		);
	} 
}

