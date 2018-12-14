import React from 'react';
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area} from 'recharts';
import { parseTSV } from '../../helpers';
var dispatchGen = `GEN_TPS_1	GEN_TPS_2	DispatchGen
aes_merida_iii	662	12.9846624
aes_merida_iii	663	12.9846624
aes_merida_iii	664	12.9846624
aes_merida_iii	665	12.9846624
aes_merida_iii	666	12.9846624
aes_merida_iii	667	12.9846624
aes_merida_iii	668	12.9846624
aes_merida_iii	669	12.9846624
aes_merida_iii	670	12.9846624
aes_merida_iii	671	12.9846624
aes_merida_iii	672	12.9846624
aes_merida_iii,_merida_iii	662	418.9717734
aes_merida_iii,_merida_iii	663	418.9717734
aes_merida_iii,_merida_iii	664	418.9717734
aes_merida_iii,_merida_iii	665	418.9717734
aes_merida_iii,_merida_iii	666	418.9717734
aes_merida_iii,_merida_iii	667	418.9717734
aes_merida_iii,_merida_iii	668	418.9717734
aes_merida_iii,_merida_iii	669	418.9717734
aes_merida_iii,_merida_iii	670	418.9717734
aes_merida_iii,_merida_iii	671	418.9717734
aes_merida_iii,_merida_iii	672	418.9717734
alten_6	662	59.15516434
alten_6	663	116.6666702
alten_6	664	0
alten_6	665	0
alten_6	666	0
alten_6	667	92.78618774
alten_6	668	0
alten_6	669	0
alten_6	670	0
alten_6	671	116.6666702
alten_6	672	0
azufres_iii	662	22.505536
azufres_iii	663	22.505536
azufres_iii	664	22.505536
azufres_iii	665	22.505536
azufres_iii	666	22.505536
azufres_iii	667	22.505536
azufres_iii	668	22.505536
azufres_iii	669	22.505536
azufres_iii	670	22.505536
azufres_iii	671	22.505536
azufres_iii	672	22.505536
bii_nee_stipa_energia_eolica	662	7.538652
bii_nee_stipa_energia_eolica	663	8.6423832
bii_nee_stipa_energia_eolica	664	11.5156536
bii_nee_stipa_energia_eolica	665	8.685864
bii_nee_stipa_energia_eolica	666	9.045102
bii_nee_stipa_energia_eolica	667	11.2600488
bii_nee_stipa_energia_eolica	668	12.586464
bii_nee_stipa_energia_eolica	669	12.6580212
bii_nee_stipa_energia_eolica	670	12.7395576
bii_nee_stipa_energia_eolica	671	12.6900048
bii_nee_stipa_energia_eolica	672	12.9400524`;
var generation_projects_info = `GENERATION_PROJECT	gen_tech	gen_load_zone	gen_connect_cost_per_mw	gen_full_load_heat_rate	gen_variable_om	gen_capacity_limit_mw	gen_energy_source	gen_min_build_capacity	gen_scheduled_outage_rate	gen_forced_outage_rate	gen_max_age	gen_unit_size	gen_ccs_capture_efficiency	gen_ccs_energy_load	gen_storage_efficiency	gen_store_to_release_ratio	gen_is_variable	gen_is_baseload	gen_is_cogen
aes_merida_iii	combinedcycle_natural_gas	42-merida	99048.565	6.648195071	3.05	.	natural_gas	0	0.0696	0.0696	30	.	.	.	.	.	0	1	0
aes_merida_iii,_merida_iii	combinedcycle_natural_gas	42-merida	99048.565	6.648195071	3.05	.	natural_gas	0	0.0696	0.0696	30	.	.	.	.	.	0	1	0
aguamilpa_solidaridad	hydroelectric_water_nonrenewable	22-tepic	99048.565	.	0	.	water_nonrenewable	0	0.03	0.03	50	.	.	.	.	.	0	1	0
alten_6	solarpv	30-queretaro	99048.565	.	0	.	solar	0	0	0	25	.	.	.	.	.	1	0	0
azufres_iii	geothermal	28-carapan	99048.565	.	0.06	.	geosteam	0	0.0512	0.0512	30	.	.	.	.	.	0	1	0
bii_nee_stipa_energia_eolica	wind	40-ixtepec	99048.565	.	0	.	wind	0	0	0	25	.	.	.	.	.	1	0	0`;
var timepoints = `timepoint_id	timestamp	timeseries
662	2030102206	2030_10M
663	2030102212	2030_10M
664	2030102218	2030_10M
665	2030110300	2030_11M
666	2030110306	2030_11M
667	2030110312	2030_11M
668	2030110318	2030_11M
669	2030120600	2030_12M
670	2030120606	2030_12M
671	2030120612	2030_12M
672	2030120618	2030_12M`;


