import React from 'react';
import TransmissionMap from './TransmissionMap';
import PeriodSlider from '../PeriodSlider/PeriodSlider';

import './td.css';


export default class TransmissionDistribution extends React.Component {
	render() {
		const projectData = this.props.data;
		return(
			<div className="TransDist container-fluid p-0">
				<div className="row no-gutters">
					<div className="col-sm-9">
						<h1 className="maintitle mb-3">Transmission</h1>
					</div>
				</div>
				<div className="row no-gutters timeperiods">
					<div className="col m-0">
						<PeriodSlider periods={projectData ? projectData.periods : null} bg="none" title="" mb="0" />
					</div>
				</div>
				<div className="row no-gutters mb-3">
					<div className="card">
						<div className="card-header">
							<p className="m-0 darkgray"><strong>Intra-zonal transmission</strong></p>
						</div>
						<div className="card-body" style={{height: '300px', overflowY: 'scroll'}}>
							<table className="table-striped">
								<thead>
									<tr>
										<th id="tableHTML_header_1"> </th>
										{
											this.props.data &&
											this.props.data['transmission_lines'] &&
											this.props.data.transmission_lines.columns.map((c,i) => <th key={`tableHTML_row_${i}`}>{c}</th>)
										}
									</tr>
								</thead>
								<tbody>
									{
										this.props.data &&
										this.props.data['transmission_lines'] &&
										this.props.data.transmission_lines.map((r,i) => {
											return(
												<tr key={`tline_${i}`}>
													<td>{i+1}</td>
													{this.props.data.transmission_lines.columns.map((c, ci) => <td key={`td_${i}_${ci}`}>{r[c]}</td>)}
												</tr>
											);
										})
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="row no-gutters mt-2" style={{height: '40%'}}>
					<div className="col mr-3">
						<TransmissionMap tlines={projectData && projectData.transmission_lines} />
					</div>
					<div className="col">
						<div className="row no-gutters">
							<div className="col">
								<div className="card border-0 rounded-0 singlenum">
									<h5 className="card-title">Total Installed Capacity</h5>
									<div className="card-body">
										<p className="largenum">{projectData && projectData.td && (projectData.td.existingTD/1000).toFixed(1)+"K" || "NA"}</p>
										<p className="units">MW</p>
									</div>
								</div>
							</div>
							<div className="col ml-2">
								<div className="card border-0 rounded-0 singlenum">
									<h5 className="card-title">Total Projected Capacity</h5>
									<div className="card-body">
										<p className="largenum">2.3M</p>
										<p className="units">MW</p>
									</div>
								</div>
							</div>
							<div className="col ml-2">
								<div className="card border-0 rounded-0 singlenum">
									<h5 className="card-title">Total Periods</h5>
									<div className="card-body">
										<p className="largenum">{projectData && projectData.periods && projectData.periods.length-1 || "NA"}</p>
										<p className="units">&nbsp;</p>
									</div>
								</div>
							</div>
						</div>
						<div className="row no-gutters mt-2">
							<div className="col-sm-4">
								<div className="card">
									<div className="card-body">
										<h6>Lorem ipsum dolor sit</h6>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
