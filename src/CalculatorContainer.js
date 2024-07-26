import React, { useState, useRef } from 'react'
import CalculatorNumbericButton from './CalculatorNumbericButton'
import CalculatorScreen from './CalculatorScreen';

function CalculatorContainer() {
  const [screenState, setScreenState] = useState("0");
  const [result, setResult] = useState("0");
  const [operatorSelected, setOperatorSelected] = useState(false);
  const memory = useRef(0);

  function handleNumberClick({ target }) {
    setScreenState((prevState) => {
      if (prevState === '0') {
        // replace 0 with first typed number
        prevState = '';
      }
      if (operatorSelected) {
        setOperatorSelected(false);
        prevState = '';
      }
      prevState += target.value;
      return prevState;
    });
  }

  function handleAddition() {
    // stores current screen state in internal memory and affixes + to end
    memory.current = Number(screenState);
    setScreenState((prevState) => {
      return prevState += '+';
    });
    setOperatorSelected(true);
  }

  function handleEquals() {
    setScreenState((prevState) => {
      prevState = (Number(prevState) + memory.current).toString();
      return prevState;
    });
  }


  function resetScreen() {
    setScreenState("0");
    setOperatorSelected(false);
    memory.current = 0;
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
      <button onClick={handleAddition}>+</button>
      {/* <button onClick={handleSubtract}>-</button>
      <button onClick={handleMult}>x</button>
      <button onClick={handleDivide}>/</button> */}
      <button onClick={handleEquals}>=</button>
    </div>
  )
}

export default CalculatorContainer;