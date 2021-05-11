import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './PeriodSlider.css';


const makeMarks = (periods) => {
	let retVal = {};
	periods.forEach(p => {retVal[p] = `${p}`});
	return retVal;
};
const thisMarks = {2016: 2016, 2017: 2017, 2018: 2018, 2019: 2019, 2020:2020};
export default class PeriodSlider extends React.Component {
	updatePeriod(period) {
		this.props.updatePeriod(period);
	}
	render() {
		let styleObj = {
			background: (this.props.bg === undefined || this.props.bg === null) ? 'white' : "transparent"
		};
		if(this.props.mb === "0") {
			styleObj['marginBottom'] = 0;
		}
		const marks = this.props.periods ? makeMarks(this.props.periods) : thisMarks;
		return (
			<div className="PeriodSlider" style={styleObj}>
				<h6 className="card-title fwb">{this.props.title === null ? "Periods" : this.props.title}</h6>
				<hr/>
				<div className="myslider">
					<Slider
						onAfterChange={(v) => this.updatePeriod(v)}
						min={this.props.periods ? Math.min(...this.props.periods) : 2016}
						max={this.props.periods ? Math.max(...this.props.periods) : 2020}
						step={null}
						marks={marks} />
				</div>
				<hr style={{marginTop: '33px'}} />
			</div>
		);
	}
}
