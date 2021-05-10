import * as express from 'express';
import * as morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { resolve } from 'path';

// Socket.io and express share server
const app = express();
app.use(morgan('short'));
const server = createServer(app);
const io = new Server(server);

// Initialise
const PORT = process.env.PORT || 3000;
const STATIC_DIR = resolve(__dirname, '..', '..', 'dist', 'static');
const CLIENT_DIR = resolve(__dirname, '..', '..', 'dist', 'client');

// Assets
app.use('/static', express.static(STATIC_DIR));
app.use('/client', express.static(CLIENT_DIR));

// HTTP Routes
app.all('*', (_req, res) => {
    res.sendFile(resolve(CLIENT_DIR, 'index.html'));
})

// Socket Routes
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`express server listening on port ${PORT}`);
});