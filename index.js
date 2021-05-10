const express = require('express');
const server = express();

const PORT = 3000;

server.get('/', function (_req, res) {
    res.send('hello world');
})

server.listen(PORT, () => {
    console.log(`express server listening on port ${PORT}`);
});