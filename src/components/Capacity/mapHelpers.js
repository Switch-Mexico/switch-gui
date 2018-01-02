// mapHelpers.js for Capacity Map
import L from 'leaflet';

// Create the infoBox
export function createInfoBox() {

	let info = L.control();

	info.onAdd = function() {
		this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		this.update();
		return this._div;
	};

	// method that we will use to update the control operating over the feature properties received
	info.update = function(props) {
		let info;
		if(props !== undefined) {
			// TODO: Use classes for styling this
			info  = `<div><span style="float: left;">Balancing Area:</span> <strong style="float: right;">${props.b_a.name}</strong></div>`;
			info += `<div><span style="float: left;">Installed Capacity:</span> <strong style="float: right;">&nbsp;&nbsp;${props.b_a.total} [MW]</strong></div>`;
			info += `<div><span style="float: left;">Load Zone:</span> <strong style="float: right;">${props.l_z.name}</strong></div>`;
			info += `<div><span style="float: left;">Installed Capacity:</span> <strong style="float: right;">${props.l_z.total} [MW]</strong></div>`;
		}
		else {
			info = 'Hover over a Load Zone';
		}
		this._div.innerHTML = info;
	};

	return info;
}

