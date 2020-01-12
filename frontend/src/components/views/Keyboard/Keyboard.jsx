import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInput, moveCoordinate } from '../../../actions'
import './Keyboard.scss';

const Keyboard = (props) => {
  const action = (event) => {
    return () => props.socket.emit('PLAYER_ATTACK', {action: event, to: props.id});
  }
  const input = useSelector(state => state.input);
  const xNums = useSelector(state => state.xNums);
  const yNums = useSelector(state => state.yNums);
  const { xAxis, yAxis } = useSelector(state => state.coordinate);
  const answer = (xNums[xAxis] * yNums[yAxis]).toString();

  const dispatch = useDispatch();

  const handleClick = (value) => {
    const inputDigit = value.length;
    if (answer.toString().length > 1 && answer.toString().length > inputDigit) {
      if (value === answer.slice(inputDigit - 1)) {
        return dispatch(setInput(input + value));
      } else {
        return dispatch(setInput(''));
      }
    } else {
      if (input + value === answer) {
        dispatch(setInput(input + value));
        dispatch(moveCoordinate());
      }
    }
  };

  return (
    <section id="keyboard">
      <div className="numpad">
        <div>
          <button onClick={handleClick('9')}>9</button>
          <button onClick={handleClick('8')}>8</button>
          <button onClick={handleClick('7')}>7</button>
        </div>
        <div>
          <button onClick={handleClick('6')}>6</button>
          <button onClick={handleClick('5')}>5</button>
          <button onClick={handleClick('4')}>4</button>
        </div>
        <div>
          <button onClick={handleClick('3')}>3</button>
          <button onClick={handleClick('2')}>2</button>
          <button onClick={handleClick('1')}>1</button>
        </div>
        <div>
          <button onClick={handleClick('0')}>0</button>
        </div>
      </div>
      <div className="actions-left">
        <button onClick={action('multiply')}>Multiply</button>
        <button onClick={action('transfer')}>Transfer</button>
      </div>
      <div className="actions-right">
        <button onClick={action('add')}>Add</button>
        <button onClick={action('remove')}>Remove</button>
      </div>
    </section>
  );
};

export default Keyboard;
