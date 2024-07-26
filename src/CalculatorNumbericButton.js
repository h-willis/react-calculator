import React from 'react'

function CalculatorNumbericButton({ number, onClick }) {
  return (
    <div className="calculatorNumbericButton">
      <button value={number} onClick={onClick}>{number}</button>
    </div>
  )
}

export default CalculatorNumbericButton;