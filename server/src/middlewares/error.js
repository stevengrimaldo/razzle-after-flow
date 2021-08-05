import React from 'react';
import { renderToString } from 'react-dom/server';
import ErrorLayout from '../../../client/src/layouts/error';

export default (err, req, res, next) => {
  const status =
    err.response && err.response.status ? err.response.status : 500;

  const message =
    err.response && err.response.statusText
      ? err.response.statusText
      : 'There seems to be a problem. Please try again in a bit.';

  res
    .status(status)
    .send(renderToString(<ErrorLayout message={message} status={status} />));
};
