import React from 'react';

export default class CapacityFilters extends React.Component{
	render() {
		return(
			<div className="Filters mb-4">
				<div className="row">
					<div className="col-sm-4 fw300">
						<select name="" className="custom-select" id="">
							<option value="">Balance area</option>
							<option value="2">Hello world</option>
						</select>
					</div>
					<div className="col-sm-4 fw300">
						<select name="" disabled className="custom-select" id="">
							<option>Load zone</option>
							<option value="2">Hello world</option>
						</select>
					</div>
					<div className="col-sm-4 fw300">
						<select name="" disabled className="custom-select" id="">
							<option>Project name</option>
							<option value="2">Hello world</option>
						</select>
					</div>
				</div>
			</div>
		);
	}
}
