import * as express from 'express';
import * as morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';

import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import { attachHttpRoutes } from './http-routes';
import { attachSocketRoutes } from './socket-routes';
const config = require('../client/webpack.config.js');

const PORT = process.env.PORT || 3000;

// Socket.io and express share server
const app = express();
app.use(morgan('common'));
const server = createServer(app);
const io = new Server(server);

// Add webpack middleware
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { writeToDisk: true }));
app.use(webpackHotMiddleware(compiler));

// HTTP Routes
attachHttpRoutes(app);

// Socket Routes
attachSocketRoutes(io);

// Start server
server.listen(PORT, () => {
    console.log(`express server listening on port ${PORT}`);
});