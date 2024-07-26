import React from 'react'

function CalculatorNumbericButton({ number, onClick, gridPosition }) {
  const gridPositions = {
    gridRow: `${gridPosition[0]}`,
    gridColumn: `${gridPosition[1]}`
  }

  return (
    <div className="calculatorNumbericButton" style={gridPositions}>
      <button value={number} onClick={onClick}>{number}</button>
    </div>
  )
}

export default CalculatorNumbericButton;