import React from 'react'

import Plot from 'react-plotly.js'
import theme from '../theme'
import { Text } from './shared/Typography'
import { Tooltip } from '@chakra-ui/react'

const AppsBarChart = ({ appType, addAppToSelection }) => {
  const getRandInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
  }

  const yData = {
    SNS: [
      'Slack',
      'NaverCafe',
      'BAND',
      'Everytime',
      'NAVER',
      'Messenger',
      'Instagram',
      'Facebook',
      'YouTube',
      'Kakao Talk',
    ],
    Shopping: [
      '에이블리',
      'GMarket',
      'CJ ONE',
      '모바일교보문고',
      '11번가',
      '이마트몰',
      'Starbucks',
      '배달요기 요',
      '위메프',
      'Coupang',
    ],

    Others: [
      'Logger',
      'Camera',
      'Google Play Store',
      'Googe Play Service',
      'Message',
      'Settings',
      'Paco',
      'Polar Beat',
      'Package installer',
    ],
  }

  const xData = {
    // values from dataframe just hardcoded here
    SNS: [78, 48, 46, 29, 26, 26, 14, 10, 9, 7].reverse(),
    Shopping: [18, 7, 7, 6, 6, 4, 4, 4, 3, 3].reverse(),
    Others: [78, 78, 78, 78, 78, 77, 76, 76, 76, 75].reverse(),
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

  const selectedColors = () => {
    if (appType === 'SNS') return Object.values(theme.colors.orange)
    else if (appType === 'Shopping') return Object.values(theme.colors.pink)
    return Object.values(theme.colors.blue)
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
              width: 400,
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
                x: xData[appType],
                type: 'bar',
                marker: {
                  color: selectedColors(),
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
