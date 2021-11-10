import React from 'react'

import Plot from 'react-plotly.js'
import defaultTheme from '../themes/defaultTheme'

const EmotionChart = () => {
  const numOfData = 20;

  let randomEmotionalData = [];
  for(let i=0; i<numOfData; i++){
    randomEmotionalData.push(Math.random() * 6 - 3);
  }

  let randomAppUsageHistogramData = [];
  for(let i=0; i<100; i++){
    randomAppUsageHistogramData.push(Math.random() * 100)
  }

  const startDate = new Date('2020-12-17T03:24:00');
  const endDate = new Date('2020-12-27T03:24:00');
  let gap = endDate.getTime() - startDate.getTime();
  let dates = [];
  for(let i=0; i<numOfData; i++){
    let tempDate = new Date()
    tempDate.setTime(startDate.getTime() + gap * (i + 1) / numOfData);
    dates.push(tempDate);
  }

  let plot1 = {
    x: dates,
    y: randomAppUsageHistogramData,
    type: 'bar',
    mode: 'lines'
  };

  let plot2 = {
    x: dates,
    y: randomEmotionalData,
    yaxis: 'y2',
    type: 'scatter',
    mode: 'lines'
  };

  let emoData = [
    plot1,
    plot2
  ];

  let emoLayout = {
    width: 30 * numOfData,
    height: 800,
    showlegend: false,
    // title: {
    //   text: 'App Usage Histogram',
    //   font: {
    //     family: 'Courier New, monospace',
    //     size: 24,
    //   },
    // },
    xaxis: {
      tickangle: 90,
      tickformat: "%Y-%m-%d",
      tickfont: {
        family: 'Courier New, monospace',
        size: 10,
      },
      tickmode: 'linear'
      // rangeslider: {}
    },
    yaxis1: {
      domain: [0.7, 1],
      range: [0, 100],
      fixedrange: true
    },
    yaxis2: {
      domain: [0, 0.50],
      range: [-3, 3],
      fixedrange: true
    },
    grid: {
      rows: 2,
      columns: 1,
      pattern: 'independent'
    },
    annotations: [
      {
        text: "App Usage Histogram",
        xref: "x domain",
        yref: "y",
        x: 0,
        y: 0,
        yshift: 230,
        showarrow: false,
        font: {
          family: 'Courier New, monospace',
          size: 16,
        }
      },
      {
        text: "Emotional Average Score by Time",
        xref: "x domain",
        yref: "y",
        x: 0,
        y: 0,
        yshift: -70,
        showarrow: false,
        font: {
          family: 'Courier New, monospace',
          size: 16,
        }
      }]
  };

  return (
    <Plot
      layout={emoLayout}
      data={emoData}
    />
  )
}

export default EmotionChart
