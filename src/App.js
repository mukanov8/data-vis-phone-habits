import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DataFrame } from 'pandas-js'

import AppsPieChart from './components/AppsPieChart'
import AppsBarChart from './components/AppsBarChart'
import UserTypeChart from './components/UserTypeChart'

import { Heading } from './components/shared/Typography'
import AppUsageStackedBarChart from './components/AppUsageStackedBarChart'
import EmotionChart from './components/EmotionChart'

import AppsSelection from './components/AppsSelection'
import { useColorMode } from '@chakra-ui/react'
import useData from './hooks/useData'
import EmotionLineChart from './components/EmotionLineChart'

const MainContainer = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

function App() {
  const { getAppsByHour, getEmotionsByHour } = useData()
  const [appType, setAppType] = useState('SNS')
  const [selectedApps, setSelectedApps] = useState([
    // {
    //   id: 0,
    //   name: '',
    //   value: 0,
    //   color: '',
    // },
  ])

  const appUsageByHour = React.useMemo(
    () => getAppsByHour(selectedApps),
    [selectedApps, getAppsByHour]
  )

  const emotionsByHour = React.useMemo(
    () => getEmotionsByHour(),
    [getEmotionsByHour]
  )

  console.log({ emotionsByHour })

  const addAppToSelection = app => {
    if (selectedApps.some(el => el.name === app.name)) return
    setSelectedApps([...selectedApps, app])
  }

  const removeAppFromSelection = targetApp => {
    setSelectedApps(
      Object.values(selectedApps).filter(app => app.name !== targetApp.name)
    )
  }

  //there was a bug with chakra where default color mode was set to dark and could not be changed. So, this is a workaround for now.
  const { colorMode, toggleColorMode } = useColorMode()
  useEffect(() => {
    if (colorMode === 'dark') {
      toggleColorMode()
    }
  }, [colorMode, toggleColorMode])

  return (
    <MainContainer>
      <Heading>Users' phone usage habits for SNS marketers </Heading>
      <RowContainer>
        <UserTypeChart />
        <AppsPieChart appType={appType} setAppType={setAppType} />
      </RowContainer>
      <RowContainer>
        <AppsBarChart appType={appType} addAppToSelection={addAppToSelection} />
        <AppsSelection
          selectedApps={selectedApps}
          removeAppFromSelection={removeAppFromSelection}
        />
      </RowContainer>
      <RowContainer>
        <AppUsageStackedBarChart
          selectedApps={selectedApps}
          appUsageByHour={appUsageByHour}
        />
      </RowContainer>
      <RowContainer>
        {/* <EmotionChart /> */}
        <EmotionLineChart ydata={emotionsByHour} />
      </RowContainer>
    </MainContainer>
  )
}

export default App
