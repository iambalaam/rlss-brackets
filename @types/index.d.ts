import { Socket } from "socket.io";

export interface TournamentState {
    teams: TeamInfo[]
}

export interface TeamInfo {
    id: number;
    name: string;
    player1: string;
    player2: string;
    primaryColor: string;
    secondaryColor: string;
}

declare global {
    interface Window { socket: Socket; }
}