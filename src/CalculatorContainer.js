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
      <CalculatorScreen screenState={screenState} gridPosition={[1, 1]} />
      <CalculatorNumbericButton number={1} onClick={handleNumberClick} gridPosition={[4, 1]} />
      <CalculatorNumbericButton number={2} onClick={handleNumberClick} gridPosition={[4, 2]} />
      <CalculatorNumbericButton number={3} onClick={handleNumberClick} gridPosition={[4, 3]} />
      <CalculatorNumbericButton number={4} onClick={handleNumberClick} gridPosition={[3, 1]} />
      <CalculatorNumbericButton number={5} onClick={handleNumberClick} gridPosition={[3, 2]} />
      <CalculatorNumbericButton number={6} onClick={handleNumberClick} gridPosition={[3, 3]} />
      <CalculatorNumbericButton number={7} onClick={handleNumberClick} gridPosition={[2, 1]} />
      <CalculatorNumbericButton number={8} onClick={handleNumberClick} gridPosition={[2, 2]} />
      <CalculatorNumbericButton number={9} onClick={handleNumberClick} gridPosition={[2, 3]} />
      <CalculatorNumbericButton number={0} onClick={handleNumberClick} gridPosition={[5, 1]} />
      <CalculatorNumbericButton number={'C'} onClick={resetScreen} gridPosition={[6, 3]} />
      <CalculatorNumbericButton number={'+'} onClick={handleOperator} gridPosition={[5, 4]} />
      <CalculatorNumbericButton number={'-'} onClick={handleOperator} gridPosition={[4, 4]} />
      <CalculatorNumbericButton number={'x'} onClick={handleOperator} gridPosition={[3, 4]} />
      <CalculatorNumbericButton number={'/'} onClick={handleOperator} gridPosition={[2, 4]} />
      <CalculatorNumbericButton number={'='} onClick={handleEquals} gridPosition={[5, 3]} />
    </div>
  )
}

export default CalculatorContainer;