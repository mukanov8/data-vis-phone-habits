import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import AppsPieChart from './components/AppsPieChart'
import AppsBarChart from './components/AppsBarChart'
import UserTypeChart from './components/UserTypeChart'

import { Heading } from './components/shared/Typography'
import EmotionChart from './components/EmotionChart'

import AppsSelection from './components/AppsSelection'
import { useColorMode } from '@chakra-ui/react'

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
  const [appType, setAppType] = useState('SNS')
  const [selectedApps, setSelectedApps] = useState([])

  const addAppToSelection = appName => {
    if (!selectedApps.includes(appName)) {
      // if it's not already added
      setSelectedApps([...selectedApps, appName])
    }
  }

  const removeAppFromSelection = appName => {
    setSelectedApps(selectedApps.filter(app => app !== appName))
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
        <EmotionChart />
      </RowContainer>
      <RowContainer>
        <EmotionChart />
      </RowContainer>
    </MainContainer>
  )
}

export default App
