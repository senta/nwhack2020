import React, { useState } from 'react';
import './PlayerField.scss';

const PlayerField = () => {
  const [rowNum, setRowNum] = useState(10);
  const [colNum, setColNum] = useState(10);

  const generateRows = (num) => {
    let rows = [];
    for (let i = 0; i < num; i++) {
      rows.push(
        <tr>
          {generateColmns(colNum)}
        </tr>
      );
    }
    return rows;
  };

  const generateColmns = (num) => {
    let colmns = [];
    for (let i = 0; i < num; i++) {
      colmns.push(
        <td>
          <div>
            <input type="text" />
          </div>
        </td>
      );
    }
    return colmns;
  };

  return (
    <div className="player-field">
      <table>
        <tbody>
          {generateRows(rowNum)}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerField;
