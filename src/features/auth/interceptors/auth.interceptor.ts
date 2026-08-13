import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';
import { IToken } from '../interfaces/IToken';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService: AuthorizationService = inject(AuthorizationService);
  let clonedReq: HttpRequest<unknown> = req;
  
  const accessToken: string | null = authService.getAccessToken();
  
  if (accessToken) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${ accessToken }`
      }
    });
  }
  
  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshSession().pipe(
          switchMap((newTokens: IToken) => {
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${ newTokens.accessToken }`
              }
            });
            return next(retryReq);
          }),
          catchError((refreshError: HttpErrorResponse) => {
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  )
  
};
