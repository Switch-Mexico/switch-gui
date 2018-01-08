
import balz from '../../data/ba_lz';

const fuelNames = {
	'fuel_oil': "Fuel Oil",
	'uranium': "Uranium",
	'diesel': "Diesel",
	'natural_gas': "Natural Gas",
	'coal': "Coal",
	'wind': "Wind",
	'geosteam': "Geosteam",
	'water': "Water",
	'solar': "Solar"
};

// TODO: Add this to data file
export function calculatePercentagesLoadZones(data, mydata) {
	Object.keys(data).forEach(key => {
		data[key].renewable = data[key].projects.reduce((acc, project) => {
			if(project.is_renewable){
				return acc+project.gen_predetermined_cap;
			}
			return acc;
		}, 0);
		data[key].nonrenewable = data[key].total_capacity - data[key].renewable;
	});
	// For each load zone,
	Object.keys(data).forEach(key => {
		let brkdown = [];
		let techs = {};
		// {name: , value: };
		data[key].projects.forEach(project => {
			if(project.gen_energy_source in techs){
				techs[project.gen_energy_source] += project.gen_predetermined_cap;
			}
			else{
				techs[project.gen_energy_source] = project.gen_predetermined_cap;
			}
		});
		for(let source in techs){
			if(techs.hasOwnProperty(source)){
				const entry = {name: fuelNames[source], value: techs[source], code: source};
				brkdown.push(entry);
			}
		}
		data[key].breakdown = brkdown;
	});
	return {loadZoneProjects: data, data: processBalanceAreas(data, mydata)};
}
// powerPlants.json
export function processBalanceAreas(lzpjs, data){
	const bas = data.country.balancingAreas;
	Object.keys(bas).forEach(key => {
		let brkdown = [];
		let techs = {};
		balz[key].forEach(lzkey => {
			let lzk = parseInt(lzkey) + '';
			if(!(lzk in lzpjs))
				return;
			const loadZone = lzpjs[lzk];
			loadZone.breakdown.forEach(lztech => {
				if(lztech.code in techs){
					techs[lztech.code] += lztech.value;
				}
				else{
					techs[lztech.code] = lztech.value;
				}
			});
		})
		console.log(techs);
		for(let source in techs){
			if(techs.hasOwnProperty(source)){
				const entry = {name: fuelNames[source], value: techs[source]};
				brkdown.push(entry);
			}
		}
		bas[key].breakdown = brkdown;
	});
	// data.country.balancingAreas = bas;
	return data;
}
