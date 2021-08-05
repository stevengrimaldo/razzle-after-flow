import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ensureReady from '@jaredpalmer/after/ensureReady';
import After from '@jaredpalmer/after/after';
import routes from './global/routes';
import DefaultLayout from './layouts/default';

ensureReady(routes).then((data) =>
  hydrate(
    <BrowserRouter>
      <DefaultLayout meta={{}} url="/">
        <After data={data} routes={routes} />
      </DefaultLayout>
    </BrowserRouter>,
    document.getElementById('root')
  )
);

if (module.hot) {
  module.hot.accept();
}
