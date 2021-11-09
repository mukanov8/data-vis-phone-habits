import React from 'react'

import Plot from 'react-plotly.js'
import defaultTheme from '../themes/defaultTheme'
import { Text } from './shared/Typography'

const AppsBarChart = () => {
  const xData = [60, 55, 49, 36, 30, 25, 20, 17, 14]
  xData.sort()
  const yData = [
    'Kakao Talk',
    'Instagram',
    'YouTube',
    'Naver',
    'Facebook',
    'Vkontakte',
    'Reddit',
    'Bluedit',
    'Greendit',
  ]
  yData.reverse()
  return (
    <div style={{ textAlign: 'center' }}>
      <Text>
        <b>App</b> Selection
      </Text>
      <Plot
        layout={{
          width: 350,
          height: 350,
          title: {
            text: 'SNS Apps Sorted',
          },
        }}
        data={[
          {
            orientation: 'h',
            y: yData,
            x: xData,
            type: 'bar',
            marker: {
              color: Object.values(defaultTheme.colors.orange),
            },
          },
        ]}
      />
    </div>
  )
}

export default AppsBarChart
