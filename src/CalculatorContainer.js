import React, { useState, useRef, useEffect } from 'react'
import CalculatorButton from './CalculatorButton'
import CalculatorScreen from './CalculatorScreen';

function CalculatorContainer() {
  // 
  const [screenState, setScreenState] = useState('0');
  const [operator, setOperator] = useState(null);
  const memory = useRef(null);
  // controls initial screen clear when operator selected
  const operatorScreenClear = useRef(false);

  // bind escape key to clear calculator screen
  useEffect(() => {
    function handleKeyPress({ key }) {
      console.log(`handle press ${key}`);
      if (key === 'Escape') {
        resetScreen();
      }
    }

    // bind escape key to clear calculator
    document.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);


  function handleNumberClick({ target }) {
    // TODO handle screensize
    setScreenState((prevState) => {
      let newState = prevState;

      if (hasOperator(newState) || newState === '0') {
        newState = '';
      }

      newState += target.value;

      return newState;
    });
  }

  function handleDecimal() {
    setScreenState((prevState) => {
      let newState = prevState;

      if (newState.includes('.')) {
        return;
      }

      if (hasOperator(newState)) {
        // clear after operator state
        newState = '0';
      }

      return newState + '.';
    });
  }

  function handleOperator({ target }) {
    // TODO handle sequential calculations with operators with no equals in between
    if (operator === target.value) {
      return;
    }

    // if we've got an operator and it's different to the one we already got
    if (screenHasOperator() && !screenState.includes(target.value)) {
      // replace operator at end with new operator
      let rmvOpStr = screenState.slice(0, -1);
      rmvOpStr += target.value;
      setScreenState(rmvOpStr);
      setOperator(target.value);
      return;
    }

    setOperator(target.value);

    if (memory.current !== null) {
      memory.current = calculate();
      setScreenState(memory.current += target.value);
      return;
    }


    memory.current = screenState;
    setScreenState((prevState) =>
      (prevState += target.value)
    );
  }

  function handleEquals() {
    if (operator === null) {
      return;
    }

    let newState = calculate().toString();
    setScreenState(newState);
  }

  const resetScreen = () => {
    setScreenState('0');
    setOperator(null);
    memory.current = null;
    operatorScreenClear.current = false;
  }

  function calculate() {
    if (memory.current === null) {
      return screenState;
    }

    let result;
    switch (operator) {
      case '+':
        result = memory.current + parseFloat(screenState);
        break;
      case '-':
        result = memory.current - parseFloat(screenState);
        break;
      case '/':
        result = memory.current / parseFloat(screenState);
        break;
      case 'x':
        result = memory.current * parseFloat(screenState);
        break;
      case null:
        alert('null operator');
        break;
      default:
        alert('unknown operator');
        break;
    }

    setOperator(null);
    return result;
  }

  const screenHasOperator = () => {
    if (screenState.includes('+')) return true;
    if (screenState.includes('-')) return true;
    if (screenState.includes('/')) return true;
    if (screenState.includes('x')) return true;
    return false;
  }

  function hasOperator(str) {
    if (str.includes('+')) return true;
    if (str.includes('-')) return true;
    if (str.includes('/')) return true;
    if (str.includes('x')) return true;
    return false;
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
      <CalculatorButton symbol={'.'} onClick={handleDecimal} gridPosition={[5, 2]} />
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