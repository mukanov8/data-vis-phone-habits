import React from 'react'

import Plot from 'react-plotly.js'

const colors = [
  '#855CF8',
  '#004ac2',
  '#ff0080',
  '#E289F2',
  '#503795',
  '#ACB9FF',
  'rgb(172, 231, 255)',
  '#ae99e5',
  '#00b7ff',
]

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
    <Plot
      layout={{
        width: 350,
        height: 400,
        title: {
          text: 'SNS Apps Sorted',
          font: {
            family: 'Courier New, monospace',
            size: 24,
          },
        },
      }}
      data={[
        {
          orientation: 'h',
          y: yData,
          x: xData,
          type: 'bar',
          marker: {
            color: colors,
          },
        },
      ]}
    />
  )
}

export default AppsBarChart