export default class GenerationDispatch extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data: {},
		};
	}
	prepData() {
		this.state.data['DispatchGen'] = parseTSV(dispatchGen);
		this.state.data['generation_projects_info'] = parseTSV(generation_projects_info);
		this.state.data['timepoints'] = parseTSV(timepoints);

		//prep generation_projects_info
		var gen_energy_source_list = [];
		var gen_energy_source_map = {};
		for (var i = 0; i < this.state.data['generation_projects_info'].length; i++) {
			var project_name = this.state.data['generation_projects_info'][i]["GENERATION_PROJECT"];
			var gen_energy_source = this.state.data['generation_projects_info'][i]["gen_energy_source"];
			gen_energy_source_map[project_name] = gen_energy_source;
			if (!(gen_energy_source in gen_energy_source_list)) {
				gen_energy_source_list.push(gen_energy_source);
			}
		}
		//prep timepoints
		var timepoints_map = {};
		for (var i = 0; i < this.state.data['timepoints'].length; i++) {
			timepoints_map[this.state.data['timepoints'][i]["timepoint_id"]] = this.state.data['timepoints'][i]["timestamp"];
		}

		var dispatch_data_map = {};
		for (var i = 0; i < this.state.data['DispatchGen'].length; i++) {
			var dispatch_entry = this.state.data['DispatchGen'][i];
			var project_name = dispatch_entry["GEN_TPS_1"];
			var gen_energy_source = gen_energy_source_map[project_name];
			var timepoint = dispatch_entry["GEN_TPS_2"];
			var dispatch = dispatch_entry["DispatchGen"];
			if (!(timepoint in dispatch_data_map)) {
				dispatch_data_map[timepoint] = {};
				dispatch_data_map[timepoint]["tps"] = timepoints_map[timepoint];
			}
			if (!(gen_energy_source in dispatch_data_map[timepoint])) {
				dispatch_data_map[timepoint][gen_energy_source] = dispatch;
			} else {
				dispatch_data_map[timepoint][gen_energy_source] = dispatch_data_map[timepoint][gen_energy_source] + dispatch;
			}
		}
		return Object.values(dispatch_data_map);
	}
	render() {
		return (
			<div>
				<h1 className="maintitle">Generation Dispatch</h1>
				<input type="file" id="fileinput" onChange={this.props.loadCSV}/>
				<AreaChart width={600} height={400} data={this.prepData()}
				            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
	        <CartesianGrid strokeDasharray="3 3"/>
	        <XAxis dataKey="tps"/>
	        <YAxis/>
	        <Tooltip/>
					<Legend/>
					<Area type='monotone' dataKey='coal' stackId="1" stroke='#192b42' fill='#192b42' />
					<Area type='monotone' dataKey='diesel' stackId="1" stroke='#c78181' fill='#c78181' />
					<Area type='monotone' dataKey='fuel_oil' stackId="1" stroke='#41264f' fill='#41264f' />
					<Area type='monotone' dataKey='geosteam' stackId="1" stroke='#cd5c5c' fill='#cd5c5c' />
					<Area type='monotone' dataKey='water_nonrenewable' stackId="1" stroke='#669999' fill='#669999' />
					<Area type='monotone' dataKey='natural_gas' stackId="1" stroke='#91b29f' fill='#91b29f' />
					<Area type='monotone' dataKey='solar' stackId="1" stroke='#ffe697' fill='#ffe697' />
					<Area type='monotone' dataKey='uranium' stackId="1" stroke='#8dd228' fill='#8dd228' />
					<Area type='monotone' dataKey='water_renewable' stackId="1" stroke='#003366' fill='#003366' />
					<Area type='monotone' dataKey='wind' stackId="1" stroke='#336699' fill='#336699' />
					<Area type='monotone' dataKey='solar_distributed' stackId="1" stroke='#facc40' fill='#facc40' />
					<Area type='monotone' dataKey='natural_gas_cogen' stackId="1" stroke='#b8adba' fill='#b8adba' />
	      </AreaChart>
			</div>
		);
	}
}
