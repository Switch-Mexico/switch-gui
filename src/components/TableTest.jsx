import React from 'react'
import * as d3 from 'd3-dsv';


const buildTable = (content) => {
	if(!content) return;
	let rows = d3.csvParse(content);
	return(
		<table>
			<thead>
				<tr>
					{rows.columns.map(c => <th>{c}</th>)}
				</tr>
			</thead>
			<tbody>
				{rows.map(t => (
					<tr>
						{rows.columns.map(c => <td>{t[c]}</td>)}
					</tr>
				))}
			</tbody>
		</table>
	);
}
export default class TableTest extends React.Component {

	render() {
		return(
			<div>{buildTable(this.props.content)}</div>
		);
	}
}
