import React, { useState, useRef, } from 'react'
import CalculatorNumbericButton from './CalculatorNumbericButton'
import CalculatorScreen from './CalculatorScreen';

function CalculatorContainer() {
  const [screenState, setScreenState] = useState("0");
  // const [result, setResult] = useState("0");
  const [operator, setOperator] = useState(null);
  const memory = useRef(0);
  // controls initial screen clear when operator selected
  const screenClearedOnOperator = useRef(false);

  function handleNumberClick({ target }) {
    console.log('handle number click');

    let clearScreen = false;
    if (operator !== null && screenClearedOnOperator.current === false) {
      screenClearedOnOperator.current = true;
      clearScreen = true;
    }

    if (screenState === '0') {
      clearScreen = true;
    }

    setScreenState((prevState) => {
      let newState = prevState;

      if (clearScreen) {
        newState = '';
      }

      newState += target.value;

      return newState;
    });
  }

  function handleOperator({ target }) {
    console.log(`handle operator: ${target.value}`);
    memory.current = parseInt(screenState);
    screenClearedOnOperator.current = false;
    setScreenState((prevState) =>
      (prevState += target.value)
    );
    setOperator(target.value);
  }

  function handleEquals() {
    if (operator === null) {
      return;
    }

    setScreenState((prevState) => {
      let newState;
      switch (operator) {
        case '+':
          newState = (parseInt(prevState) + memory.current).toString();
          break;
        case '-':
          newState = (parseInt(prevState) - memory.current).toString();
          break;
        case '/':
          newState = (parseInt(prevState) / memory.current).toString();
          break;
        case 'x':
          newState = (parseInt(prevState) * memory.current).toString();
          break;
        default:
          break;
      }
      return newState;
    });
  }

  function resetScreen() {
    setScreenState("0");
    setOperator(null);
    memory.current = 0;
    screenClearedOnOperator.current = false;
  }

  return (
    <div className="calculatorContainer">
      <CalculatorScreen screenState={screenState} />
      <CalculatorNumbericButton number={1} onClick={handleNumberClick} />
      <CalculatorNumbericButton number={2} onClick={handleNumberClick} />
      <CalculatorNumbericButton number={3} onClick={handleNumberClick} />
      <CalculatorNumbericButton number={4} onClick={handleNumberClick} />
      <CalculatorNumbericButton number={5} onClick={handleNumberClick} />
      <CalculatorNumbericButton number={6} onClick={handleNumberClick} />
      <CalculatorNumbericButton number={7} onClick={handleNumberClick} />
      <CalculatorNumbericButton number={8} onClick={handleNumberClick} />
      <CalculatorNumbericButton number={9} onClick={handleNumberClick} />
      <CalculatorNumbericButton number={0} onClick={handleNumberClick} />
      <button onClick={resetScreen}>C</button>
      <CalculatorNumbericButton number={'+'} onClick={handleOperator} />
      <CalculatorNumbericButton number={'-'} onClick={handleOperator} />
      <CalculatorNumbericButton number={'x'} onClick={handleOperator} />
      <CalculatorNumbericButton number={'/'} onClick={handleOperator} />
      {/* <button value={"+"} onClick={handleOperator}>+</button>
      <button value={'-'} onClick={handleOperator}>-</button>
      <button onClick={handleMult}>x</button>
      <button onClick={handleDivide}>/</button> */}
      <button onClick={handleEquals}>=</button>
    </div>
  )
}

export default CalculatorContainer;