// @flow
import React from 'react';
import { PageLayout } from '@layouts';

type Props = {
  test: boolean | null | undefined,
};

const Home = ({ test }: Props) => (
  <PageLayout>
    {test != null ? 'Hello World!' : 'Goodbye World!'}
  </PageLayout>
);

Home.getInitialProps = async () => {
  return { test: true };
};

export default Home;
