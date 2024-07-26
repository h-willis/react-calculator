import React from 'react'

function CalculatorButton({ symbol, onClick, gridPosition }) {
  const gridPositions = {
    gridRow: `${gridPosition[0]}`,
    gridColumn: `${gridPosition[1]}`
  }

  return (
    <div className="calculatorButton" style={gridPositions}>
      <button value={symbol} onClick={onClick}>{symbol}</button>
    </div>
  )
}

export default CalculatorButton;