import React, { useState } from 'react'

import Plot from 'react-plotly.js'
import theme from '../theme'
import { Text } from './shared/Typography'
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { X_AXIS_HOURLY } from './../constants'
import useData from '../hooks/useData'

const TIME_SLICES = 8

const userTypes = [
  { label: 'Extreme', value: 'extreme' },
  { label: 'Moderate', value: 'moderate' },
  { label: 'Rare', value: 'occational' },
]

const UserTypeChart = ({ selectedUserType, setSelectedUserType }) => {
  const [label, setLabel] = useState('Extreme')
  const { getUserTypeGrouped } = useData()

  const userTypeGrouped = React.useMemo(
    () => getUserTypeGrouped(selectedUserType),
    [getUserTypeGrouped, selectedUserType]
  )

  const getRandInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
  }

  const traceOthers = {
    x: X_AXIS_HOURLY,
    y: userTypeGrouped.othersValues,
    name: 'Others',
    type: 'bar',
    marker: {
      color: theme.colors.red[100],
    },
  }
  const traceShopping = {
    x: X_AXIS_HOURLY,
    y: userTypeGrouped.shoppingValues,
    name: 'Shopping',
    type: 'bar',
    marker: {
      color: theme.colors.red[400],
    },
  }
  const traceSns = {
    x: X_AXIS_HOURLY,
    y: userTypeGrouped.snsValues,
    name: 'SNS',
    type: 'bar',
    marker: {
      color: theme.colors.red[700],
    },
  }

  const data = [traceSns, traceOthers, traceShopping]

  const layout = {
    barmode: 'stack',
    width: 400,
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
                {label}
              </MenuButton>
              <MenuList>
                {userTypes.map((userType, i) => (
                  <MenuItem
                    key={userType.label + i.toString()}
                    onClick={() => {
                      setSelectedUserType(userType.value)
                      setLabel(userType.label)
                    }}
                  >
                    {userType.label}
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
