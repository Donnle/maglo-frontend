import { HttpInterceptorFn, HttpRequest, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { AuthApiService } from '../services/api/auth-api.service';

// Global state for token refresh
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<any>(null);

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
  const tokenService = inject(TokenService);
  const authApiService = inject(AuthApiService);

  // Add authorization header if token exists
  const authToken = tokenService.getAuthorizationHeader();
  if (authToken) {
    request = request.clone({
      setHeaders: {
        Authorization: authToken
      }
    });
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && tokenService.hasRefreshToken()) {
        return handle401Error(request, next, tokenService, authApiService);
      }
      return throwError(() => error);
    })
  );
};

function handle401Error(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  tokenService: TokenService,
  authApiService: AuthApiService
): Observable<any> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    const refreshToken = tokenService.getRefreshToken();
    if (refreshToken) {
      return authApiService.refreshToken().pipe(
        switchMap((response: any) => {
          isRefreshing = false;
          tokenService.setAccessToken(response.accessToken);
          tokenService.setRefreshToken(response.refreshToken);
          tokenService.setTokenExpiry(response.expiresIn);
          refreshTokenSubject.next(response.accessToken);

          // Retry the original request with new token
          return next(addTokenToRequest(request, response.accessToken));
        }),
        catchError((error) => {
          isRefreshing = false;
          tokenService.clearTokens();
          return throwError(() => error);
        })
      );
    }
  }

  return refreshTokenSubject.pipe(
    filter(token => token !== null),
    take(1),
    switchMap(() => next(addTokenToRequest(request, tokenService.getAccessToken()!)))
  );
}

function addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}
