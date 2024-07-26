import React from 'react'

function CalculatorScreen({ screenState, gridPosition }) {
  const gridPositions = {
    gridRow: `${gridPosition[0]}`,
    gridColumn: `${gridPosition[1]} / 4`
  }

  return (
    <div className="calculatorScreen" style={gridPositions}>{screenState}</div>
  )
}

export default CalculatorScreen;