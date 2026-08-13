import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { IToken } from '../interfaces/IToken';
import { IAuthUser } from '../interfaces/IAuthUser';

@Service()
export class AuthorizationApiService {
  
  private readonly api: string = 'https://dummyjson.com/auth';
  http: HttpClient = inject(HttpClient);
  
  getToken(username: string, password: string): Observable<IToken> {
    return this.http.post<IToken>(`${ this.api }/login`, { username, password });
  }
  
  getAuthUser(): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(`${ this.api }/me`);
  }
  
  refreshSession(refreshToken: string): Observable<IToken> {
    return this.http.post<IToken>(`${ this.api }/refresh`, { refreshToken });
  }
  
}
