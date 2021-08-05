// @flow
import React from 'react';
import type { Node } from 'react';

type Props = {
  children: Node,
};

const DefaultLayout = ({ children }: Props) => (
  <ModalProvider>
    {children}
    <GlobalStyles />
  </ModalProvider>
);

export default DefaultLayout;
