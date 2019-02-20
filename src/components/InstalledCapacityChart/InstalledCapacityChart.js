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
import { energy_colors, tech_colors } from '../Charts/colors'

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

	areaEnergySource(source, key){
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

  areaTech(tech, key){
		return (
			<Area
				key={key}
				type='monotone'
				dataKey={tech}
				stackId="1"
				strokeOpacity={.5}
				stroke={(tech in tech_colors) ? tech_colors[tech] : '#000000'}
				fill={(tech in tech_colors) ? tech_colors[tech] : '#000000'} />
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
		const propsEndIndex = (this.props.data && this.props.data['gen_cap']) ? this.props.data['gen_cap'].length : 1;
		const gen_energy_source_list = (this.props.data && this.props.data['gen_energy_source_list']) ?
      this.props.data['gen_energy_source_list'] : [];
    const genSourceAreaChart = gen_energy_source_list.map(
      (source, key) => this.areaEnergySource(source, key)
    )
    const gen_tech_list = (this.props.data && this.props.data['gen_tech_list']) ?
      this.props.data['gen_tech_list'] : [];
    const genTechAreaChart = gen_tech_list.map(
      (tech, key) => this.areaTech(tech, key)
    )
    return (
      <div>
      	<h1 className="maintitle">Installed Capacity (MW)</h1>
				<p align="center">Load project from sidebar including gen_cap.txt file and wait for the graph</p>
        <h2>sorted by energy source</h2>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart className = "area-chart"
						data={(this.props.data && this.props.data['gen_cap_energy_source']) ? this.props.data['gen_cap_energy_source'] : []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="PERIOD"
              padding={{ left: left, right: right }}
              tick={true}
              domain={['dataMin', 'dataMax ']} />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={0} stroke='#000' />
            <Brush
							dataKey='PERIOD'
							height={30} stroke="#8884d8"
							onChange={(e) => this.updateBrush(e)}
							tick={true}>
							<AreaChart data={this.state.data}>
	              {genSourceAreaChart}
							</AreaChart>
            </Brush>
						{genSourceAreaChart}
          </AreaChart>
        </ResponsiveContainer>
        <Table data={this.props.data ? this.props.data['gen_energy_source_list'] : []} colors={energy_colors}/>

        <h2>sorted by generation technology</h2>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart className = "area-chart"
            data={(this.props.data && this.props.data['gen_cap_tech']) ? this.props.data['gen_cap_tech'] : []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="PERIOD"
              padding={{ left: left, right: right }}
              tick={true}
              domain={['dataMin', 'dataMax ']} />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={0} stroke='#000' />
            <Brush
              dataKey='PERIOD'
              height={30} stroke="#8884d8"
              onChange={(e) => this.updateBrush(e)}
              tick={true}>
              <AreaChart data={this.state.data}>
                {genTechAreaChart}
              </AreaChart>
            </Brush>
            {genTechAreaChart}
          </AreaChart>
        </ResponsiveContainer>
        <Table data={this.props.data ? this.props.data['gen_tech_list'] : []} colors={tech_colors}/>
      </div>
    );
  }
}
