import * as express from 'express';
import { Express } from 'express';
import { resolve } from 'path';

const CLIENT_DIR = resolve(__dirname, '..', '..', 'dist', 'client');


export function attachHttpRoutes(server: Express) {
    // Assets
    server.use('/', express.static(CLIENT_DIR));

    // HTTP Routes
    server.all('*', (_req, res) => {
        res.sendFile(resolve(CLIENT_DIR, 'index.html'));
    })
}