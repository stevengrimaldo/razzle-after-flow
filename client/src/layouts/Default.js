// @flow
import React from 'react';
import type { Node } from 'react';
import { GlobalStyles } from '@global';

type Props = {
  children: Node,
};

const DefaultLayout = ({ children }: Props) => (
  <>
    {children}
    <GlobalStyles />
  </>
);

export default DefaultLayout;
