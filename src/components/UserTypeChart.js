import React, { useState } from 'react'

import Plot from 'react-plotly.js'
import theme from '../theme'
import { Text } from './shared/Typography'
// import Dropdown from './shared/Dropdown'
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'

const TIME_SLICES = 8

const UserTypeChart = () => {
  const getRandInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
  }

  const userTypes = ['Extreme', 'Moderate', 'Rare']
  const [selectedUserType, setSelectedUserType] = useState('Extreme')

  const xData = [
    '0-3AM',
    '3-6AM',
    '6-9AM',
    '9-12PM',
    '12-15PM',
    '15-18PM',
    '18-21PM',
    '21-24PM',
  ]

  //Array(TIME_SLICES).fill(getRandInt(5, 15)),

  const traceHealth = {
    x: xData,
    y: [...Array(TIME_SLICES).keys()].map(i => getRandInt(5, 15)),
    name: 'Health',
    type: 'bar',
    marker: {
      color: theme.colors.red[900],
    },
  }
  const traceOthers = {
    x: xData,
    y: [...Array(TIME_SLICES).keys()].map(i => getRandInt(10, 25)),
    name: 'Others',
    type: 'bar',
    marker: {
      color: theme.colors.red[700],
    },
  }
  const traceOs = {
    x: xData,
    y: [...Array(TIME_SLICES).keys()].map(i => getRandInt(30, 50)),
    name: 'OS',
    type: 'bar',
    marker: {
      color: theme.colors.red[400],
    },
  }
  const traceSns = {
    x: xData,
    y: [...Array(TIME_SLICES).keys()].map(i => getRandInt(40, 60)),
    name: 'SNS',
    type: 'bar',
    marker: {
      color: theme.colors.red[100],
    },
  }

  const data = [traceHealth, traceOthers, traceOs, traceSns]

  const layout = {
    barmode: 'stack',
    width: 350,
    height: 350,
    title: {
      text: `Daily ${selectedUserType} User Phone usage`,
    },
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <Text>
          User <b>Type</b> Selection
        </Text>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                my="8px"
                colorScheme="red"
                size="sm"
                isActive={isOpen}
                as={Button}
                rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              >
                {selectedUserType}
              </MenuButton>
              <MenuList>
                {userTypes.map((userType, i) => (
                  <MenuItem
                    key={userType + i.toString()}
                    onClick={() => setSelectedUserType(userType)}
                  >
                    {userType}
                  </MenuItem>
                ))}
              </MenuList>
            </>
          )}
        </Menu>
      </div>
      <Plot layout={layout} data={data} />
    </div>
  )
}

export default UserTypeChart
