import * as express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Socket.io and express share server
const app = express();
const server = createServer(app);
const io = new Server(server);

// Initialise
const PORT = process.env.PORT || 3000;

// HTTP Routes
app.get('/', function (_req, res) {
    res.send('hello world');
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