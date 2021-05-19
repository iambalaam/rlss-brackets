import * as React from 'react';
import { useState, useEffect } from 'react';
import { TeamEntry } from './pages/TeamEntry';
import { Brackets } from './pages/Brackets';
import { io } from 'socket.io-client';
import { Route, Switch, useParams } from 'react-router-dom';
import { MaybeTeam, TournamentState } from '../../@types';

export function App() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Partial<TournamentState>>({ teams: [{}] });
    const { id } = useParams() as { id: string };
    let tournamentData: TournamentState;
    useEffect(function setupSocket() {
        const socket = io();
        window.socket = socket;
        socket.on('connect', () => {
            socket.emit('get-tournament', id);
        });
        socket.on('get-tournament', (data) => {
            setData(data);
            setLoading(false);
        });
        socket.on('update-tournament', updateData);
        return function cleanupSocket() {
            socket.disconnect();
        }
    }, [id])

    function updateData(tournId: string, data: Partial<TournamentState>) {
        if (tournId === id) {
            const newData = { ...data };
            if (data.teams) {
                newData.teams = data.teams;
            }
            setData(newData);
        }
    }

    function broadcastData(tournId: string, data: Partial<TournamentState>) {
        window.socket.emit('update-tournament', tournId, data);
    }

    return (
        <main>
            {
                isLoading
                    ? <h2>loading</h2>
                    : (<Switch>
                        <Route exact path="/:id/teams/">
                            <TeamEntry
                                id={id}
                                data={data}
                                updateTeams={(teams: MaybeTeam[]) => {
                                    updateData(id, { teams });
                                    broadcastData(id, { teams });
                                }}
                            />
                        </Route>
                        <Route exact path="/:id/brackets">
                            <Brackets data={data} />
                        </Route>
                        <Route><h1>404</h1></Route>

                    </Switch>)
            }
        </main>
    );
}