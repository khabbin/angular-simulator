import { inject, Injectable } from '@angular/core';
import { AuthorizationApiService } from './authorization-api.service';
import { LocalStorageService } from '../../../app/services/local-storage.service';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { IToken } from '../interfaces/IToken';
import { IAuthUser } from '../interfaces/IAuthUser';
import { MessageService } from '../../../app/services/message.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ILogin } from '../interfaces/ILogin';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  private authApiService: AuthorizationApiService = inject(
    AuthorizationApiService
  );

  private localStorageService: LocalStorageService =
    inject(LocalStorageService);

  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);

  private readonly TOKENS_KEY: string = 'auth_tokens';

  private currentUserSubject: BehaviorSubject<IAuthUser | null> =
    new BehaviorSubject<IAuthUser | null>(null);

  currentUser$: Observable<IAuthUser | null> =
    this.currentUserSubject.asObservable();

  getCurrentUser(): Observable<IAuthUser> {
    return this.authApiService
      .getAuthUser()
      .pipe(tap((user: IAuthUser) => this.currentUserSubject.next(user)));
  }

  login(credentials: ILogin): Observable<IAuthUser> {
    return this.authApiService.login(credentials).pipe(
      tap((tokens: IToken) => {
        this.saveTokens(tokens);
      }),
      switchMap(() => this.getCurrentUser()),
      tap(() => {
        this.router.navigate(['/']);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  initializeAuth(): Observable<IAuthUser | null> {
    const tokens: IToken | null = this.getTokens();
    const accessToken: string | undefined = tokens?.accessToken;

    if (!accessToken) {
      return of(null);
    }

    return this.authApiService.getAuthUser().pipe(
      tap((user: IAuthUser) => {
        this.currentUserSubject.next(user);
      }),
      catchError(() => {
        this.logout();
        return of(null);
      })
    );
  }

  refreshSession(): Observable<IToken> {
    const tokens: IToken = this.getTokens()!;
    const refreshToken: string = tokens?.refreshToken;

    return this.authApiService.refreshSession(refreshToken).pipe(
      tap((response: IToken) => {
        this.saveTokens(response);
      })
    );
  }

  getAccessToken(): string | null {
    return this.getTokens()?.accessToken || null;
  }

  private saveTokens(tokens: IToken): void {
    this.localStorageService.setItem(this.TOKENS_KEY, tokens);
  }

  private clearSession(): void {
    this.localStorageService.removeItem(this.TOKENS_KEY);
    this.currentUserSubject.next(null);
  }

  private getTokens(): IToken | null {
    return this.localStorageService.getItem<IToken>(this.TOKENS_KEY);
  }

}
