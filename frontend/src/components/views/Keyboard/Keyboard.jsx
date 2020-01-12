import React from 'react';
import './Keyboard.scss';

const Keyboard = () => {
  return (
    <>
      <div className="numpad">
        <div>
          <button onClick={handleClick}>9</button>
          <button onClick={handleClick}>8</button>
          <button onClick={handleClick}>7</button>
        </div>
        <div>
          <button onClick={handleClick}>6</button>
          <button onClick={handleClick}>5</button>
          <button onClick={handleClick}>4</button>
        </div>
        <div>
          <button onClick={handleClick}>3</button>
          <button onClick={handleClick}>2</button>
          <button onClick={handleClick}>1</button>
        </div>
        <div>
          <button onClick={handleClick}>0</button>
        </div>
      </div>
      <div className="actions-left">
        <button>Multiply</button>
        <button>Transfer</button>
      </div>
      <div className="actions-right">
        <button>Add</button>
        <button>Remove</button>
      </div>
    </>
  );
};

export default Keyboard;
