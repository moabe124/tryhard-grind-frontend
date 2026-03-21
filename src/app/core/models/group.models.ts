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

export type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';

export interface GroupMemberResponse {
  userId: string;
  nick: string;
  avatarUrl: string | null;
  totalPoints: number;
  tier: Tier;
  position: number;
  deltaToday: number | null;
}

export interface GroupRankingResponse {
  groupId: string;
  groupName: string;
  period: string;
  members: GroupMemberResponse[];
}

export interface CreateGroupRequest {
  name: string;
  game: string;
  scoringConfig: ScoringConfig;
}

export interface UpdateGroupRequest {
  name?: string;
  scoringConfig?: ScoringConfig;
}

export interface InviteResponse {
  token: string;
  inviteUrl: string;
}

export interface JoinGroupResponse {
  groupId: string;
  groupName: string;
  message: string;
}
