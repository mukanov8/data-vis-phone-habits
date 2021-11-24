import React, { useState } from 'react'

import Plot from 'react-plotly.js'
import theme from '../theme'
import { Text } from './shared/Typography'
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { X_AXIS_HOURLY } from './../constants'

const TIME_SLICES = 8

const UserTypeChart = () => {
  const getRandInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
  }

  const userTypes = ['Extreme', 'Moderate', 'Rare']
  const [selectedUserType, setSelectedUserType] = useState('Extreme')

  const traceHealth = {
    x: X_AXIS_HOURLY,
    y: [...Array(TIME_SLICES).keys()].map(i => getRandInt(5, 15)),
    name: 'Health',
    type: 'bar',
    marker: {
      color: theme.colors.red[900],
    },
  }
  const traceOthers = {
    x: X_AXIS_HOURLY,
    y: [...Array(TIME_SLICES).keys()].map(i => getRandInt(10, 25)),
    name: 'Others',
    type: 'bar',
    marker: {
      color: theme.colors.red[700],
    },
  }
  const traceOs = {
    x: X_AXIS_HOURLY,
    y: [...Array(TIME_SLICES).keys()].map(i => getRandInt(30, 50)),
    name: 'OS',
    type: 'bar',
    marker: {
      color: theme.colors.red[400],
    },
  }
  const traceSns = {
    x: X_AXIS_HOURLY,
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
