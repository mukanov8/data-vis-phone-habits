import React from 'react'

import Plot from 'react-plotly.js'

function App() {
  return (
    <div className="App">
      <Plot
        data={[
          {
            x: [1, 2, 3, 4, 5, 6, 7],
            y: [2, 6, 3, 4, 5, 8, 5],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
            title: 'sobaka',
          },
        ]}
        layout={{ width: 320, height: 240, title: 'Hello World' }}
      />
    </div>
  )
}

export default App
