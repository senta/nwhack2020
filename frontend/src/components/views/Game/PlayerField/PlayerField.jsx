import React from 'react';
import { useSelector } from 'react-redux';
import './PlayerField.scss';

const PlayerField = () => {
  const coordinate = useSelector(state => state.coordinate);
  const xNums = useSelector(state => state.xNums);
  const yNums = useSelector(state => state.yNums);

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
                  xNums.map((xNum, xIndex) => {
                    return (
                      <td key={xIndex}>
                        <div>{(coordinate.y > yIndex || (coordinate.x > xIndex && coordinate.y === yIndex)) ? yNum * xNum : null}</div>
                      </td>
                    )
                  })
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
