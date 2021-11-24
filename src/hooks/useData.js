import React from 'react'

import { DataFrame } from 'pandas-js'

const useData = () => {
  const [appsByHour, setAppsByHour] = React.useState([])

  const processCSV = (str, delim = ',') => {
    const headers = str.slice(0, str.indexOf('\n')).split(delim)
    const rows = str.slice(str.indexOf('\n') + 1).split('\n')

    const newArray = rows.map(row => {
      const values = row.split(delim)
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i]
        return obj
      }, {})
      return eachObject
    })
    return newArray
  }

  const getArrayFromColumn = (df, column, isNum) => {
    const myObj = df.get([column]).to_json()
    console.log('myObj', myObj)
    return Object.values(myObj[column]).map(val => {
      if (isNum) {
        return parseInt(val)
      }
      return val
    })
  }

  React.useEffect(() => {
    fetch('/processed_csvs/app_usage_grouped_by_hour_no_index.csv').then(
      async response => {
        console.log(response)
        const reader = response.body.getReader()
        const result = await reader.read()
        const decoder = new TextDecoder('utf-8')
        const csv = decoder.decode(result.value)
        // console.log(csv)
        const parsed = processCSV(csv)
        const df = new DataFrame(parsed)
        console.log('parsed', parsed)
        setAppsByHour(df)
        console.log('head', getArrayFromColumn(df, 'hour', true))
      }
    )
  }, [])

  return {
    appsByHour,
  }
}

export default useData
