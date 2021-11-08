import React from 'react'

import styled from 'styled-components'
import AppsPieChart from './components/AppsPieChart'
import AppsBarChart from './components/AppsBarChart'

const MainContainer = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`

const TitleText = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 32px;
  /* identical to box height, or 67% */

  display: flex;
  align-items: center;
  letter-spacing: 0.1px;

  color: #855cf8;
  margin-bottom: 32px;
`

const RowContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`

function App() {
  return (
    <MainContainer>
      <TitleText> Users' phone usage habits for SNS marketers </TitleText>
      <RowContainer>
        <AppsPieChart />
        <AppsBarChart />
      </RowContainer>
    </MainContainer>
  )
}

export default App
