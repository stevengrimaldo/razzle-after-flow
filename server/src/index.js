import express from 'express';
import open from 'open';

let app = require('./server').default;

if (module.hot) {
  module.hot.accept('./server', () => {
    console.info('🔁 HMR Reloading `./server`...');
    try {
      app = require('./server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅ Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, (err) => {
    if (err) return console.error('Port: ', err);
    console.info(`🚀 Started at http://localhost:${port}`);
    open(`http://localhost:${port}`);
  });
