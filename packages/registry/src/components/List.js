import React from 'react';
import { ListItem } from './ListItem.js';

export function List({nominees}) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>License</th>
          <th>Past year of activity</th>
        </tr>
      </thead>
      <tbody>
        {nominees.map((item, index) => (
          <ListItem item={item} index={index} key={index} />
        ))}
      </tbody>
    </table>
  )
}