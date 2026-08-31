import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { map, take } from 'rxjs';
import { Role } from '../../../enums/Role';
import { IAuthUser } from '../interfaces/IAuthUser';

export const adminGuard: CanActivateFn = (route, state) => {
  
  const router: Router = inject(Router);
  const authService: AuthorizationService = inject(AuthorizationService);
  
  return authService.currentUser$.pipe(
    take(1),
    map((user: IAuthUser | null) => {
      if (user && user.role === Role.ADMIN) {
        return true;
      }
      else {
        return router.createUrlTree(['/']);
      }
    })
  )
  
};
