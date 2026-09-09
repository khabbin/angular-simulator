import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IToken } from '../interfaces/IToken';
import { IAuthUser } from '../interfaces/IAuthUser';
import { ILogin } from '../interfaces/ILogin';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationApiService {

  private readonly api: string = 'https://dummyjson.com/auth';
  http: HttpClient = inject(HttpClient);

  login(formValue: ILogin): Observable<IToken> {
    return this.http.post<IToken>(`${ this.api }/login`, { formValue });
  }

  getAuthUser(): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(`${ this.api }/me`);
  }

  refreshSession(refreshToken: string): Observable<IToken> {
    return this.http.post<IToken>(`${ this.api }/refresh`, { refreshToken });
  }

}
