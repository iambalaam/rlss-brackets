import * as React from 'react';
import { TournamentState } from '../../../@types';
import { Match } from '../components/Match';
import { createBracket } from '../util/bracket';

export function Brackets(props: { data: Partial<TournamentState> }) {
    const { data } = props;
    const playerTeams = data.teams || [{}];
    const firstMatches = createBracket(playerTeams);

    return (
        <div>
            <h1>Brackets</h1>
            <h2>Round 1</h2>
            {firstMatches.map((p) => <Match {...p} />)}
        </div>
    )
}