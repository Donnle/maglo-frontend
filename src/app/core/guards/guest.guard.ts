import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getAuthState$().pipe(
    take(1),
    map(authState => {
      if (authState.isAuthenticated && authService.isAuthenticated()) {
        // User is already authenticated, redirect to dashboard
        router.navigate(['/dashboard']);
        return false;
      } else {
        return true;
      }
    })
  );
};
