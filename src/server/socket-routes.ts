import { Server } from 'socket.io';
import { TournamentState } from '../../@types';


const data: { [id: string]: TournamentState } = {};

export function attachSocketRoutes(io: Server) {
    io.on('connection', (socket) => {

        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });

        // Query
        socket.on('get-tournament', (id: string) => {
            if (id) {
                data[id] = data[id] || {};
                socket.emit('get-tournament', data[id]);
                console.log(data);
            }
        })


        // Broadcast changes
        socket.on('update-tournament', (id: string, state: Partial<TournamentState>) => {
            // Team update
            if (data[id] && state.teams) {
                data[id].teams = state.teams;
            }

            // Results update
            socket.broadcast.emit('update-tournament', id, data[id]);
        });
    });

}