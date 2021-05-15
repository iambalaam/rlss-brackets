import * as React from 'react';
import { useState, useEffect } from 'react';
import { TeamEntry } from './pages/TeamEntry';
import { io } from 'socket.io-client';
import { Route, Switch, useParams } from 'react-router-dom';
import { TournamentState } from '../../@types';

export function App() {
    const [isLoading, setLoading] = useState(true);
    const { id } = useParams() as { id: string };
    let tournamentData: TournamentState;
    useEffect(function setupSocket() {
        const socket = io();
        (window as any).socket = socket;
        socket.on('connect', () => {
            socket.emit('get-tournament', id);
        });
        socket.on('get-tournament', (data) => {
            tournamentData = data;
            setLoading(false);
        });
        return function cleanupSocket() {
            socket.disconnect();
        }
    })

    return (
        <main>
            {
                isLoading
                    ? <h2>loading</h2>
                    : (<Switch>
                        <Route
                            exact path="/:id/teams/"
                            render={({ match }) => <TeamEntry id={match.params.id} data={tournamentData!} />}
                        />
                        <Route><h1>404</h1></Route>

                    </Switch>)
            }
        </main>
    );
}