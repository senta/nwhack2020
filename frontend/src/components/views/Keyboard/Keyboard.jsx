import React from 'react';

const Keyboard = () => {
  return (
    <div className="keyboard">
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
  );
};

export default Keyboard;
