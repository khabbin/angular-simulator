import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { PhoneFormatPipe } from '../app/pipes/phone-format.pipe';
import { BoldOnHoverDirective } from '../app/directives/bold-on-hover.directive';
import { GradientBorderDirective } from '../app/directives/gradient-border.directive';
import { PhoneFormat } from '../enums/PhoneFormat';

@Component({
  selector: 'app-user-card',
  imports: [PhoneFormatPipe, BoldOnHoverDirective, GradientBorderDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  
  @Input() user!: IUser;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  phoneFormat: typeof PhoneFormat = PhoneFormat;

  onDelete(id: number): void {
    this.deleteUser.emit(id);
  }
  
}
