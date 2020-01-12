import React from 'react';
import './Keyboard.scss';

const handleClick = () => console.log("clicked");

const Keyboard = (props) => {
  const action = (event) => {
    return () => props.socket.emit('PLAYER_ATTACK', {action: event, to: props.id});
  }
  return (
    <section id="keyboard">
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
