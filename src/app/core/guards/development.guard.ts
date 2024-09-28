import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { inject } from '@angular/core';

export const developmentGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (environment.production) {
    router.navigate(['']);
    return false;
  }

  return true;
};
