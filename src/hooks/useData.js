import React from 'react'

import { DataFrame } from 'pandas-js'

import { nameToDatasetId } from '../constants'

const useData = () => {
  const [appsByHour, setAppsByHour] = React.useState(null)
  const [appsByWeek, setAppsByWeek] = React.useState(null)
  const [emotionsByHour, setEmotionsByHour] = React.useState(null)
  const [emotionsByWeek, setEmotionsByWeek] = React.useState(null)
  const [foregroundTimeByUserType, setForegroundTimeByUserType] =
    React.useState(null)
  const [userTypeGrouped, setUserTypeGrouped] = React.useState(null)

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

    fetch('/processed_csvs/esm_data_processed_weekday.csv').then(
      async response => {
        handleResponse(setEmotionsByWeek)(response)
      }
    )

    fetch('/processed_csvs/foregroundTime_by_userType.csv').then(
      async response => {
        handleResponse(setForegroundTimeByUserType)(response)
      }
    )

    fetch('/processed_csvs/app_usage_resampled_by_3hours_grouped.csv').then(
      async response => {
        handleResponse(setUserTypeGrouped)(response)
      }
    )
  }, [])

  const getEmotionsByHour = () => {
    if (!emotionsByHour) {
      return []
    }
    return getArrayFromColumn(emotionsByHour, 'Emotion_change', true, false)
  }

  const getEmotionsByWeek = () => {
    if (!emotionsByWeek) {
      return []
    }
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

  const getAppsByWeek = selectedApps => {
    // return getArrayFromColumn(appsByWeek, 'user_count', true)
    if (!appsByWeek) {
      return []
    }
    const apps = appsByWeek.to_json({ orient: 'records' })

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

  const getForegroundTimeByUserType = (userType = 'extreme') => {
    if (!foregroundTimeByUserType) {
      return []
    }
    const appsByUserType = foregroundTimeByUserType.to_json({
      orient: 'records',
    })
    console.log('json', appsByUserType, userType)
    const curData = appsByUserType.find(app => app.userType === userType)
    if (!curData) {
      return {}
    }
    delete curData.userType
    return curData
  }

  const getUserTypeGrouped = (userType = 'extreme') => {
    if (!userTypeGrouped) {
      return {
        snsValues: [],
        shoppingValues: [],
        othersValues: [],
      }
    }

    const filteredData = userTypeGrouped.filter(
      userTypeGrouped.get('userType').eq(userType)
    )

    const snsValues = getArrayFromColumn(filteredData, 'sns', true, false)
    const shoppingValues = getArrayFromColumn(
      filteredData,
      'shopping',
      true,
      false
    )
    const othersValues = getArrayFromColumn(filteredData, 'others', true, false)

    return {
      snsValues,
      shoppingValues,
      othersValues,
    }
  }

  return {
    getEmotionsByHour,
    getEmotionsByWeek,
    getAppsByHour,
    getAppsByWeek,
    getForegroundTimeByUserType,
    getUserTypeGrouped,
  }
}

export default useData
