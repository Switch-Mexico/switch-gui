import React from 'react';
import {
	Area,
	AreaChart,
	Brush,
	CartesianGrid,
	Legend,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { parseCSV } from '../../helpers';

const getInitialState = {
  startIndex: 0,
  endIndex: 9,
  timerId: 0,
  left: 0,
  right: 0,
  data: [],
}

export default class GenerationDispatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = getInitialState;
    fetch('/dispatch.csv')
			.then((r) => r.text())
			.then((text) => {
				const dispatch = parseCSV(text);
				var dispatch_data_map = {};
				for (var i = 0; i < dispatch.length; i++) {
					var dispatch_entry = dispatch[i];
					var gen_energy_source = dispatch_entry['gen_energy_source'];
					var timestamp = dispatch_entry['timestamp'];
					if (!(timestamp in dispatch_data_map)) {
						dispatch_data_map[timestamp] = {};
						dispatch_data_map[timestamp]['timestamp'] = dispatch_entry['timestamp'];
					}
					if (!(gen_energy_source in dispatch_data_map[timestamp])) {
						dispatch_data_map[timestamp][gen_energy_source] =
							parseFloat(dispatch_entry['DispatchGen_MW']);
					} else {
						dispatch_data_map[timestamp][gen_energy_source] =
							dispatch_data_map[timestamp][gen_energy_source]
							+ parseFloat(dispatch_entry['DispatchGen_MW']);
					}
				}
				this.setState({data:Object.values(dispatch_data_map)});
			}
		)
  }

  handleMouseWheel = evt => {
    if (evt.deltaY > 0) {
      var datalength = this.state.data.length
      console.log(datalength)
      this.setState(({ data, left = 0, right = 0 }) => {
        return {
          animation: true,
          left: 0,
          right: 0
        }
      })
    } else if (evt.deltaY < 0) {
      this.setState(({ data, left = 0, right = 0 }) => {
        return {
          animation: true,
          left: left - 500,
          right: right - 500,

        }
      })
    }
  }

  updateBrush(pos) {
    if (this.state.timerId !== 0) {
      clearTimeout(this.timerId)
    }
    this.state.timerId = setTimeout(() => {
      this.setState({ startIndex: pos.startIndex, endIndex: pos.endIndex })
    }, 500)
  }

  render() {
    console.log(this.state)
    const { animation, left, right } = this.state
    const values = this.state.data.map((i) => i.uv)
    console.log(values)
    const gradientOffset = () => {
      const dataMax = Math.max(...values)
      const dataMin = Math.min(...values)
      if (dataMax <= 0) {
        return 0
      }
      else if (dataMin >= 0) {
        return 1
      }
      else {
        return dataMax / (dataMax - dataMin);
      }
    }
    const off = gradientOffset();

    return (
      <div >
      	<h1 className="maintitle">Generation Dispatch (MW)</h1>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart width={600} height={300} data={this.state.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              padding={{ left: left, right: right }}
              tick={true}
              domain={['dataMin', 'dataMax ']} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
            <ReferenceLine y={0} stroke='#000' />
            <Brush dataKey='timestamp' height={30} stroke="#8884d8" onChange={(e) => this.updateBrush(e)} startIndex={this.state.startIndex} endIndex={this.state.endIndex}
              padding={{ left: left, right: 10 }}
              tick={true}>
              <AreaChart data={this.state.data}>
                <Area type='monotone' dataKey='coal' stackId="1" stroke='#192b42' fill='#192b42' />
									<Area type='monotone' dataKey='diesel' stackId="1" stroke='#c78181' fill='#c78181' />
									<Area type='monotone' dataKey='fuel_oil' stackId="1" stroke='#41264f' fill='#41264f' />
									<Area type='monotone' dataKey='natural_gas' stackId="1" stroke='#91b29f' fill='#91b29f' />
									<Area type='monotone' dataKey='uranium' stackId="1" stroke='#8dd228' fill='#8dd228' />
									<Area type='monotone' dataKey='solar_distributed' stackId="1" stroke='#facc40' fill='#facc40' />
									<Area type='monotone' dataKey='natural_gas_cogen' stackId="1" stroke='#b8adba' fill='#b8adba' />
									<Area type='monotone' dataKey='water_nonrenewable' stackId="1" stroke='#669999' fill='#669999' />
									<Area type='monotone' dataKey='water_renewable' stackId="1" stroke='#003366' fill='#003366' />
									<Area type='monotone' dataKey='geosteam' stackId="1" stroke='#cd5c5c' fill='#cd5c5c' />
									<Area type='monotone' dataKey='solar' stackId="1" stroke='#ffe697' fill='#ffe697' />
									<Area type='monotone' dataKey='wind' stackId="1" stroke='#336699' fill='#336699' />
              </AreaChart>
            </Brush>
            <Area type='monotone' dataKey='coal' stackId="1" stroke='#192b42' fill='#192b42' />
							<Area type='monotone' dataKey='diesel' stackId="1" stroke='#c78181' fill='#c78181' />
							<Area type='monotone' dataKey='fuel_oil' stackId="1" stroke='#41264f' fill='#41264f' />
							<Area type='monotone' dataKey='natural_gas' stackId="1" stroke='#91b29f' fill='#91b29f' />
							<Area type='monotone' dataKey='uranium' stackId="1" stroke='#8dd228' fill='#8dd228' />
							<Area type='monotone' dataKey='solar_distributed' stackId="1" stroke='#facc40' fill='#facc40' />
							<Area type='monotone' dataKey='natural_gas_cogen' stackId="1" stroke='#b8adba' fill='#b8adba' />
							<Area type='monotone' dataKey='water_nonrenewable' stackId="1" stroke='#669999' fill='#669999' />
							<Area type='monotone' dataKey='water_renewable' stackId="1" stroke='#003366' fill='#003366' />
							<Area type='monotone' dataKey='geosteam' stackId="1" stroke='#cd5c5c' fill='#cd5c5c' />
							<Area type='monotone' dataKey='solar' stackId="1" stroke='#ffe697' fill='#ffe697' />
							<Area type='monotone' dataKey='wind' stackId="1" stroke='#336699' fill='#336699' />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
