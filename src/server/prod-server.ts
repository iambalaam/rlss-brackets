import * as express from 'express';
import * as morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { attachHttpRoutes } from './http-routes';
import { attachSocketRoutes } from './socket-routes';

const PORT = process.env.PORT || 3000;

// Socket.io and express share server
const app = express();
app.use(morgan('common'));
const server = createServer(app);
const io = new Server(server);

attachHttpRoutes(app);

// Socket Routes
attachSocketRoutes(io);

// Start server
server.listen(PORT, () => {
    console.log(`express server listening on port ${PORT}`);
});