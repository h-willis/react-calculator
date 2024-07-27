import React, { useState, useRef, } from 'react'
import CalculatorButton from './CalculatorButton'
import CalculatorScreen from './CalculatorScreen';

function CalculatorContainer() {
  const [screenState, setScreenState] = useState("0");
  // const [result, setResult] = useState("0");
  const [operator, setOperator] = useState(null);
  const memory = useRef(0);
  // controls initial screen clear when operator selected
  const screenClearedOnOperator = useRef(false);

  function handleNumberClick({ target }) {
    // TODO fix decimal place use
    console.log('handle number click');

    let clearScreen = false;
    if (operator !== null && screenClearedOnOperator.current === false) {
      screenClearedOnOperator.current = true;
      clearScreen = true;
    }

    if (screenState === '0') {
      clearScreen = true;
    }

    // TODO handle screensize
    setScreenState((prevState) => {
      let newState = prevState;

      if (clearScreen) {
        newState = '';
      }

      newState += target.value;

      return newState;
    });
  }

  // TODO handle sequential operator inputs
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
      let result;
      switch (operator) {
        case '+':
          result = memory.current + parseFloat(prevState);
          break;
        case '-':
          result = memory.current - parseFloat(prevState);
          break;
        case '/':
          result = memory.current / parseFloat(prevState);
          break;
        case 'x':
          result = memory.current * parseFloat(prevState);
          break;
        default:
          alert('unknown operator');
          break;
      }

      return result.toString();
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
      <CalculatorButton symbol={1} onClick={handleNumberClick} gridPosition={[4, 1]} />
      <CalculatorButton symbol={2} onClick={handleNumberClick} gridPosition={[4, 2]} />
      <CalculatorButton symbol={3} onClick={handleNumberClick} gridPosition={[4, 3]} />
      <CalculatorButton symbol={4} onClick={handleNumberClick} gridPosition={[3, 1]} />
      <CalculatorButton symbol={5} onClick={handleNumberClick} gridPosition={[3, 2]} />
      <CalculatorButton symbol={6} onClick={handleNumberClick} gridPosition={[3, 3]} />
      <CalculatorButton symbol={7} onClick={handleNumberClick} gridPosition={[2, 1]} />
      <CalculatorButton symbol={8} onClick={handleNumberClick} gridPosition={[2, 2]} />
      <CalculatorButton symbol={9} onClick={handleNumberClick} gridPosition={[2, 3]} />
      <CalculatorButton symbol={0} onClick={handleNumberClick} gridPosition={[5, 1]} />
      <CalculatorButton symbol={'.'} onClick={handleNumberClick} gridPosition={[5, 2]} />
      <CalculatorButton symbol={'C'} onClick={resetScreen} gridPosition={[6, 3]} />
      <CalculatorButton symbol={'+'} onClick={handleOperator} gridPosition={[5, 4]} />
      <CalculatorButton symbol={'-'} onClick={handleOperator} gridPosition={[4, 4]} />
      <CalculatorButton symbol={'x'} onClick={handleOperator} gridPosition={[3, 4]} />
      <CalculatorButton symbol={'/'} onClick={handleOperator} gridPosition={[2, 4]} />
      <CalculatorButton symbol={'='} onClick={handleEquals} gridPosition={[5, 3]} />
    </div>
  )
}

export default CalculatorContainer;