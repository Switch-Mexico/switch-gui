import React from 'react';
import Table from '../Charts/Table'
import {
	Area,
	AreaChart,
	Brush,
	CartesianGrid,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { energy_colors } from '../Charts/colors'

const getInitialState = {
  startIndex: 0,
  endIndex: 1,
  timerId: 0,
  left: 0,
  right: 0,
  data: [],
};

export default class GenerationDispatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = getInitialState;
  }

  handleMouseWheel = evt => {
    if (evt.deltaY > 0) {
      this.setState(({ data, left = 0, right = 0 }) => {
        return {
          animation: true,
          left: 0,
          right: 0
        }
      });
    } else if (evt.deltaY < 0) {
      this.setState(({ data, left = 0, right = 0 }) => {
        return {
          animation: true,
          left: left - 500,
          right: right - 500,
        }
      });
    }
  }

	area(source, key){
		return (
			<Area
				key={key}
				type='monotone'
				dataKey={source}
				stackId="1"
				strokeOpacity={.5}
				stroke={(source in energy_colors) ? energy_colors[source] : '#000000'}
				fill={(source in energy_colors) ? energy_colors[source] : '#000000'} />
		)
	}

  updateBrush(pos) {
    if (this.state.timerId !== 0) {
      clearTimeout(this.timerId);
    }
    this.state.timerId = setTimeout(() => {
      this.setState({ startIndex: pos.startIndex, endIndex: pos.endIndex });
    }, 500)
  }

  render() {
    const { animation, left, right } = this.state;
		const propsEndIndex = (this.props.data && this.props.data['dispatch']) ? this.props.data['dispatch'].length : 1;
		const dispatch_energy_source_list = (this.props.data && this.props.data['dispatch_energy_source_list']) ?
      this.props.data['dispatch_energy_source_list'] : [];
		const dispatchAreaChart = dispatch_energy_source_list.filter(
			(source, key) => source !== 'solar' && source !== 'wind'
		).map(
			(source, key) => this.area(source, key)
		).concat(
			[
				this.area('wind', dispatch_energy_source_list.length + 1),
				this.area('solar', dispatch_energy_source_list.length + 2)
			]
		)
    return (
      <div>
      	<h1 className="maintitle">Generation Dispatch (MW)</h1>
				<p align="center">Load project from sidebar including dispatch.csv file and wait for the graph</p>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart className = "area-chart"
						data={(this.props.data && this.props.data['dispatch']) ? this.props.data['dispatch'] : []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              padding={{ left: left, right: right }}
              tick={true}
              domain={['dataMin', 'dataMax ']} />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={0} stroke='#000' />
            <Brush
							dataKey='timestamp'
							height={30} stroke="#8884d8"
							onChange={(e) => this.updateBrush(e)}
							tick={true}>
							<AreaChart data={this.state.data}>
	              {dispatchAreaChart}
							</AreaChart>
            </Brush>
						{dispatchAreaChart}
          </AreaChart>
        </ResponsiveContainer>
				<Table data={this.props.data ? this.props.data['dispatch_energy_source_list'] : []} colors={energy_colors}/>
      </div>
    );
  }
}
