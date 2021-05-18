import * as React from 'react';
import { TournamentState } from '../../../@types';
import { Match, MatchProps } from '../components/Match';

export function Brackets(props: { data: TournamentState }) {
    const { data } = props;
    const nTeams = Math.pow(2, Math.ceil(Math.log2(data.teams.length)));

    // Fill nTeams with missing empty teams (byes)
    const teams = [...data.teams, ...Array(nTeams - data.teams.length).fill({})];

    const firstMatches: MatchProps[] = [];
    for (let a = 0; a < nTeams; a += 2) {
        const b = a + 1;
        firstMatches.push({
            aTeam: teams[a],
            bTeam: teams[b],
            aScores: [],
            bScores: [],
            bestOf: 3,
            gameNumber: -1
        });
    }

    return (
        <div>
            <h1>Brackets</h1>
            <h2>Round 1</h2>
            {firstMatches.map((p) => <Match {...p} />)}
        </div>
    )
}