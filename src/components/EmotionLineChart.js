import React from 'react'
import Plot from 'react-plotly.js'
import theme from '../theme'

import { X_AXIS_HOURLY, X_AXIS_WEEKDAY } from '../constants'

const EmotionLineChart = ({ ydata, groupBy }) => {
  return (
    <Plot
      layout={{
        title: 'Average Emotion Change',
        width: 800,
        height: 350,
      }}
      data={[
        {
          x: groupBy === 'Hourly' ? X_AXIS_HOURLY : X_AXIS_WEEKDAY,
          y: ydata,
          type: 'scatter',
        },
      ]}
    />
  )
}

export default EmotionLineChart
