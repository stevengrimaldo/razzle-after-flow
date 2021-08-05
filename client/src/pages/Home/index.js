// @flow
import React from 'react';
import { PageLayout } from '@layouts';

type Props = {
  test: ?boolean,
};

const Home = ({ test }: Props) => (
  <PageLayout>
    {test != null ? 'Hello World!' : 'Goodbye World!'}
  </PageLayout>
);

Home.getInitialProps = async () => {
  return { test: null };
};

export default Home;
