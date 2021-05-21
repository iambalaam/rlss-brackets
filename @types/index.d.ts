import { Socket } from "socket.io-client";
import { MatchProps } from "../src/client/components/Match";
import { MaybeTeam } from "../src/client/pages/TeamEntry";

export interface TournamentState {
    teams: MaybeTeam[];
    matches: MatchProps[];
    currentMatch: number;
}

export interface TeamInfo {
    id: number;
    name: string;
    player1: string;
    player2: string;
    primaryColor: string;
    secondaryColor: string;
}
interface EmptyTeam { };
export type MaybeTeam = TeamInfo | EmptyTeam;

declare global {
    interface Window { socket: Socket }
}