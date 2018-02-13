import React from 'react';
import CapacityMap from '../Capacity/CapacityMap';
import data from '../../data/powerPlants';

export default class TransmissionDistribution extends React.Component {
	render() {
		return(
			<div className="TransDist container-fluid p-0">
				<div className="row no-gutters">
					<div className="col-sm-9">
						<h1 className="maintitle mb-3">Transmission &amp; Distribution</h1>
					</div>
					<div className="col-sm-3">
						<div className="btn-group d-flex justify-content-end" role="group">
							<button type="button" className="btn btn-outline-primary">Transmission</button>
							<button type="button" className="btn btn-primary active">Distribution</button>
						</div>
					</div>
				</div>
				<div className="row no-gutters timeperiods">
					<div className="col">
						<hr className="" />
						<h5>TIME PERIODS</h5>
						<hr className="" />
					</div>
				</div>
				<div className="row no-gutters mb-3">
					<div className="card">
						<div className="card-header">
							<p className="m-0 darkgray"><strong>Inter-zonal transmission</strong></p>
						</div>
						<div className="card-body" style={{height: '370px', overflowY: 'scroll'}}>
							<table className="table-striped">
								<thead>
								<tr>
								  <th id="tableHTML_header_1"> </th>
								  <th id="tableHTML_header_2">TRANSMISSION_LINE</th>
								  <th id="tableHTML_header_3">trans_lz1</th>
								  <th id="tableHTML_header_4">trans_lz2</th>
								  <th id="tableHTML_header_5">trans_length_km</th>
								  <th id="tableHTML_header_6">trans_efficiency</th>
								  <th id="tableHTML_header_7">existing_trans_cap</th>
								  <th id="tableHTML_header_8">new_build_allowed</th>
								</tr>
								</thead>
								<tbody>
								<tr>
								  <td id="tableHTML_rownames">1</td>
								  <td id="tableHTML_column_1">01-03</td>
								  <td id="tableHTML_column_2">01-hermosillo</td>
								  <td id="tableHTML_column_3">03-obregon</td>
								  <td id="tableHTML_column_4">174</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">500</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">2</td>
								  <td id="tableHTML_column_1">01-49</td>
								  <td id="tableHTML_column_2">01-hermosillo</td>
								  <td id="tableHTML_column_3">49-san_luis_rio_colorado</td>
								  <td id="tableHTML_column_4">143</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">0</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">3</td>
								  <td id="tableHTML_column_1">02-01</td>
								  <td id="tableHTML_column_2">02-cananea</td>
								  <td id="tableHTML_column_3">01-hermosillo</td>
								  <td id="tableHTML_column_4">163</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">800</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">4</td>
								  <td id="tableHTML_column_1">02-08</td>
								  <td id="tableHTML_column_2">02-cananea</td>
								  <td id="tableHTML_column_3">08-moctezuma</td>
								  <td id="tableHTML_column_4">124</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">150</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">5</td>
								  <td id="tableHTML_column_1">03-04</td>
								  <td id="tableHTML_column_2">03-obregon</td>
								  <td id="tableHTML_column_3">04-los_mochis</td>
								  <td id="tableHTML_column_4">69</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">315</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">6</td>
								  <td id="tableHTML_column_1">04-05</td>
								  <td id="tableHTML_column_2">04-los_mochis</td>
								  <td id="tableHTML_column_3">05-culiacan</td>
								  <td id="tableHTML_column_4">184</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">550</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">7</td>
								  <td id="tableHTML_column_1">06-05</td>
								  <td id="tableHTML_column_2">06-mazatlan</td>
								  <td id="tableHTML_column_3">05-culiacan</td>
								  <td id="tableHTML_column_4">171</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">600</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">8</td>
								  <td id="tableHTML_column_1">06-10</td>
								  <td id="tableHTML_column_2">06-mazatlan</td>
								  <td id="tableHTML_column_3">10-durango</td>
								  <td id="tableHTML_column_4">157</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">2900</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">9</td>
								  <td id="tableHTML_column_1">06-22</td>
								  <td id="tableHTML_column_2">06-mazatlan</td>
								  <td id="tableHTML_column_3">22-tepic</td>
								  <td id="tableHTML_column_4">205</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">800</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">10</td>
								  <td id="tableHTML_column_1">07-08</td>
								  <td id="tableHTML_column_2">07-juarez</td>
								  <td id="tableHTML_column_3">08-moctezuma</td>
								  <td id="tableHTML_column_4">167</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">1500</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">11</td>
								  <td id="tableHTML_column_1">08-09</td>
								  <td id="tableHTML_column_2">08-moctezuma</td>
								  <td id="tableHTML_column_3">09-chihuahua</td>
								  <td id="tableHTML_column_4">105</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">550</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">12</td>
								  <td id="tableHTML_column_1">09-11</td>
								  <td id="tableHTML_column_2">09-chihuahua</td>
								  <td id="tableHTML_column_3">11-laguna</td>
								  <td id="tableHTML_column_4">295</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">700</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">13</td>
								  <td id="tableHTML_column_1">10-24</td>
								  <td id="tableHTML_column_2">10-durango</td>
								  <td id="tableHTML_column_3">24-aguascalientes</td>
								  <td id="tableHTML_column_4">160</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">330</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">14</td>
								  <td id="tableHTML_column_1">11-10</td>
								  <td id="tableHTML_column_2">11-laguna</td>
								  <td id="tableHTML_column_3">10-durango</td>
								  <td id="tableHTML_column_4">179</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">1200</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">15</td>
								  <td id="tableHTML_column_1">11-17</td>
								  <td id="tableHTML_column_2">11-laguna</td>
								  <td id="tableHTML_column_3">17-saltillo</td>
								  <td id="tableHTML_column_4">182</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">1050</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">16</td>
								  <td id="tableHTML_column_1">11-24</td>
								  <td id="tableHTML_column_2">11-laguna</td>
								  <td id="tableHTML_column_3">24-aguascalientes</td>
								  <td id="tableHTML_column_4">298</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">0</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">17</td>
								  <td id="tableHTML_column_1">12-09</td>
								  <td id="tableHTML_column_2">12-rio_escondido</td>
								  <td id="tableHTML_column_3">09-chihuahua</td>
								  <td id="tableHTML_column_4">180</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">1200</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">18</td>
								  <td id="tableHTML_column_1">12-13</td>
								  <td id="tableHTML_column_2">12-rio_escondido</td>
								  <td id="tableHTML_column_3">13-nuevo_laredo</td>
								  <td id="tableHTML_column_4">136</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">100</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">19</td>
								  <td id="tableHTML_column_1">12-16</td>
								  <td id="tableHTML_column_2">12-rio_escondido</td>
								  <td id="tableHTML_column_3">16-monterrey</td>
								  <td id="tableHTML_column_4">209</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">1600</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">20</td>
								  <td id="tableHTML_column_1">14-13</td>
								  <td id="tableHTML_column_2">14-reynosa</td>
								  <td id="tableHTML_column_3">13-nuevo_laredo</td>
								  <td id="tableHTML_column_4">171</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">300</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">21</td>
								  <td id="tableHTML_column_1">14-16</td>
								  <td id="tableHTML_column_2">14-reynosa</td>
								  <td id="tableHTML_column_3">16-monterrey</td>
								  <td id="tableHTML_column_4">50</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">3000</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">22</td>
								  <td id="tableHTML_column_1">15-14</td>
								  <td id="tableHTML_column_2">15-matamoros</td>
								  <td id="tableHTML_column_3">14-reynosa</td>
								  <td id="tableHTML_column_4">99</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">350</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">23</td>
								  <td id="tableHTML_column_1">16-17</td>
								  <td id="tableHTML_column_2">16-monterrey</td>
								  <td id="tableHTML_column_3">17-saltillo</td>
								  <td id="tableHTML_column_4">170</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">1380</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">24</td>
								  <td id="tableHTML_column_1">17-24</td>
								  <td id="tableHTML_column_2">17-saltillo</td>
								  <td id="tableHTML_column_3">24-aguascalientes</td>
								  <td id="tableHTML_column_4">263</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">400</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">25</td>
								  <td id="tableHTML_column_1">18-25</td>
								  <td id="tableHTML_column_2">18-valles</td>
								  <td id="tableHTML_column_3">25-san_luis_potosi</td>
								  <td id="tableHTML_column_4">267</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">1500</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">26</td>
								  <td id="tableHTML_column_1">19-16</td>
								  <td id="tableHTML_column_2">19-huasteca</td>
								  <td id="tableHTML_column_3">16-monterrey</td>
								  <td id="tableHTML_column_4">99</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">1500</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">27</td>
								  <td id="tableHTML_column_1">19-18</td>
								  <td id="tableHTML_column_2">19-huasteca</td>
								  <td id="tableHTML_column_3">18-valles</td>
								  <td id="tableHTML_column_4">145</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">700</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">28</td>
								  <td id="tableHTML_column_1">19-20</td>
								  <td id="tableHTML_column_2">19-huasteca</td>
								  <td id="tableHTML_column_3">20-tamazunchale</td>
								  <td id="tableHTML_column_4">91</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">600</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">29</td>
								  <td id="tableHTML_column_1">19-21</td>
								  <td id="tableHTML_column_2">19-huasteca</td>
								  <td id="tableHTML_column_3">21-guemez</td>
								  <td id="tableHTML_column_4">153</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">1500</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">30</td>
								  <td id="tableHTML_column_1">19-32</td>
								  <td id="tableHTML_column_2">19-huasteca</td>
								  <td id="tableHTML_column_3">32-poza_rica</td>
								  <td id="tableHTML_column_4">201</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">500</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">31</td>
								  <td id="tableHTML_column_1">20-30</td>
								  <td id="tableHTML_column_2">20-tamazunchale</td>
								  <td id="tableHTML_column_3">30-queretaro</td>
								  <td id="tableHTML_column_4">154</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">1150</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">32</td>
								  <td id="tableHTML_column_1">20-31</td>
								  <td id="tableHTML_column_2">20-tamazunchale</td>
								  <td id="tableHTML_column_3">31-central</td>
								  <td id="tableHTML_column_4">246</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">1300</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">33</td>
								  <td id="tableHTML_column_1">21-16</td>
								  <td id="tableHTML_column_2">21-guemez</td>
								  <td id="tableHTML_column_3">16-monterrey</td>
								  <td id="tableHTML_column_4">98</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">1500</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">34</td>
								  <td id="tableHTML_column_1">22-23</td>
								  <td id="tableHTML_column_2">22-tepic</td>
								  <td id="tableHTML_column_3">23-guadalajara</td>
								  <td id="tableHTML_column_4">108</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">1200</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">35</td>
								  <td id="tableHTML_column_1">23-24</td>
								  <td id="tableHTML_column_2">23-guadalajara</td>
								  <td id="tableHTML_column_3">24-aguascalientes</td>
								  <td id="tableHTML_column_4">134</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">960</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">36</td>
								  <td id="tableHTML_column_1">23-26</td>
								  <td id="tableHTML_column_2">23-guadalajara</td>
								  <td id="tableHTML_column_3">26-salamanca</td>
								  <td id="tableHTML_column_4">85</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">700</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">37</td>
								  <td id="tableHTML_column_1">23-28</td>
								  <td id="tableHTML_column_2">23-guadalajara</td>
								  <td id="tableHTML_column_3">28-carapan</td>
								  <td id="tableHTML_column_4">277</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">2800</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
								<tr>
								  <td id="tableHTML_rownames">38</td>
								  <td id="tableHTML_column_1">23-29</td>
								  <td id="tableHTML_column_2">23-guadalajara</td>
								  <td id="tableHTML_column_3">29-lazaro_cardenas</td>
								  <td id="tableHTML_column_4">182</td>
								  <td id="tableHTML_column_5">0.99</td>
								  <td id="tableHTML_column_6">1000</td>
								  <td id="tableHTML_column_7">1</td>
								</tr>
							</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="row no-gutters mt-2">
					<div className="col mr-3">
						<CapacityMap data={data} />
					</div>
					<div className="col">
						<div className="row no-gutters">
							<div className="col">
								<div className="card border-0 rounded-0 singlenum">
									<h5 className="card-title">Total Installed Capacity</h5>
									<div className="card-body">
										<p className="largenum">1.8M</p>
										<p className="units">MW</p>
									</div>
								</div>
							</div>
							<div className="col ml-2">
								<div className="card border-0 rounded-0 singlenum">
									<h5 className="card-title">Total Installed Capacity</h5>
									<div className="card-body">
										<p className="largenum">1.8M</p>
										<p className="units">MW</p>
									</div>
								</div>
							</div>
							<div className="col ml-2">
								<div className="card border-0 rounded-0 singlenum">
									<h5 className="card-title">Total Installed Capacity</h5>
									<div className="card-body">
										<p className="largenum">1.8M</p>
										<p className="units">MW</p>
									</div>
								</div>
							</div>
						</div>
						<div className="row no-gutters mt-2">
							<div className="col-sm-4">
								<div className="card">
									<div className="card-body">
										<h6>More random facts</h6>
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
