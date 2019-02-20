import React from 'react';
import { Table } from 'reactstrap';
import './Dispatch.css';

export default class T extends React.Component {
  render() {
    const dispatch_energy_source_list = (this.props.data && this.props.data['dispatch_energy_source_list']) ?
      this.props.data['dispatch_energy_source_list'] : [];
    return (
      <div className="table">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Key</th>
              <th>Energy Source</th>
            </tr>
          </thead>
            <tbody>
              {dispatch_energy_source_list.map((source, key) => (
                <tr key={key}>
                  <td>
                    <span
                     className="Legend--color"
                     style={{ backgroundColor: (source in this.props.energy_colors) ? this.props.energy_colors[source] : '#000000' }}
                    />
                  </td>
                  <td>{source}</td>
                </tr>
              ))}
            </tbody>
        </Table>
      </div>
    );
  }

}
