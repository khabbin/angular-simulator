import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';
import { IToken } from '../interfaces/IToken';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService: AuthorizationService = inject(AuthorizationService); 
  const accessToken: string | null = authService.getAccessToken();
  
  const setHeader = (request: HttpRequest<unknown>, token: string): HttpRequest<unknown> =>
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${ token }`
      }
    });
    
  const clonedReq = accessToken ? setHeader(req, accessToken) : req;
  
  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshSession().pipe(
          switchMap((newTokens: IToken) =>
            next(setHeader(req, newTokens.accessToken))
          ),
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
