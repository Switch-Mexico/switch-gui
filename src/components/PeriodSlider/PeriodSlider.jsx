import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './PeriodSlider.css';

const marks = {2016: 2016, 2017: 2017, 2018: 2018, 2019: 2019, 2020:2020};
export default class PeriodSlider extends React.Component {

	render() {
		let styleObj = {
			background: (this.props.bg === undefined || this.props.bg === null) ? 'white' : "transparent"
		};
		if(this.props.mb === "0") {
			styleObj['marginBottom'] = 0;
		}
		return (
			<div className="PeriodSlider" style={styleObj}>
				<h6 className="card-title fwb">{this.props.title === null ? "Periods" : this.props.title}</h6>
				<hr/>
				<div className="myslider">
					<Slider min={2016} max={2020} step={1} marks={marks} />
				</div>
				<hr style={{marginTop: '33px'}} />
			</div>
		);
	}
}
