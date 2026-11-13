export interface LeaderboardEntry {
    rank: number;
    idPelapor: number;
    namaPelapor: string;
    poinPelapor: number;
}

export interface MyLeaderboardData {
    idPelapor: number;
    namaPelapor: string;
    poinPelapor: number;
    rank: number;
    inTop20: boolean;
}