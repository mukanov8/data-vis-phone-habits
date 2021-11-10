import React from 'react'

import Plot from 'react-plotly.js'
import theme from '../theme'
import { Text } from './shared/Typography'
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'

const AppsPieChart = ({ appType, setAppType }) => {
  const labels = ['SNS', 'OS', 'Health', 'Others']

  const onClick = data => {
    // console.log('interaction', data)
    var pn = ''
    console.log(data.points)
    for (var i = 0; i < data.points.length; i++) {
      pn = data.points[i].pointNumber
    }
    console.log('clicked on', labels[pn])
    setAppType(labels[pn])
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
                {labels.map((label, i) => (
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

      <Plot
        layout={{
          width: 350,
          height: 350,
          title: {
            text: 'App Usage Statistic of Moderate User',
          },
        }}
        onClick={onClick}
        data={[
          {
            values: [40, 23, 17, 20],
            labels: labels,
            marker: {
              colors: Object.values(theme.colors.purple),
            },
            hoverinfo: 'label+percent',
            type: 'pie',
          },
        ]}
      />
    </div>
  )
}

export default AppsPieChart
