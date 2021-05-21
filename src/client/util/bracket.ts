import { MatchProps, Team } from '../components/Match';

export function createBracket(playerTeams: Team[]): MatchProps[] {
    const nTeams = Math.pow(2, Math.ceil(Math.log2(playerTeams.length)));

    // Fill nTeams with missing empty teams (byes)
    const teams = [...playerTeams, ...Array(nTeams - playerTeams.length).fill({})];

    const firstMatches: MatchProps[] = [];
    for (let i = 0; i < nTeams / 2; i += 1) {
        const a = i;
        const b = a + (nTeams / 2);
        firstMatches.push({
            aTeam: teams[a],
            bTeam: teams[b],
            aScores: [],
            bScores: [],
            bestOf: 3,
            gameNumber: -1
        });
    }

    return firstMatches;
}