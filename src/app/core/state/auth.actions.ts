import { User } from '../interfaces/auth.interface';

// User Management Actions
export class AuthSetUser {
  static readonly type = '[Auth] Set User';
  constructor(public user: User | null) {}
}

export class AuthClearUser {
  static readonly type = '[Auth] Clear User';
}

// Authentication Status Actions
export class AuthSetAuthenticated {
  static readonly type = '[Auth] Set Authenticated';
  constructor(public isAuthenticated: boolean) {}
}

export class AuthSetLoading {
  static readonly type = '[Auth] Set Loading';
  constructor(public isLoading: boolean) {}
}


// Token Management Actions
export class AuthSetTokens {
  static readonly type = '[Auth] Set Tokens';
  constructor(
    public accessToken: string | null,
    public refreshToken: string | null,
    public tokenExpiry: number | null
  ) {}
}

export class AuthClearTokens {
  static readonly type = '[Auth] Clear Tokens';
}

// Authentication Flow Actions
export class AuthLoginSuccess {
  static readonly type = '[Auth] Login Success';
  constructor(
    public user: User,
    public accessToken: string,
    public refreshToken: string,
    public expiresIn: number
  ) {}
}

export class AuthLogout {
  static readonly type = '[Auth] Logout';
}

export class AuthClearData {
  static readonly type = '[Auth] Clear Auth Data';
}

// Token Refresh Actions
export class AuthRefreshTokenSuccess {
  static readonly type = '[Auth] Refresh Token Success';
  constructor(
    public accessToken: string,
    public refreshToken: string,
    public expiresIn: number
  ) {}
}


// Profile Management Actions
export class AuthUpdateUserProfile {
  static readonly type = '[Auth] Update User Profile';
  constructor(public user: User) {}
}
