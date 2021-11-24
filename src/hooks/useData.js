import React from 'react'

import { DataFrame } from 'pandas-js'

import { nameToDatasetId } from '../constants'

const useData = () => {
  const [appsByHour, setAppsByHour] = React.useState(null)
  const [appsByWeek, setAppsByWeek] = React.useState(null)
  const [emotionsByHour, setEmotionsByHour] = React.useState(null)
  const [emotionsByWeek, setEmotionsByWeek] = React.useState(null)

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

  const getArrayFromColumn = (df, column, isNum, isInt = true) => {
    const myObj = df.get([column]).to_json()
    return Object.values(myObj[column]).map(val => {
      if (isNum) {
        if (!isInt) {
          return parseFloat(val)
        }
        return parseInt(val)
      }
      return val
    })
  }

  React.useEffect(() => {
    const handleResponse = setFunction => async response => {
      console.log(response)
      const reader = response.body.getReader()
      const result = await reader.read()
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value)
      // console.log(csv)
      const parsed = processCSV(csv)
      const df = new DataFrame(parsed)
      setFunction(df)
    }

    fetch('/processed_csvs/app_usage_grouped_by_hour.csv').then(
      async response => {
        handleResponse(setAppsByHour)(response)
      }
    )

    fetch('/processed_csvs/app_usage_grouped_by_weekday_no_index.csv').then(
      async response => {
        handleResponse(setAppsByWeek)(response)
      }
    )

    fetch('/processed_csvs/esm_data_processed_hour.csv').then(
      async response => {
        handleResponse(setEmotionsByHour)(response)
      }
    )

    fetch('/processed_csvs/esm_data_processed_weekday.csv.csv').then(
      async response => {
        handleResponse(setEmotionsByWeek)(response)
      }
    )
  }, [])

  const getEmotionsByHour = () => {
    return getArrayFromColumn(emotionsByHour, 'Emotion_change', true, false)
  }

  const getEmotionsByWeek = () => {
    return getArrayFromColumn(emotionsByWeek, 'Emotion_change', true, false)
  }

  const getAppsByHour = selectedApps => {
    if (!appsByHour) {
      return []
    }
    const apps = appsByHour.to_json({ orient: 'records' })

    const selectedAppsId = selectedApps.map(selectedApp => {
      console.log(
        'selected app name',
        nameToDatasetId[selectedApp.name] || selectedApp.name
      )
      return nameToDatasetId[selectedApp.name] || ''
    })

    const appValues = {}

    apps.forEach(app => {
      const index = selectedAppsId.findIndex(appId => appId === app.name)

      if (index !== -1) {
        const appName = selectedApps[index].name
        if (appName in appValues) {
          appValues[appName] = [
            ...appValues[appName],
            parseInt(app.user_count, 10),
          ]
        } else {
          appValues[appName] = [app.user_count]
        }
      }
    })

    return appValues
  }

  const getappsByWeek = selectedApps => {
    return getArrayFromColumn(appsByWeek, 'user_count', true)
  }

  return {
    getEmotionsByHour,
    getEmotionsByWeek,
    getAppsByHour,
    getappsByWeek,
  }
}

export default useData
