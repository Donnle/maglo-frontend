import { Injectable } from '@angular/core';
import { TokenPayload } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly TOKEN_EXPIRY_KEY = 'token_expiry';

  /**
   * Store access token
   * @param token - Access token
   */
  setAccessToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  /**
   * Get access token
   * @returns Access token or null
   */
  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Store refresh token
   * @param token - Refresh token
   */
  setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  /**
   * Get refresh token
   * @returns Refresh token or null
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Store token expiry time
   * @param expiry - Token expiry timestamp
   */
  setTokenExpiry(expiry: number): void {
    localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiry.toString());
  }

  /**
   * Get token expiry time
   * @returns Token expiry timestamp or null
   */
  getTokenExpiry(): number | null {
    const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    return expiry ? parseInt(expiry, 10) : null;
  }

  /**
   * Check if access token is valid and not expired
   * @returns True if token is valid and not expired
   */
  isAccessTokenValid(): boolean {
    const token = this.getAccessToken();
    const expiry = this.getTokenExpiry();
    
    if (!token || !expiry) {
      return false;
    }

    // Check if token is expired (with 30 second buffer)
    const now = Math.floor(Date.now() / 1000);
    return expiry > (now + 30);
  }

  /**
   * Check if refresh token exists
   * @returns True if refresh token exists
   */
  hasRefreshToken(): boolean {
    return this.getRefreshToken() !== null;
  }

  /**
   * Decode JWT token payload
   * @param token - JWT token
   * @returns Decoded token payload or null
   */
  decodeToken(token: string): TokenPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Get user info from access token
   * @returns User info from token or null
   */
  getUserFromToken(): TokenPayload | null {
    const token = this.getAccessToken();
    if (!token) {
      return null;
    }
    return this.decodeToken(token);
  }

  /**
   * Clear all tokens
   */
  clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }

  /**
   * Get authorization header value
   * @returns Bearer token string or null
   */
  getAuthorizationHeader(): string | null {
    const token = this.getAccessToken();
    return token ? `Bearer ${token}` : null;
  }
}
