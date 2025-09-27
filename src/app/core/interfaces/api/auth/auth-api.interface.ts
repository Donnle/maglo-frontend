import { User } from "../../auth.interface";

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
    expiresIn: number;
  }

  export interface RegisterResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
    expiresIn: number;
  }
  
  export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }