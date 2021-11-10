import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    font-family: 'IBM Plex Sans', system-ui, sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu !important;
    margin: 0;
    padding: 0;
    font-size: 16px;
    color: #191A19;

  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  
  html, body {
    height: 100%;
  }
`
