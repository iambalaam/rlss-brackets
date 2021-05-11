import * as React from 'react';
import { Match } from './components/Match'

export function App() {
    return (
        <main>
            <Match
                aTeam={{
                    id: 1,
                    name: 'England',
                    primaryColor: 'white',
                    secondaryColor: 'indianred'
                }}
                bTeam={{
                    id: 2,
                    name: 'Brazil',
                    primaryColor: 'green',
                    secondaryColor: 'yellow'
                }}
                aScore={[1, 10, undefined]}
                bScore={[3, 2, undefined]}
                bestOf={3}
                gameNumber={2}
            />
        </main>
    );
}