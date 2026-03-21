export interface ScoringConfig {
  baseWin: number;
  baseLoss: number;
  kdaWeight: number;
}

export interface GroupResponse {
  id: string;
  name: string;
  game: string;
  memberCount: number;
  createdAt: string;
  scoringConfig: ScoringConfig;
}

export interface CreateGroupRequest {
  name: string;
  game: string;
  scoringConfig: ScoringConfig;
}
