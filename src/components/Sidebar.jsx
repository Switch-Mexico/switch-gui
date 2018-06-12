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
						<a href="#">Dashboard</a>
					</li> 
					<li className="">
						<a href="#">Generation &amp; Storage</a>
					</li>
					<li>
						<a href="#">Generation Dispatch</a>
					</li>
					<li className="active">
						<a href="#">Transmission &amp; Distribution</a>
					</li>
					{/*<li>
						<a href="#">&nbsp;  &nbsp; &nbsp; Dispatch</a>
					</li>*/}
					<li className="disabled">
						<a href="#">Settings</a>
					</li>
					<li className="disabled">
						<a href="#">Help</a>
					</li>
				</ul>
			</div>
		);
	} 
}

