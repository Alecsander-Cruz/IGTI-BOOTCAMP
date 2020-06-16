import React, { Component } from 'react';

export default class Band extends Component {
  constructor() {
    super();
    this.state = {
      bandName: 'Twenty One Pilots',
      bandMembers: [
        {
          id: 1,
          name: 'Tyler Joseph',
          instrument: 'Vocal',
        },
        {
          id: 2,
          name: 'Josh Dun',
          instrument: 'Bateria',
        },
      ],
    };
  }
  render() {
    const { bandName, bandMembers } = this.state;
    return (
      <div>
        <h4>{bandName}</h4>
        <ul>
          {bandMembers.map(({ id, name, instrument }) => {
            return (
              <li key={id}>
                {name} - {instrument}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
