import React from 'react'

import Plot from 'react-plotly.js'
import defaultTheme from '../themes/defaultTheme'
import { Text } from './shared/Typography'

const AppsPieChart = ({ setAppType }) => {
  const labels = ['SNS', 'OS', 'Health', 'Others']

  const onClick = data => {
    // console.log('interaction', data)
    var pn = ''
    console.log(data.points)
    for (var i = 0; i < data.points.length; i++) {
      pn = data.points[i].pointNumber
    }
    console.log('clicked on', labels[pn])
    setAppType(labels[pn])
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Text>
        App <b>Type</b> Selection
      </Text>
      <Plot
        layout={{
          width: 350,
          height: 350,
          title: {
            text: 'App Usage Statistic of Moderate User',
          },
        }}
        onClick={onClick}
        data={[
          {
            values: [40, 23, 17, 20],
            labels: labels,
            marker: {
              colors: Object.values(defaultTheme.colors.purple),
            },
            hoverinfo: 'label+percent',
            type: 'pie',
          },
        ]}
      />
    </div>
  )
}

export default AppsPieChart
