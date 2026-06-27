import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http"
import { MessageService } from "../services/message.service"
import { inject } from "@angular/core"
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const messageService: MessageService = inject(MessageService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status >= 500 && error.status < 600) {
        messageService.showError(`Возникла ошибка ${ error.status }`)
      }
      return throwError(() => error);
    })
  )
}