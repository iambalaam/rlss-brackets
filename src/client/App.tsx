import * as React from 'react';
import { useState, useEffect } from 'react';
import { TeamEntry } from './pages/TeamEntry';
import { io } from 'socket.io-client';
import { BrowserRouter, Route, Switch } from 'react-router-dom';





export function App() {
    const [isLoading, setLoading] = useState(true);
    useEffect(function setupSocket() {
        const socket = io();
        (window as any).socket = socket;
        socket.on('connect', () => {
            console.log('connected socket');

            setLoading(false);
        })
        return function cleanupSocket() {
            socket.disconnect();
        }
    })

    return (
        <BrowserRouter>
            <main>
                {
                    isLoading
                        ? 123
                        : (<Switch>
                            <Route
                                exact path="/:id/teams/"
                                render={({ match }) => <TeamEntry id={match.params.id} />}
                            />
                            <Route><h1>404</h1></Route>

                        </Switch>)
                }
            </main>
        </BrowserRouter>
    );
}