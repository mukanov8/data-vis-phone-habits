import React from 'react'
import Plot from 'react-plotly.js'
import { X_AXIS_HOURLY, X_AXIS_WEEKDAY } from './../constants'
import { Text } from './shared/Typography'

const AppUsageEmotionChart = ({ selectedApps, dataToUse, groupBy }) => {
  const data = []

  console.log(dataToUse)
  selectedApps.forEach(app => {
    data.push({
      x: groupBy === 'Hourly' ? X_AXIS_HOURLY : X_AXIS_WEEKDAY,
      y: dataToUse[app.name],
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
    width: 800,
    height: 350,
    title: {
      text: `Hourly ${
        selectedApps.length > 1 ? 'Apps' : 'App'
      } Usage Histogram `,
    },
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Text>
        Selected App <b>Usage</b>
      </Text>
      <Plot layout={layout} data={data} />
    </div>
  )
}

export default AppUsageEmotionChart
