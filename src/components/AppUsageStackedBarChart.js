import React from 'react'
import Plot from 'react-plotly.js'
import { X_AXIS_HOURLY } from './../constants'
import { Text } from './shared/Typography'

const AppUsageEmotionChart = ({ selectedApps, filteredData }) => {
  const data = []
  const len = X_AXIS_HOURLY.length

  console.log(filteredData)
  selectedApps.forEach(app => {
    data.push({
      x: X_AXIS_HOURLY,
      y: filteredData[app.name],
      type: 'bar',
      name: app.name,
      marker: {
        color: app.color,
      },
    })
  })
  // filteredData.forEach((app, i) => {
  //   if (i > 0) {
  //     data.push({
  //       x: X_AXIS_HOURLY,
  //       y: filteredData?.map(app => parseInt(app.user_count)),
  //       type: 'bar',
  //       name: app.name,
  //       marker: {
  //         color: app.color,
  //       },
  //     })
  //   }
  // })

  const layout = {
    barmode: 'group',
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
