import React from 'react'
import styled from 'styled-components'
import theme from '../../theme'

export const Heading = styled.h1`
  color: ${theme.colors.black};
  font-family: 'Inter, system-ui, sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu' !important;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  display: flex;
  text-align: center;
  align-items: center;
  letter-spacing: 0.1px;
  margin-bottom: 42px;
`

export const Text = styled.header`
  color: ${theme.colors.black};
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
`
