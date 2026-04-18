import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../app/services/user.service';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../interfaces/IUser';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { UserCardComponent } from "../user-card/user-card.component";
import { CreateUserComponent } from "../create-user/create-user.component";
import { UsersFilterComponent } from '../users-filter/users-filter.component';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  
  private userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;
  searchNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchName$: Observable<string> = this.searchNameSubject.asObservable();
  filteredUsers$: Observable<IUser[]> = combineLatest<[IUser[], string]>([
    this.users$,
    this.searchName$
  ])
  .pipe(
    map(([users, name]: [IUser[], string]) => {
      if (!name) {
        return users;
      }
      return users.filter((user: IUser) => user.name.toLowerCase().includes(name));
    })
  );
  
  ngOnInit(): void {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users))
      ).subscribe();
  }
  
  onDeleteUser(userid: number): void {
    this.userService.deleteUser(userid);
  }
  
  onAddUser(user: IUser): void {
    this.userService.addUser(user);
  }
  
  onSearch(name: string): void {
    this.searchNameSubject.next(name);
  }
  
}