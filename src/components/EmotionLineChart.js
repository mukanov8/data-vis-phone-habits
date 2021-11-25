import React from 'react'
import Plot from 'react-plotly.js'
import theme from '../theme'

import { X_AXIS_HOURLY } from '../constants'

const EmotionLineChart = ({ ydata }) => {
  return (
    <Plot
      layout={{
        title: 'Average Emotion Change',
        width: 800,
        height: 350,
      }}
      data={[
        {
          x: X_AXIS_HOURLY,
          y: ydata,
          type: 'scatter',
        },
      ]}
    />
  )
}

export default EmotionLineChart
