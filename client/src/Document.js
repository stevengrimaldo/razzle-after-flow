import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import {
  AfterRoot,
  AfterData,
  AfterScripts,
  AfterStyles,
} from '@jaredpalmer/after';
import { DefaultLayout } from './layouts';

const Document = ({ helmet, meta, styleTags }) => {
  const bodyAttributes = helmet.bodyAttributes.toComponent();
  const htmlAttributes = helmet.htmlAttributes.toComponent();
  const helmetLink = helmet.link.toComponent();
  const helmetMeta = helmet.meta.toComponent();
  const helmetScript = helmet.script.toComponent();
  const helmetTitle = helmet.title.toComponent();

  return (
    <html {...htmlAttributes}>
      <head>
        {helmetTitle}
        {helmetMeta}
        {helmetLink}
        {styleTags}
        <AfterStyles />
        {helmetScript}
      </head>
      <body {...bodyAttributes}>
        <AfterRoot />
        <AfterData />
        <AfterScripts />
      </body>
    </html>
  );
};

Document.getInitialProps = async ({ renderPage }) => {
  const sheet = new ServerStyleSheet();
  const page = await renderPage((App) => (data) => {
    return sheet.collectStyles(
      <DefaultLayout>
        <App {...data} />
      </DefaultLayout>
    );
  });
  const styleTags = sheet.getStyleElement();
  return { ...page, styleTags };
};

export default Document;
