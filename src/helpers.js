import * as d3 from 'd3-dsv';

export const parseTSV = (str) => {
	console.log(str);
	try {
		let res = d3.tsvParse(str);
		console.log(res);
		return res;
	} catch(e) {
		console.error(e);
		return null;
	}
};

