import React from 'react';
import { useSelector } from 'react-redux';
import './PlayerField.scss';

const PlayerField = () => {
  const coordinate = useSelector(state => state.coordinate);
  const xNums = useSelector(state => state.xNums);
  const yNums = useSelector(state => state.yNums);
  const { x, y } = useSelector(state => state.coordinate);

  const displayNumber = (yIndex, xIndex) => {
    if (yIndex === y) {
      if (xIndex === x) { // current column
        return input;
      } else if (xIndex < x) { // columns in the current row bedore the current column
        return xNums[xIndex] * yNums[yIndex];
      } else { // columns in the current row after the current column
        return '';
      }
    } else if (yIndex < y) { // columns before the current column
      return xNums[xIndex] * yNums[yIndex]
    } else { // columns after the current column
      return '';
    }
  };

  return (
    <div className="player-field">
      <table>
        <tbody>
          <tr>
            <td></td>
            {
              xNums.map((xNum, index) => (
                <td key={index}>
                  <div>{xNum}</div>
                </td>
              ))
            }
          </tr>
          {
            yNums.map((yNum, yIndex) => (
              <tr key={yIndex}>
                <td>{yNum}</td>
                {
                  xNums.map((xNum, xIndex) => (
                    <td key={xIndex}>
                      <div>
                        {displayNumber(yIndex, xIndex)}
                      </div>
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default PlayerField;
