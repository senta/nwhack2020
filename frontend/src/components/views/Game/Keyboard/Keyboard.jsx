import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {finishLine, attack} from '../../../../lib/connection.js';
import { setInput, moveCoordinate } from '../../../../actions'
import './Keyboard.scss';

const Keyboard = () => {
  let [canAct, setAct] = useState(false);
  let [isNewLine, setNewLine] = useState(false);
  const action = (event) => {
    return () => {
      if (canAct) {
        attack(event);
        setAct(false);
      } else console.log("Can't act right now");
    }
  }
  const input = useSelector(state => state.input);
  const xNums = useSelector(state => state.xNums);
  const yNums = useSelector(state => state.yNums);
  const { x, y } = useSelector(state => state.coordinate);
  const answer = (xNums[x] * yNums[y]).toString();

  const dispatch = useDispatch();

  if(x === 0 && y > 0 && input === '' && isNewLine === false) {
    finishLine();
    setNewLine(true);
    if(canAct === false) setAct(true);
  } else if(x === 1 && y > 0 && input === '' && isNewLine === true) setNewLine(false);

  const handleClick = (value) => {
    return function () {
      const inputDigit = input.length;
      if (answer.toString().length > 1 && answer.toString().length > inputDigit) {
        if (value === answer.charAt(input.length)) {
          return input + value === answer ? dispatch(moveCoordinate()) : dispatch(setInput(input + value));
        } else {
          return dispatch(setInput(''));
        }
      } else if (input + value === answer){
          dispatch(moveCoordinate());
      }
    }
  };

  return (
    <section id="keyboard">
      <div className="numpad">
        <div>
          <button onClick={handleClick('7')}>7</button>
          <button onClick={handleClick('8')}>8</button>
          <button onClick={handleClick('9')}>9</button>
        </div>
        <div>
          <button onClick={handleClick('4')}>4</button>
          <button onClick={handleClick('5')}>5</button>
          <button onClick={handleClick('6')}>6</button>
        </div>
        <div>
          <button onClick={handleClick('1')}>1</button>
          <button onClick={handleClick('2')}>2</button>
          <button onClick={handleClick('3')}>3</button>
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
