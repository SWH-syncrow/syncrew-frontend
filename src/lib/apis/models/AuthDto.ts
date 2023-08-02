export interface LoginRequest {
  accessToken: string;
}

export interface LoginResponse {
  user: {
    id: number;
    username: string;
    email: string;
    profileImage: null | string;
    temp: number;
    isTestTarget: boolean;
  };
  token: {
    accessToken: string;
    refreshToken: string;
  };
  isNewUser: boolean;
}

export interface ReissueRequest {
  refreshToken: string;
}

export interface ReissueResponse {
  accessToken: string;
  refreshToken: string;
}

export interface GetUserResponse {
  id: number;
  username: string;
  email: string;
  profileImage: null | string;
  temp: number;
  isTestTarget: boolean;
}
