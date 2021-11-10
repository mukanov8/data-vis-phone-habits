import React from 'react'
import styled, { css } from 'styled-components'
import { Text } from './shared/Typography'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  align-items: center;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 5px;
  margin-top: 100px;
`

const SingleApp = styled.div`
  ${({ theme }) => css`
    height: 40px;
    width: max-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 3px 10px;
    border-radius: 5px;
    border: 1px solid;
    background-color: ${theme?.colors.orange[400]};
    cursor: pointer;
    :hover {
      background-color: ${theme?.colors.red[700]};
      color: ${theme?.colors.red[100]};
    }
  `}
`

const AppsSelection = ({ selectedApps, removeAppFromSelection }) => {
  return (
    <MainContainer>
      <Text>
        {' '}
        <b> Selected Apps </b>{' '}
      </Text>

      <GridContainer>
        {selectedApps.map(app => {
          return (
            <SingleApp onClick={() => removeAppFromSelection(app)}>
              {app}
            </SingleApp>
          )
        })}
      </GridContainer>
    </MainContainer>
  )
}

export default AppsSelection
