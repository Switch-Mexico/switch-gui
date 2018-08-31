// <CapacityMap />

import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


import {createInfoBox, setGeoJSON, createLegend} from './mapHelpers.js';

export default class CapacityMap extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	componentDidMount() {
		this.loadMap();
	}
	loadMap() {

		// The map layer
		const baseLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
			attribution: '&copy;OpenStreetMap, &copy;CartoDB',
		});


		// Instantiate a new map
		const map = L.map(this.refs.capacity_map, {
			center: [23.8, -102.1],
			layers: [baseLayer],
			minZoom: 4,
			zoom: 5,
			zoomControl: true
		});

		// Move zoom control buttons to bottom right (default is top left)
		map.zoomControl.setPosition('bottomright');

		map.createPane('shapes').style.zIndex = 900;
		map.createPane('labels').style.zIndex = 901; // Always show the labels on top of everything else

		// The labels for the map
		L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
			attribution: '&copy;OpenStreetMap, &copy;CartoDB',
			pane: 'labels'
		}).addTo(map);



		// Add the box with load zone/balance area info on the top right
		let infoBox = createInfoBox();

		let shapeLayers = setGeoJSON(this.props.data.country, map, this, infoBox);

		infoBox.addTo(map);

		let mapLegend = createLegend(this.props.data.country);
		mapLegend.addTo(map);


		map.addLayer(shapeLayers.Switch);

		// Add a controller for the layers (these are base layers, only one of them can be selected at a time)
		// let controller = L.control.layers(shapeLayers).addTo(map);
		L.control.layers(shapeLayers).addTo(map);

		// Update <Map /> state
		// this.props.setLegend(mapLegend);
		// this.props.setLayers(controller);
		// this.props.setMap(map);
	}
	render() {
		// TODO: Maybe render a loading icon
		return(
			<div className="CapacityMap h-100">
				<div id="map" className="h-100 mapleaf"  ref="capacity_map"></div>
			</div>
		);
	}
}
