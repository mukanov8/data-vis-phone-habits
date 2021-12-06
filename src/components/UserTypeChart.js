import React, { useState } from 'react'

import Plot from 'react-plotly.js'
import styled from 'styled-components'
import theme from '../theme'
import { Text } from './shared/Typography'
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { X_AXIS_HOURLY, X_AXIS_WEEKDAY } from './../constants'
import useData from '../hooks/useData'

const TIME_SLICES = 8

const userTypes = [
  { label: 'Extreme', value: 'extreme' },
  { label: 'Moderate', value: 'moderate' },
  { label: 'Rare', value: 'occational' },
]

const GROUPING_OPTIONS = ['Daily', 'Hourly']

const UserTypeChart = ({ selectedUserType, setSelectedUserType }) => {
  const [label, setLabel] = useState('Extreme')
  const [groupingType, setGroupingType] = useState('Hourly') // Daily
  const { getUserTypeGrouped } = useData()

  const userTypeGrouped = React.useMemo(
    () => getUserTypeGrouped(selectedUserType, groupingType),
    [getUserTypeGrouped, selectedUserType, groupingType]
  )

  const getRandInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
  }

  const X_AXIS = groupingType === 'Hourly' ? X_AXIS_HOURLY : X_AXIS_WEEKDAY

  const traceOthers = {
    x: X_AXIS,
    y: userTypeGrouped.othersValues,
    name: 'Others',
    type: 'bar',
    marker: {
      color: theme.colors.red[100],
    },
  }
  const traceShopping = {
    x: X_AXIS,
    y: userTypeGrouped.shoppingValues,
    name: 'Shopping',
    type: 'bar',
    marker: {
      color: theme.colors.red[400],
    },
  }
  const traceSns = {
    x: X_AXIS,
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
          User <b>Type</b> and <b> Grouping </b> Selection
        </Text>
        <DropdownsContainer>
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
                  {groupingType}
                </MenuButton>
                <MenuList>
                  {GROUPING_OPTIONS.map((value, i) => (
                    <MenuItem
                      key={value + i.toString()}
                      onClick={() => {
                        setGroupingType(value)
                      }}
                    >
                      {value}
                    </MenuItem>
                  ))}
                </MenuList>
              </>
            )}
          </Menu>
        </DropdownsContainer>
      </div>
      <Plot layout={layout} data={data} />
    </div>
  )
}

const DropdownsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

export default UserTypeChart
