import React from 'react'
import styled from 'styled-components'
import { Text } from './shared/Typography'
import { Tooltip, Box } from '@chakra-ui/react'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  align-items: center;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 5px;
  margin-top: 100px;
`

function pickTextColorBasedOnBgColorSimple(bgColor, lightColor, darkColor) {
  var color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor
  var r = parseInt(color.substring(0, 2), 16) // hexToR
  var g = parseInt(color.substring(2, 4), 16) // hexToG
  var b = parseInt(color.substring(4, 6), 16) // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor
}

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
                color={pickTextColorBasedOnBgColorSimple(
                  app.color,
                  'white',
                  'black'
                )}
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
