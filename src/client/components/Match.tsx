import * as React from 'react';
import './Match.css';

export type Color = string;
export type Team = {
    id: number;
    name: string;
    primaryColor: Color;
    secondaryColor: Color;

}

export type MaybeNumber = (undefined | number);
export interface MatchProps {
    aTeam: Team,
    bTeam: Team,
    aScores: MaybeNumber[],
    bScores: MaybeNumber[],
    bestOf: number,
    gameNumber: number;
}

export function getWinner(match: MatchProps): (Team | undefined) {
    if (match.gameNumber === -1) return undefined;
    if (match.gameNumber < match.bestOf / 2) return undefined;

    let aWins = 0;
    let bWins = 0;
    for (let game = 0; game < match.gameNumber; game++) {
        if (match.aScores[game]! > match.bScores[game]!) {
            aWins++;
        } else {
            bWins++;
        }
    }
    if (aWins > match.bestOf / 2) return match.aTeam;
    if (bWins > match.bestOf / 2) return match.bTeam;
    return undefined;
}

export function Match(props: MatchProps) {
    const { aTeam, bTeam, aScores, bScores, bestOf } = props;
    return (
        <div className={`match bo${bestOf}`}>
            <span className="name a" style={{ color: aTeam.secondaryColor, backgroundColor: aTeam.primaryColor }}>{aTeam.name}</span>
            <span className="name b" style={{ color: bTeam.secondaryColor, backgroundColor: bTeam.primaryColor }}>{bTeam.name}</span>
            {Array(bestOf).fill(0).map((_, i) => {
                const aScore = aScores[i];
                const bScore = bScores[i];
                if (!aScore || !bScore) {
                    return <>
                        <span className={`score score${i + 1} a`} style={{ color: aTeam.secondaryColor, backgroundColor: aTeam.primaryColor }}>?</span>
                        <span className={`score score${i + 1} b`} style={{ color: bTeam.secondaryColor, backgroundColor: bTeam.primaryColor }}>?</span>
                    </>
                };
                if (aScore > bScore) {
                    return <>
                        <span className={`score score${i + 1} a`} style={{ color: aTeam.primaryColor, backgroundColor: aTeam.secondaryColor }}>{aScore}</span>
                        <span className={`score score${i + 1} b`} style={{ color: bTeam.secondaryColor, backgroundColor: bTeam.primaryColor }}>{bScore}</span>
                    </>
                } else {
                    return <>
                        <span className={`score score${i + 1} a`} style={{ color: aTeam.secondaryColor, backgroundColor: aTeam.primaryColor }}>{aScore}</span>
                        <span className={`score score${i + 1} b`} style={{ color: bTeam.primaryColor, backgroundColor: bTeam.secondaryColor }}>{bScore}</span>
                    </>
                }
            })}
        </div>
    )
};