import React from 'react'

import Plot from 'react-plotly.js'

const colors = ['#855CF8', '#E289F2', '#503795', '#ACB9FF', 'rgb(0, 56, 109)']

const AppsPieChart = () => {
  return (
    <Plot
      layout={{
        width: 350,
        height: 400,
        title: {
          text: 'App Usage Statistics',
          font: {
            family: 'Courier New, monospace',
            size: 24,
          },
        },
      }}
      data={[
        {
          values: [40, 23, 17, 20],
          labels: ['SNS', 'OS', 'Health', 'Others'],
          marker: {
            colors: colors,
          },
          hoverinfo: 'label+percent',

          type: 'pie',
        },
      ]}
    />
  )
}

export default AppsPieChart