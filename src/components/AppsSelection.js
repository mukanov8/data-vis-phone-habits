import React from 'react'
import styled from 'styled-components'
import { Text } from './shared/Typography'
import { Tooltip, Box } from '@chakra-ui/react'

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

const AppsSelection = ({ selectedApps, removeAppFromSelection }) => {
  return (
    <MainContainer>
      <Text>
        {' '}
        <b> Selected </b>Apps{' '}
      </Text>

      <GridContainer>
        {selectedApps.map((app, i) => {
          if (app.name.length < 1) return <></>
          return (
            <Tooltip label="Remove selection?">
              <Box
                bg={app.color}
                _hover={{ bg: 'blackAlpha.800', color: 'whiteAlpha.900' }}
                cursor="pointer"
                width="max-content"
                display="flex"
                flexDirection="row"
                alignItems="center"
                p="6px 10px"
                borderRadius="5px"
                fontWeight="500"
                fontSize="12px"
                key={app.name + i.toString()}
                onClick={() => removeAppFromSelection(app)}
              >
                {app.name}
              </Box>
            </Tooltip>
          )
        })}
      </GridContainer>
    </MainContainer>
  )
}

export default AppsSelection
