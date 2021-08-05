// @flow
import { createGlobalStyle } from 'styled-components';
import resetCSS from './reset';

export default createGlobalStyle`
  html {
    font-size: 62.5%;
  }
  body {
    font-size: 1.6rem;
  }
`;
