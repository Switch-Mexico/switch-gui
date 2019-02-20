import React from 'react';
import { Table } from 'reactstrap';
import './Table.css';

export default class T extends React.Component {
  render() {
    const list = this.props.data ? this.props.data : [];
    return (
      <div className="table">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Key</th>
              <th>Technology</th>
            </tr>
          </thead>
            <tbody>
              {list.map((tech, key) => (
                <tr key={key}>
                  <td>
                    <span
                     className="Legend--color"
                     style={{ backgroundColor: (tech in this.props.colors) ? this.props.colors[tech] : '#000000' }}
                    />
                  </td>
                  <td>{tech}</td>
                </tr>
              ))}
            </tbody>
        </Table>
      </div>
    );
  }

}
