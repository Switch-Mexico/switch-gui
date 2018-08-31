// TransmissionMap.jsx
import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import data from '../../data/powerPlants.json';
import cloneDeep from 'lodash/cloneDeep';

const mydata = cloneDeep(data);


const pad = (pad, str, padLeft) => {
	if (typeof str === 'undefined')
		return pad;
	if (padLeft)
		return (pad + str).slice(-pad.length);
	return (str + pad).substring(0, pad.length);
};
const createInfoBox  = () => {
	const info = L.control();

	info.onAdd = function() {
		this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		this.update();
		return this._div;
	};

	// method that we will use to update the control based on feature properties passed
	info.update = function(props) {
		let info;
		if(props !== undefined) {
			info = `<strong>From ${props.from} to ${props.to}</strong><br />Capacity: ${props.capacity}  [MW]`;
		}
		else{
			info = '<h6>Hover over a transmission line</h6>';
		}
		this._div.innerHTML = info;
	};
	return info;
}

const getWeight = (mw) => {
	// set the weight of the transmission line
	if(mw > 4000)
		return 8
	if(mw > 2000)
		return 7;
	if(mw > 1000)
		return 6;
	if(mw > 500)
		return 5;
	if(mw > 100)
		return 4;
	if(mw > 0)
		return 3;
	return 1;
};
function highlightFeature(infoBox, layer, props) {
	layer.setStyle({
		weight: 5,
		color: '#666',
		dashArray: '',
		fillOpacity: 1,
	});

	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
	}
	infoBox.update(props);
}

function resetHighlight(self, layer, weight, pane, color) {
	layer.setStyle({
		color: color,
		weight: weight,
		pane: pane,
	});

	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
	}
	self.update();
}

function zoomToFeature(layer, map) {
	map.fitBounds(layer.getBounds());
}
function capitalize(str) {
	let splittedEnter = str.split(' ');
	let capitalized;
	for (var i = 0; i < splittedEnter.length; i++) {
		capitalized = splittedEnter[i].charAt(0).toUpperCase();
		splittedEnter[i] = capitalized + splittedEnter[i].substr(1).toLowerCase();
	}
	return splittedEnter.join(' ');
}

const drawExistingTLs = (self, map, callback, args) => {
	// draw the new transmission lines
	if(!self.props.tlines)
		return false;
	let blueLines = [];

	blueLines = self.props.tlines.map(row => {
		// BUG: this is an assumption on the format of the data
		// TODO: need to design a DB architecture so that we don't have to parse data here
		let lz1 = row.trans_lz1.substring(0, 2); // get the id of transmission line from row in file (first two digits)
		let lz2 = row.trans_lz2.substring(0, 2);
		let lz1Name = capitalize(row.trans_lz1.substring(3)); // get the id of transmission line's name from row in file
		let lz2Name = capitalize(row.trans_lz2.substring(3));

		let weight = getWeight(row.existing_trans_cap_mw); // call funct to get weight

		let info = { from: lz1Name, to: lz2Name, capacity: row.existing_trans_cap_mw };

		// Add transparency to this line (some of them overlap)
		let polyline = L.polyline([self.country.loadZones[lz1], self.country.loadZones[lz2]], {
			color: '#0067c8',
			weight: weight,
			opacity: 0.6,
			pane: 'blue'
		});

		// Attach handlers
		polyline.on('click', e => {
			// TODO: make a closure of this function with `map`
			// then remove it from this method's parameters
			zoomToFeature(e.target, map);
		});

		polyline.on('mouseover', e => {
			highlightFeature(self.infoBox, e.target, info);
		});

		polyline.on('mouseout', e => {
			resetHighlight(self.infoBox, e.target, weight, 'blue', '#0067c8');
		});

		return polyline;
	});
	blueLines = L.layerGroup(blueLines);
	self.blueLines = blueLines;
	blueLines.addTo(map);
};

export default class TransmissionMap extends React.Component {
	componentDidMount() {
		this.loadMap();
	}

	drawLoadZones = (country, map) => {
		let coordinatesList = {};

		for (let key in country.balancingAreas) {
			// function to iterate over the geojson files and attach them a click function per feature (polygon, point .. shape)
			L.geoJson(country.balancingAreas[key].properties.shape.Prodesen, {
				// Get the centroid of each load zone and draw a circle there
				onEachFeature: function(feature, layer) {
					let id = pad("00", feature.properties.ID, true);
					let coordinates = layer.getBounds().getCenter();
					coordinatesList[id] = coordinates;

					L.circle([coordinates.lat, coordinates.lng], {
						color: '#0067c8', // set the points color opacity and radius
						fillColor: '#0067c8',
						fillOpacity: 0.3,
						opacity: 0.3,
						radius: 25000,
						pane: 'blue'
					}).addTo(map);
				}
			});
		}

		country.loadZones = coordinatesList;
		this.country = country;
	}
	loadMap = () => {

		// The map layer
		const baseLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
			attribution: '&copy;OpenStreetMap, &copy;CartoDB',
		});

		// Instantiate a new map
		const map = L.map(this.refs.transmission_map, {
			center: [23.8, -102.1],
			layers: [baseLayer],
			minZoom: 4,
			zoom: 5,
			zoomControl: true
		});

		// Move zoom control buttons to bottom right (default is top left)
		map.zoomControl.setPosition('bottomright');

		map.createPane('description').style.zIndex = 900;
		map.createPane('blue').style.zIndex = 901;
		map.createPane('labels').style.zIndex = 902; // Always show the labels on top of everything else

		// The labels for the map
		L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
			attribution: '&copy;OpenStreetMap, &copy;CartoDB',
			pane: 'labels'
		}).addTo(map);

		const data = cloneDeep(mydata.country);
		this.drawLoadZones(data, map);

		let infoBox = createInfoBox();

		infoBox.addTo(map);
		this.infoBox = infoBox;
		this.map = map;
		drawExistingTLs(this, map); // draws the blue lines
	}
	componentWillReceiveProps(nextProps) {
		drawExistingTLs(this, this.map);
	}
	render() {
		return (
			<div className="TransmissionMap h-100">
				<div id="map" className="h-100 mapleaf"  ref="transmission_map"></div>
			</div>
		);
	}
}
