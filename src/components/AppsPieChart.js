import React from 'react'

import Plot from 'react-plotly.js'
import theme from '../theme'
import { Text } from './shared/Typography'
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import useData from '../hooks/useData'

const AppsPieChart = ({ appType, setAppType, userType }) => {
  const { getForegroundTimeByUserType } = useData()

  const foregroundByUserType = React.useMemo(
    () => getForegroundTimeByUserType(userType),
    [userType, getForegroundTimeByUserType]
  )

  console.log({ foregroundByUserType })

  const labels2 = Object.keys(foregroundByUserType)
  const values = Object.values(foregroundByUserType)

  const onClick = data => {
    // console.log('interaction', data)
    var pn = ''
    console.log(data.points)
    for (var i = 0; i < data.points.length; i++) {
      pn = data.points[i].pointNumber
    }
    console.log('clicked on', labels2[pn])
    setAppType(labels2[pn])
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <Text>
          App <b>Type</b> Selection
        </Text>

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
                {appType ?? 'App Type'}
              </MenuButton>
              <MenuList>
                {labels2.map((label, i) => (
                  <MenuItem
                    key={label + i.toString()}
                    onClick={() => setAppType(label)}
                  >
                    {label}
                  </MenuItem>
                ))}
              </MenuList>
            </>
          )}
        </Menu>
      </div>

      <Tooltip label="Click to select the app">
        <div>
          <Plot
            layout={{
              width: 400,
              height: 350,
              title: {
                text: 'App Usage Statistic of Moderate User',
              },
            }}
            onClick={onClick}
            data={[
              {
                values,
                labels: labels2,
                marker: {
                  colors: [
                    theme.colors.purple[100],
                    theme.colors.purple[300],
                    theme.colors.purple[500],
                  ],
                },
                hoverinfo: 'label+percent',
                type: 'pie',
              },
            ]}
          />
        </div>
      </Tooltip>
    </div>
  )
}

export default AppsPieChart
