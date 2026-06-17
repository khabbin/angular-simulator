import { HttpInterceptorFn, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {

  const startTime = performance.now();
  const { method, urlWithParams } = req;

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          const duration = (performance.now() - startTime).toFixed(2);
          console.log(`[HTTP SUCCESS] ${ method } ${ urlWithParams } | Статус: ${ event.status } | Время: ${ duration }ms`);
        }
      },
      error: (error) => {
        const duration = (performance.now() - startTime).toFixed(2);
        console.error(`[HTTP ERROR] ${ method } ${ urlWithParams } | Статус: ${ error.status } (${ error.statusText }) | Время: ${ duration }ms`);
      }
    })
  );
};