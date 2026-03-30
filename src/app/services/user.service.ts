import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, finalize, Observable, of } from 'rxjs';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { IUser } from '../../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  messageService: MessageService = inject(MessageService);
  loaderService: LoaderService = inject(LoaderService);
  userApiService: UserApiService = inject(UserApiService);
  
  private userSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.userSubject.asObservable();
  
  getUsers(): IUser[] {
    return this.userSubject.getValue();
  }
  
  setUsers(users: IUser[]): void {
    this.userSubject.next(users);
  }
  
  loadUsers(): Observable<IUser[]> {
    this.loaderService.showSpinner();
    return this.userApiService.getUsers()
      .pipe(
        delay(2000),
        catchError(error => {
          this.messageService.showError('Ошибка');
          return of([]);
        }),
        finalize(() => this.loaderService.hideSpinner())
      );
  }
  
}
