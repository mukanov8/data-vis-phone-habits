import React from 'react'

import styled from 'styled-components'
import AppsBarChart from './components/AppsBarChart'

const MainContainer = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {
  return (
    <MainContainer>
      <div className="ml-9">sobaka</div>
      <AppsBarChart />
    </MainContainer>
  )
}

export default App
