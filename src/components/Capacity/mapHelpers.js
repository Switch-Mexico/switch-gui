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

export function createLegend(country) {

	// Instantiate new Control
	let legend = L.control({ position: 'bottomleft' });

	legend.onAdd = function() {
		let div = L.DomUtil.create('div', 'info legend');

		// loop through our balancing_areas and generate a label with a colored square for each balancing_area

		for (var key in country.balancingAreas) {
			if(country.balancingAreas.hasOwnProperty(key)) {
				const ba = country.balancingAreas[key].properties;
				div.innerHTML += `<i style="background:${ba.color}"></i> ${ba.name}<br>`;
			}
		}
		return div;
	};

	return legend;
}

export function setGeoJSON(country, map, a, mapInfo) {
	// dafuq? This is incredibly slow
	// var country = JSON.parse(JSON.stringify(country));
	let shapeLayers = {};
	let shapeNames = {
		'Prodesen': '',
		'Switch': ''
	};
	for (let shapeName in shapeNames) {
		// iterates over the shapes that a country has (in our case both the ones provided by prodesen and the ones generated with Mateo's work)

		let geojsonLayers = [];

		// For each balance area
		for (let key in country.balancingAreas) {
			// function to iterate over the geojson files and attach them a click handler per feature (polygon, point..shape)

			let shapes = country.balancingAreas[key].properties.shape[shapeName].features;

			// For each load zone in this balance area, store in newShapes the shape if it exists in loadZones
			let newShapes = []; // An array of load zones
			let keys = Object.keys(country.loadZones);

			shapes.forEach(obj =>
				keys.forEach(k => {
					if (obj.properties.ID === k) {
						newShapes.push(obj);
					}
				})
			);
			// Reordering? according to the loadZones?
			country.balancingAreas[key].properties.shape[shapeName].features = newShapes;

			geojsonLayers.push(
				L.geoJson(country.balancingAreas[key].properties.shape[shapeName], {
					fillColor: country.balancingAreas[key].properties.color,
					weight: 2,
					opacity: 1,
					color: 'white',
					dashArray: '3',
					fillOpacity: 0.7,
					b_a: country.balancingAreas[key],
					pane: 'shapes',
					onEachFeature: function(feature, layer) {
						layer.on('click', e => {
							console.log('hello');
							// let id = feature.properties.ID;
							// zoomToFeature(layer, map);
							// handleClick(country.loadZones[id], a);
						});
						layer.on('mouseover', e => {
							console.log('hello');
							// highlightFeature(layer, layer.feature.properties, map, country, key, a, mapInfo);
						});

						layer.on('mouseout', e => {
							console.log('hello');
							// resetHighlight(layer, mapInfo, a);
						});
					},
				})
			);

		}
		// geojsonLayers.forEach(layer => {
		// 	let featureGroup = L.featureGroup([layer]);
		// 	featureGroup.on('click', () => handleClick(layer.options.b_a, a));
		// });

		shapeLayers[shapeName] = L.layerGroup(geojsonLayers);
	}
	return shapeLayers;
}
