import { getWinner, MatchProps } from './Match';

const A_TEAM = { id: 0, name: 'Team A', primaryColor: 'a', secondaryColor: 'A' };
const B_TEAM = { id: 0, name: 'Team B', primaryColor: 'b', secondaryColor: 'B' };
const MOCK_MATCH: MatchProps = {
    aTeam: A_TEAM,
    bTeam: B_TEAM,
    aScores: [],
    bScores: [],
    bestOf: 3,
    gameNumber: -1
}

describe('getWinner()', () => {
    it("Knows if a match hasn't begun", () => {
        expect(getWinner({ ...MOCK_MATCH, gameNumber: -1 })).toBeUndefined();
    });
    it('Knows if A team wiped the board', () => {
        expect(getWinner({
            ...MOCK_MATCH,
            bestOf: 5,
            aScores: [10, 10, 10],
            bScores: [0, 0, 0],
            gameNumber: 3
        })).toBe(A_TEAM)
    })
})