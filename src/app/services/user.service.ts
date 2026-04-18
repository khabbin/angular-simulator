import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { IUser } from '../../interfaces/IUser';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  messageService: MessageService = inject(MessageService);
  loaderService: LoaderService = inject(LoaderService);
  userApiService: UserApiService = inject(UserApiService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();
  
  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }
  
  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.localStorageService.setItem('users', users);
  }
  
  loadUsers(): Observable<IUser[]> {
    const cachedUsers = this.localStorageService.getItem<IUser[]>('users');
    if (cachedUsers && cachedUsers.length > 0) {
      this.usersSubject.next(cachedUsers);
      return of(cachedUsers);
    }
    this.loaderService.showSpinner();
    return this.userApiService.getUsers()
      .pipe(
        tap((users: IUser[]) => {
          this.usersSubject.next(users);
          this.localStorageService.setItem('users', users);
        }),
        catchError(() => {
          this.messageService.showError('Ошибка');
          return of([]);
        }),
        finalize(() => this.loaderService.hideSpinner())
      );
  }
  
  addUser(user: IUser): void {
    const users = this.getUsers();
    if (user) {
      this.messageService.showSuccess(`Пользователь ${user.name} добавлен`);
    }
    this.setUsers([user, ...users]);
  }
  
  deleteUser(userid: number): void {
    const users: IUser[] = this.getUsers().filter((user: IUser) => user.id !== userid);
    const deletedUser: IUser | undefined = users.find((user: IUser) => user.id === userid);
    if (deletedUser) {
      this.messageService.showSuccess(`Пользователь ${deletedUser.name} удален`);
    }
    this.setUsers(users);
  }
  
}
