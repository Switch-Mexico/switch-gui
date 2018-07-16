import React from 'react';

import ba2lz from '../../data/ba_lz';

// TODO: remove missing load zones
const missingLZs = ["06", "41", "45", "47", "49", "19", "20", "52", "26"];

const getLZs = (balanceArea, data) => {
	const existing = ba2lz[balanceArea].filter(lz => missingLZs.indexOf(lz) === -1);
	return existing.map(lz => {
		return {id: lz, name: data.loadZones[lz].properties.name};
	});
};

const getPJs = (loadZone, projects) => {
	return projects[loadZone].projects.map((project, index) => ({id: index, name: project.name}));
};
let propMap = {
	'bas': 'balanceArea',
	'lzs': 'loadZone',
	'pjs': 'project'
};

// TODO: there are projects for the missing loadzones even if there are no details for those load zones in PowerPlants.csv
export default class CapacityFilters extends React.Component{
	constructor() {
		super();
		this.state = {
			selects: {
				'bas': { // keys should all be 3 letters
					default: '-- Balance area --',
					disabled: true,
					options: []
				},
				'lzs': {
					default: '-- Load zone --',
					disabled: true,
					options: []
				},
				'pjs': {
					default: '-- Project name --',
					disabled: true,
					options: []
				}
			}
		};
		this.populateSelects = this.populateSelects.bind(this);
		this.handleSelect = this.handleSelect.bind(this);

	}
	componentDidMount() {
		const bas = this.props.data.balancingAreas;
		this.baNames = Object.keys(bas).map(bakey => {
			return {id: bakey, name: bas[bakey].properties.name};
		});

		// Enable balance areas
		const selects = {...this.state.selects};
		selects['bas'].options = this.baNames;
		selects['bas'].disabled = false;
		this.setState({selects});

		this.populateSelects();

	}
	componentWillReceiveProps(nextProps) {
		this.populateSelects(nextProps);
	}
	populateSelects(nextProps) {
		// Populate the balance areas select
		const {balanceArea, loadZone, project, lz_pjs} = nextProps || this.props;
		const selects = {...this.state.selects};

		selects['lzs'].disabled = balanceArea === null;
		selects['pjs'].disabled = loadZone === null;

		if(balanceArea !== null){
			// Get the load zones for this balance area and populate the options with it
			selects['lzs'].options = getLZs(balanceArea, nextProps.data);
		}
		if(loadZone !== null){
			// Get the projects for this load zone and populate the options with it
			selects['pjs'].options = getPJs(loadZone, lz_pjs);
		}
		this.setState({selects});
	}
	handleSelect(e) {
		const val = e.target.value;
		const selectName = e.target.name.substring(0,3);
		const selects = {...this.state.selects};
		selects[selectName].selected = val;
		this.setState({selects});
		this.props.updateSelected(selectName, val);
	}
	render() {
		const selects = this.state.selects;
		return(
			<div className="Filters mb-4">
				<div className="row">
					{Object.keys(selects).map(select =>
						<div key={select} className="col-sm-4 fw300">
							<select
								onChange={this.handleSelect}
								disabled={selects[select].disabled}
								name={`${select}_filter`}
								value={this.props[propMap[select]] || ""}
								className="custom-select"
								id=""
							>

								<option value="">{selects[select].default}</option>

								{selects[select].options.map((opt, i) =>
									<option key={i} value={opt.id}>{opt.name}</option>
								)}

							</select>
						</div>
					)}
				</div>
			</div>
		);
	}
}
