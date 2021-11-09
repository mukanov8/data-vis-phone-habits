import React from 'react'

import Plot from 'react-plotly.js'
import defaultTheme from '../themes/defaultTheme'
import { Text } from './shared/Typography'

const AppsBarChart = ({ appType }) => {
  const getRandInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
  }

  const xData = [...Array(9)].map((_, rowIndex) => getRandInt(0, 100))

  xData.sort()
  const yData = {
    SNS: [
      'Greendit',
      'Bluedit',
      'Reddit',
      'Vkontakte',
      'Facebook',
      'Naver',
      'Kakao Talk',
      'Instagram',
      'YouTube',
    ],
    OS: ['Camera', 'Gallery', 'Notes', 'Compass'],
    Health: ['Samsung Health', 'Runkeeper', 'Strava', 'Stridekick'],
    Others: ['KaspiKz', 'Woori Bank', 'Toggl', 'Notion'],
  }

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
            y: yData[appType],
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
