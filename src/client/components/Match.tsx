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
    aScore: MaybeNumber[],
    bScore: MaybeNumber[],
    bestOf: number,
    gameNumber: MaybeNumber;
}

export function Match(p: MatchProps) {
    return (
        <div className="match">
            <span className="name a" style={{ color: p.aTeam.secondaryColor, backgroundColor: p.aTeam.primaryColor }}>{p.aTeam.name}</span>
            <span className="name b" style={{ color: p.bTeam.secondaryColor, backgroundColor: p.bTeam.primaryColor }}>{p.bTeam.name}</span>
            {p.aScore.map((score, i) => <span className={`score score${i + 1} a`} style={{ color: p.aTeam.secondaryColor, backgroundColor: p.aTeam.primaryColor }}>{score}</span>)}
            {p.bScore.map((score, i) => <span className={`score score${i + 1} b`} style={{ color: p.bTeam.secondaryColor, backgroundColor: p.bTeam.primaryColor }}>{score}</span>)}
        </div>
    )
};