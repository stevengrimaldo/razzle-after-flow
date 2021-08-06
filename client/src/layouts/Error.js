// @flow
import React from 'react';
import styled from 'styled-components';
import { GlobalStyles } from '@global';
import PageLayout from './Page';

type Props = {
  message?: string,
  status: number,
};

export const ErrorLayout = ({
  message = 'An unknown error occurred',
  status,
}: Props) => (
  <>
    <PageLayout>
      <p>{status}, {message}</p>
    </PageLayout>
    <GlobalStyles />
  </>
);

export default ErrorLayout;
