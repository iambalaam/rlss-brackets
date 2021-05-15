import * as React from 'react';
import { TeamEntry } from './pages/TeamEntry';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export function App() {
    return (
        <BrowserRouter>
            <main>
                <Switch>
                    <Route
                        exact path="/:id/teams/"
                        render={({ match }) => <TeamEntry id={match.params.id} />}
                    />
                    <Route><h1>404</h1></Route>

                </Switch>
            </main>
        </BrowserRouter>
    );
}