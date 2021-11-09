import React from 'react'

import styled from 'styled-components'
import AppsPieChart from './components/AppsPieChart'
import AppsBarChart from './components/AppsBarChart'
import UserTypeChart from './components/UserTypeChart'

import { Heading } from './components/shared/Typography'
import EmotionChart from './components/EmotionChart'

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
  return (
    <MainContainer>
      <Heading>Users' phone usage habits for SNS marketers </Heading>
      <RowContainer>
        <UserTypeChart />
        <AppsPieChart />
      </RowContainer>
      <RowContainer>
        <AppsBarChart />
      </RowContainer>
      <RowContainer>
        <EmotionChart />
      </RowContainer>
    </MainContainer>
  )
}

export default App
