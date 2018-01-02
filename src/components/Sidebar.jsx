// Sidebar.jsx
import React from 'react';

export default class Sidebar extends React.Component {
	render() {
		return (
			<div className="Sidebar">
				<a href="#" className="logo mb-5">
					<img src="/img/logo-w.png" alt="SWITCH-Mexico"/>
				</a>

				<ul className="main-nav" role="nav">
					<li>
						<a href="#">Information</a>
					</li>
					<li>
						<a href="#">Capacity</a>
					</li>
					<li>
						<a href="#">Dispatch</a>
					</li>
					<li>
						<a href="#">Transmission &amp; Distribution</a>
					</li>
					<li>
						<a href="#">Settings</a>
					</li>
				</ul>
			</div>
		);
	} 
}

