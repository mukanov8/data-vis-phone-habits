import React from 'react'
import Plot from 'react-plotly.js'
import { X_AXIS_HOURLY } from './../constants'
import { Text } from './shared/Typography'

const AppUsageEmotionChart = ({ selectedApps }) => {
  const data = []
  const len = X_AXIS_HOURLY.length
  console.log({ selectedApps })
  selectedApps.forEach((app, i) => {
    if (i > 0) {
      data.push({
        x: X_AXIS_HOURLY,
        y: Array(len)
          .fill()
          .map((_, i) => i + app.value),
        type: 'bar',
        name: app.name,
        marker: {
          color: app.color,
        },
      })
    }
  })

  const layout = {
    barmode: 'stack',
    width: 400,
    height: 350,
    title: {
      text: `Hourly ${
        selectedApps.length > 2 ? 'Apps' : 'App'
      } Usage Histogram `,
    },
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Text>
        Selected App <b>Usage</b>
      </Text>
      {selectedApps.length > 1 && <Plot layout={layout} data={data} />}
    </div>
  )
}

export default AppUsageEmotionChart
