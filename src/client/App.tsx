import * as React from 'react';
import { TeamEntry } from './pages/TeamEntry';
import { Match } from './components/Match'

export function App() {
    return (
        <main>
            <TeamEntry />
            {/* <Match
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
                aScores={[1, 10, 7]}
                bScores={[3, 2, 1]}
                bestOf={3}
                gameNumber={2}
            /> */}
        </main>
    );
}