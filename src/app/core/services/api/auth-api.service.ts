import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../../shared/services/base-api.service';
import {
  LoginRequest,
  RegisterRequest,
  User
} from '../../interfaces/auth.interface';
import { LoginResponse, RefreshTokenResponse, RegisterResponse } from '../../interfaces/api/auth/auth-api.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends BaseApiService {
  /**
   * Login user
   * @param credentials - Login credentials
   * @returns Observable<LoginResponse>
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.post<LoginResponse>('/auth/login', credentials);
  }

  /**
   * Register new user
   * @param userData - Registration data
   * @returns Observable<RegisterResponse>
   */
  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.post<RegisterResponse>('/auth/register', userData);
  }

  /**
   * Logout user
   * @returns Observable<any>
   */
  logout(): Observable<any> {
    return this.post('/auth/logout');
  }

  /**
   * Refresh token
   * @returns Observable<RefreshTokenResponse>
   */
  refreshToken(): Observable<RefreshTokenResponse> {
    return this.post<RefreshTokenResponse>('/auth/refresh-token');
  }

  /**
   * Get current user profile
   * @returns Observable<User>
   */
  getProfile(): Observable<User> {
    return this.get<User>('/auth/profile');
  }

  /**
   * Update user profile
   * @param userData - Updated user data
   * @returns Observable<User>
   */
  updateProfile(userData: Partial<User>): Observable<User> {
    return this.put<User>('/auth/profile', userData);
  }

  /**
   * Change password
   * @param currentPassword - Current password
   * @param newPassword - New password
   * @returns Observable<any>
   */
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.post('/auth/change-password', {
      currentPassword,
      newPassword
    });
  }

  /**
   * Request password reset
   * @param email - User email
   * @returns Observable<any>
   */
  requestPasswordReset(email: string): Observable<any> {
    return this.post('/auth/forgot-password', { email });
  }

  /**
   * Reset password with token
   * @param token - Reset token
   * @param newPassword - New password
   * @returns Observable<any>
   */
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.post('/auth/reset-password', {
      token,
      newPassword
    });
  }

  /**
   * Verify email address
   * @param token - Verification token
   * @returns Observable<any>
   */
  verifyEmail(token: string): Observable<any> {
    return this.get('/auth/verify-email', { token });
  }

  /**
   * Resend email verification
   * @returns Observable<any>
   */
  resendEmailVerification(): Observable<any> {
    return this.post('/auth/resend-verification');
  }
}
