import React from 'react'

import Plot from 'react-plotly.js'
import theme from '../theme'
import { Text } from './shared/Typography'
import { Tooltip } from '@chakra-ui/react'

const AppsBarChart = ({ appType, addAppToSelection }) => {
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
      'Instagram',
      'YouTube',
      'Kakao Talk',
    ],
    OS: ['Camera', 'Gallery', 'Notes', 'Compass'],
    Health: ['Samsung Health', 'Runkeeper', 'Strava', 'Stridekick'],
    Others: ['KaspiKz', 'Woori Bank', 'Toggl', 'Notion'],
  }

  const onClick = data => {
    var pn = ''

    console.log(data.points)
    for (var i = 0; i < data.points.length; i++) {
      pn = data.points[i].pointNumber
    }
    console.log('clicked on', yData[appType][pn])

    addAppToSelection({
      name: yData[appType][pn],
      value: data.points[0].value,
      color: data.points[0]['marker.color'],
    })
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Text>
        <b>App</b> Selection
      </Text>
      <Tooltip label="Click to select the app type">
        <div>
          <Plot
            layout={{
              width: 350,
              height: 350,
              title: {
                text: `${appType} Apps Sorted`,
              },
            }}
            onClick={onClick}
            data={[
              {
                orientation: 'h',
                y: yData[appType],
                x: xData,
                type: 'bar',
                marker: {
                  color: Object.values(theme.colors.orange),
                },
              },
            ]}
          />
        </div>
      </Tooltip>
    </div>
  )
}

export default AppsBarChart
