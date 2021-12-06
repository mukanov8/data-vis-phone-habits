import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react'

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'

import AppsPieChart from './components/AppsPieChart'
import AppsBarChart from './components/AppsBarChart'
import UserTypeChart from './components/UserTypeChart'

import { Heading } from './components/shared/Typography'
import AppUsageStackedBarChart from './components/AppUsageStackedBarChart'
import EmotionChart from './components/EmotionChart'

import AppsSelection from './components/AppsSelection'
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

const GROUPING_OPTIONS = ['Daily', 'Hourly']

function App() {
  const [appType, setAppType] = useState('SNS')
  const [selectedUserType, setSelectedUserType] = useState('extreme')
  const [selectedApps, setSelectedApps] = useState([
    // {
    //   id: 0,
    //   name: '',
    //   value: 0,
    //   color: '',
    // },
  ])
  const [groupBy, setGroupBy] = useState('hourly')

  const { getAppsByHour, getEmotionsByHour, getAppsByWeek, getEmotionsByWeek } =
    useData()

  const appUsageByHour = React.useMemo(
    () => getAppsByHour(selectedApps),
    [selectedApps, getAppsByHour]
  )

  const appUsageByWeek = React.useMemo(
    () => getAppsByWeek(selectedApps),
    [selectedApps, getAppsByWeek]
  )

  const emotionsByHour = React.useMemo(
    () => getEmotionsByHour(),
    [getEmotionsByHour]
  )

  const emotionsByWeek = React.useMemo(
    () => getEmotionsByWeek(),
    [getEmotionsByWeek]
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
        <UserTypeChart
          setSelectedUserType={setSelectedUserType}
          selectedUserType={selectedUserType}
        />
        <AppsPieChart
          appType={appType}
          setAppType={setAppType}
          userType={selectedUserType}
        />
      </RowContainer>
      <RowContainer>
        <AppsBarChart appType={appType} addAppToSelection={addAppToSelection} />
        <AppsSelection
          selectedApps={selectedApps}
          removeAppFromSelection={removeAppFromSelection}
        />
      </RowContainer>
      <RowContainer>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                my="8px"
                colorScheme="purple"
                size="sm"
                isActive={isOpen}
                as={Button}
                rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              >
                {groupBy ?? 'Group by'}
              </MenuButton>
              <MenuList>
                {GROUPING_OPTIONS.map((label, i) => (
                  <MenuItem
                    key={label + i.toString()}
                    onClick={() => setGroupBy(label)}
                  >
                    {label}
                  </MenuItem>
                ))}
              </MenuList>
            </>
          )}
        </Menu>
      </RowContainer>

      <RowContainer>
        <AppUsageStackedBarChart
          selectedApps={selectedApps}
          dataToUse={groupBy === 'Hourly' ? appUsageByHour : appUsageByWeek}
          groupBy={groupBy}
        />
      </RowContainer>
      <RowContainer>
        {/* <EmotionChart /> */}
        <EmotionLineChart
          ydata={groupBy === 'Hourly' ? emotionsByHour : emotionsByWeek}
          groupBy={groupBy}
        />
      </RowContainer>
    </MainContainer>
  )
}

export default App
