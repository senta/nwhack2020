import React from 'react';
import { useSelector } from 'react-redux';

import './OpponentFieldMap.scss';

const OpponentFieldMap = () => {
  const players = useSelector(state => state.players);
  const playersMarkup = players.map((player,index) => <Opponent key={index} player={player}/>);
  return (
    <div id="minimap">
      {playersMarkup}
    </div>
  );
};

const Opponent = (props) => {
  const {name, state, progress, lastLine} = props.player;
  const finishLine = progress + 4 >= lastLine ? lastLine : progress + 4;
  const cells = (<>
    <td/><td/><td/><td/><td/><td/><td/><td/><td/><td/>
  </>)
  const emptyIndex = progress % 4;
  return (
    <div>
      <h2>{name}</h2>
      {state.multiply ? <span id="multiplier">{state.multiply}x</span> : null}
      <table>
        <tbody>
          <tr className={emptyIndex >= 1 ? 'complete' : 'empty'}>{cells}</tr>
          <tr className={emptyIndex >= 2 ? 'complete' : 'empty'}>{cells}</tr>
          <tr className={emptyIndex >= 3 ? 'complete' : 'empty'}>{cells}</tr>
          <tr className='empty'>{cells}</tr>
        </tbody>
      </table>
      <span id="last-line">{finishLine ? finishLine : null}</span>
    </div>
  );
}

export default OpponentFieldMap;
