import React from 'react'

import Plot from 'react-plotly.js'
import defaultTheme from '../themes/defaultTheme'

const EmotionChart = () => {
  const numOfData = 10;

  let randomEmotionalData = [];
  for(let i=0; i<numOfData; i++){
    randomEmotionalData.push(Math.random() * 6 - 3);
  }

  const startDate = new Date('1995-12-17T03:24:00');
  const endDate = new Date('1995-12-31T03:24:00');
  let gap = endDate.getTime() - startDate.getTime();
  let dates = [];
  for(let i=0; i<numOfData; i++){
    let tempDate = new Date()
    tempDate.setTime(startDate.getTime() + gap * (i + 1) / numOfData);
    dates.push(tempDate);
  }

  return (
    <Plot
      layout={{
        width: 60 * numOfData,
        height: 400,
        title: {
          text: 'Emotional Average Score by Time',
          font: {
            family: 'Courier New, monospace',
            size: 24,
          },
        },
        yaxis: {
          range: [-3, 3]
        }
      }}
      data={[
        {
          // orientation: 'h',
          x: dates,
          y: randomEmotionalData,
          type: 'scatter',
          mode: 'lines'
        },
      ]}
    />
  )
}

export default EmotionChart
