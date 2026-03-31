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
  
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();
  
  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }
  
  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }
  
  loadUsers(): Observable<IUser[]> {
    this.loaderService.showSpinner();
    return this.userApiService.getUsers()
      .pipe(
        catchError(() => {
          this.messageService.showError('Ошибка');
          return of([]);
        }),
        finalize(() => this.loaderService.hideSpinner())
      );
  }
  
}
