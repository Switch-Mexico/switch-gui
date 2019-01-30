// helpers.js

import * as d3 from 'd3-dsv';

export const parseTSV = (str) => {
	try {
		let res = d3.tsvParse(str);
		return res;
	} catch(e) {
		console.error(e);
		return null;
	}
};

export const parseCSV = (str) => {
	try {
		let res = d3.csvParse(str);
		return res;
	} catch(e) {
		console.error(e);
		return null;
	}
};

export const constructPeriods = (str) => {
	try {
		let res = d3.tsvParse(str);
		let periods = [];
		periods.push(+res[0]['period_start']);
		res.forEach((row, i) => {
			periods.push(+row['period_end']);
		});
		return periods;
	} catch(e) {
		console.error(e);
		return null;
	}
}

export const calculateTD = (str) => {
	try {
		let rows = d3.tsvParse(str);
		return rows.reduce((acc, row) => {
			return acc + parseFloat(row['existing_local_td'], 10);
		}, 0);
	}
	catch(e) {
		console.error(e);
		return null;
	}
};
