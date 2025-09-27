import { Injectable } from '@angular/core';
import { Observable, timer, throwError } from 'rxjs';
import { map, catchError, tap, switchMap, finalize } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { AuthApiService } from './api/auth-api.service';
import { TokenService } from './token.service';
import { ToastService } from './toast.service';
import {
  AuthSetUser,
  AuthSetAuthenticated,
  AuthSetLoading,
  AuthClearData,
  AuthLoginSuccess,
  AuthRefreshTokenSuccess,
  AuthUpdateUserProfile
} from '../state/auth.actions';
import {
  LoginRequest,
  RegisterRequest,
  User,
  AuthState,
  AuthError
} from '../interfaces/auth.interface';
import {
  LoginResponse,
  RefreshTokenResponse,
  RegisterResponse
} from '../interfaces/api/auth/auth-api.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenRefreshTimer?: any;
  private readonly TOKEN_REFRESH_BUFFER = 5 * 60 * 1000; // 5 minutes before expiry

  constructor(
    private store: Store,
    private authApiService: AuthApiService,
    private tokenService: TokenService,
    private toastService: ToastService
  ) {
    this.initializeAuth();
  }

  /**
   * Get authentication state observable
   * @returns Observable of auth state
   */
  getAuthState$(): Observable<AuthState> {
    return this.store.select(state => state.auth);
  }

  /**
   * Get current authentication state
   * @returns Current auth state
   */
  getAuthState(): AuthState {
    return this.store.selectSnapshot(state => state.auth);
  }

  /**
   * Check if user is authenticated
   * @returns True if authenticated
   */
  isAuthenticated(): boolean {
    return this.store.selectSnapshot(state => state.auth.isAuthenticated) && this.tokenService.isAccessTokenValid();
  }

  /**
   * Get current user
   * @returns Current user or null
   */
  getCurrentUser(): User | null {
    return this.store.selectSnapshot(state => state.auth.user);
  }

  /**
   * Login user
   * @param credentials - Login credentials
   * @returns Observable of login response
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    this.store.dispatch(new AuthSetLoading(true));

    return this.authApiService.login(credentials).pipe(
      tap((response: LoginResponse) => {
        this.handleSuccessfulAuth(response);
        this.scheduleTokenRefresh();

        this.toastService.success('Welcome back!', 'Login Successful', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }),
      catchError((error) => {
        const errorMessage = this.getErrorMessage(error);

        this.toastService.error(errorMessage, 'Login Error', {
          timeOut: 6000,
          positionClass: 'toast-top-center'
        });
        return throwError(() => error);
      }),
      finalize(() => {
        this.store.dispatch(new AuthSetLoading(false));
      })
    );
  }

  /**
   * Register new user
   * @param userData - Registration data
   * @returns Observable of registration response
   */
  register(userData: RegisterRequest): Observable<RegisterResponse> {
    this.store.dispatch(new AuthSetLoading(true));

    return this.authApiService.register(userData).pipe(
      tap((response: RegisterResponse) => {
        this.handleSuccessfulAuth(response);
        this.scheduleTokenRefresh();
        this.toastService.success('Account created successfully!', 'Registration Successful', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }),
      catchError((error) => {
        const errorMessage = this.getErrorMessage(error);

        this.toastService.error(errorMessage, 'Registration Error', {
          timeOut: 6000,
          positionClass: 'toast-top-center'
        });
        return throwError(() => error);
      }),
      finalize(() => {
        this.store.dispatch(new AuthSetLoading(false));
      })
    );
  }

  /**
   * Refresh access token
   * @returns Observable of refresh response
   */
  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.tokenService.getRefreshToken();

    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.authApiService.refreshToken().pipe(
      tap((response: RefreshTokenResponse) => {
        this.tokenService.setAccessToken(response.accessToken);
        this.tokenService.setRefreshToken(response.refreshToken);
        this.tokenService.setTokenExpiry(response.expiresIn);
        this.store.dispatch(new AuthRefreshTokenSuccess(response.accessToken, response.refreshToken, response.expiresIn));
        this.scheduleTokenRefresh();
      }),
      catchError((error) => {
        this.toastService.warning('Session expired. Please login again.', 'Session Expired', {
          timeOut: 8000,
          positionClass: 'toast-top-center'
        });
        this.logout();
        return throwError(() => error);
      })
    );
  }

  /**
   * Logout user
   * @returns Observable of logout response
   */
  logout(): Observable<any> {
    this.store.dispatch(new AuthSetLoading(true));

    return this.authApiService.logout().pipe(
      tap(() => {
        this.handleLogout();
        this.toastService.info('Logged out successfully', 'Logout', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }),
      catchError((error) => {
        // Even if logout fails on server, clear local data
        this.handleLogout();
        this.toastService.warning('Logged out (server error)', 'Logout', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        return throwError(() => error);
      }),
      finalize(() => {
        this.store.dispatch(new AuthSetLoading(false));
      })
    );
  }

  /**
   * Force logout (clear local data without server call)
   */
  forceLogout(): void {
    this.handleLogout();
  }

  /**
   * Get user profile
   * @returns Observable of user profile
   */
  getProfile(): Observable<User> {
    return this.authApiService.getProfile().pipe(
      tap((user: User) => {
        this.store.dispatch(new AuthSetUser(user));
      }),
      catchError((error) => {
        const errorMessage = this.getErrorMessage(error);

        this.toastService.error(errorMessage, 'Profile Error', {
          timeOut: 5000,
          positionClass: 'toast-top-right'
        });
        return throwError(() => error);
      })
    );
  }

  /**
   * Update user profile
   * @param userData - Updated user data
   * @returns Observable of updated user
   */
  updateProfile(userData: Partial<User>): Observable<User> {
    return this.authApiService.updateProfile(userData).pipe(
      tap((user: User) => {
        this.store.dispatch(new AuthUpdateUserProfile(user));
        this.toastService.success('Profile updated successfully', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      }),
      catchError((error) => {
        const errorMessage = this.getErrorMessage(error);

        this.toastService.error(errorMessage, 'Update Error', {
          timeOut: 5000,
          positionClass: 'toast-top-right'
        });
        return throwError(() => error);
      })
    );
  }

  /**
   * Change password
   * @param currentPassword - Current password
   * @param newPassword - New password
   * @returns Observable of success response
   */
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.authApiService.changePassword(currentPassword, newPassword).pipe(
      tap(() => {
        this.toastService.success('Password changed successfully', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      }),
      catchError((error) => {
        const errorMessage = this.getErrorMessage(error);

        this.toastService.error(errorMessage, 'Password Change Error', {
          timeOut: 5000,
          positionClass: 'toast-top-right'
        });
        return throwError(() => error);
      })
    );
  }

  /**
   * Initialize authentication state
   */
  private initializeAuth(): void {
    const isAuthenticated = this.store.selectSnapshot(state => state.auth.isAuthenticated);
    const hasValidToken = this.tokenService.isAccessTokenValid();
    const hasRefreshToken = this.tokenService.hasRefreshToken();

    if (isAuthenticated && hasValidToken) {
      this.store.dispatch(new AuthSetAuthenticated(true));
      this.scheduleTokenRefresh();
    } else if (hasRefreshToken) {
      // Try to refresh token
      this.refreshToken().subscribe({
        next: () => {
          this.store.dispatch(new AuthSetAuthenticated(true));
        },
        error: () => {
          this.handleLogout();
        }
      });
    } else {
      this.store.dispatch(new AuthSetAuthenticated(false));
    }
  }

  /**
   * Handle successful authentication
   * @param response - Auth response
   */
  private handleSuccessfulAuth(response: LoginResponse | RegisterResponse): void {
    this.tokenService.setAccessToken(response.accessToken);
    this.tokenService.setRefreshToken(response.refreshToken);
    this.tokenService.setTokenExpiry(response.expiresIn);
    this.store.dispatch(new AuthLoginSuccess(
      response.user,
      response.accessToken,
      response.refreshToken,
      response.expiresIn
    ));
  }

  /**
   * Handle logout
   */
  private handleLogout(): void {
    this.tokenService.clearTokens();
    this.store.dispatch(new AuthClearData());
    this.clearTokenRefreshTimer();
  }

  /**
   * Schedule automatic token refresh
   */
  private scheduleTokenRefresh(): void {
    this.clearTokenRefreshTimer();

    const tokenExpiry = this.tokenService.getTokenExpiry();
    if (!tokenExpiry) return;

    const now = Date.now() / 1000;
    const timeUntilExpiry = (tokenExpiry - now) * 1000;
    const refreshTime = Math.max(timeUntilExpiry - this.TOKEN_REFRESH_BUFFER, 60000); // At least 1 minute

    this.tokenRefreshTimer = timer(refreshTime).pipe(
      switchMap(() => this.refreshToken())
    ).subscribe({
      next: () => {
        console.log('Token refreshed successfully');
      },
      error: (error) => {
        console.error('Token refresh failed:', error);
        this.handleLogout();
      }
    });
  }

  /**
   * Clear token refresh timer
   */
  private clearTokenRefreshTimer(): void {
    if (this.tokenRefreshTimer) {
      this.tokenRefreshTimer.unsubscribe();
      this.tokenRefreshTimer = null;
    }
  }

  /**
   * Get error message from error response
   * @param error - Error response
   * @returns Error message
   */
  private getErrorMessage(error: any): string {
    if (error?.error?.message) {
      return error.error.message;
    }
    if (error?.message) {
      return error.message;
    }
    return 'An unexpected error occurred';
  }
}
