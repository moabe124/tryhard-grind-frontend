export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nick: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

export interface UserDto {
  id: string;
  nick: string;
  email: string;
  avatarUrl: string;
}

export interface RefreshRequest {
  refreshToken: string;
}
