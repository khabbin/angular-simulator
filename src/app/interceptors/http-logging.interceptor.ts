import {
  HttpInterceptorFn,
  HttpEventType,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const startTime: number = performance.now();
  const { method, urlWithParams }: { method: string; urlWithParams: string } =
    req;

  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event.type === HttpEventType.Response) {
        const duration: string = (performance.now() - startTime).toFixed(2);
        console.warn(
          `[HTTP SUCCESS] ${ method } ${ urlWithParams } | Статус: ${ event.status } | Время: ${ duration }ms`
        );
      }
    }),
    catchError((error: HttpErrorResponse) => {
      const duration: string = (performance.now() - startTime).toFixed(2);
      console.error(
        `[HTTP ERROR] ${ method } ${ urlWithParams } | Статус: ${ error.status } | Время: ${ duration }ms`
      );
      return throwError(() => error);
    })
  );
};
