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
    gameNumber: MaybeNumber;
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