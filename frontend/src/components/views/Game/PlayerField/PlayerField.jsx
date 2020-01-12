import React from 'react';
import { useSelector } from 'react-redux';
import './PlayerField.scss';

const PlayerField = () => {
  const input = useSelector(state => state.input);
  const xNums = useSelector(state => state.xNums);
  const yNums = useSelector(state => state.yNums);

  return (
    <div className="player-field">
      <table>
        <tbody>
          <tr>
            <td></td>
            {
              xNums.map((xNum) => (
                <td>
                  <div>{xNum}</div>
                </td>
              ))
            }
          </tr>
          {
            yNums.map((yNum) => (
              <tr>
                <td>{yNum}</td>
                {
                  xNums.map((xNum) => (
                    <td>
                      <div></div>
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
