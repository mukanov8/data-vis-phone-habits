import React from 'react'

import Plot from 'react-plotly.js'
import defaultTheme from '../themes/defaultTheme'
import { Text } from './shared/Typography'

const AppsPieChart = () => {
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
        data={[
          {
            values: [40, 23, 17, 20],
            labels: ['SNS', 'OS', 'Health', 'Others'],
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
