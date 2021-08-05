// @flow
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '@global';
import type { Node } from 'react';

type Props = {
  children: Node,
};

const PageLayout = ({ children }: Props) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default PageLayout;
