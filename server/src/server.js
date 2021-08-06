import express from 'express';
import path from 'path';

// Middlewares
import { error, loader } from './middlewares';

const clientPath = path.resolve(__dirname, '../build/public');

// Create our express app using the port optionally specified
const app = express();

// Handle static assets
app.disable('x-powered-by');
app.use(express.static(process.env.RAZZLE_PUBLIC_DIR));
app.get('/static/*', express.static(clientPath, { index: false }));

// Handles assembling the page to pass back to the client
app.use(loader);

// Show error page on all uncaught errors
app.use(error);

export default app;
