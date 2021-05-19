import { Socket } from "socket.io-client";
import { MaybeTeam } from "../src/client/pages/TeamEntry";

export interface TournamentState {
    teams: MaybeTeam[]
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