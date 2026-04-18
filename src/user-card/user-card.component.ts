import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  
  @Input() user!: IUser;
  @Output() delete = new EventEmitter<number>();
  
  onDelete(id: number): void {
    this.delete.emit(id);
  }
  
}
