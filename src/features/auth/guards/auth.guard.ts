import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router: Router = inject(Router);
  const authService: AuthorizationService = inject(AuthorizationService);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
  
};
