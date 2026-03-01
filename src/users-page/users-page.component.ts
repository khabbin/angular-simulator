import { Component, inject } from '@angular/core';
import { MessageService } from '../app/message.service';
import { MessageStatus } from '../enums/MessageStatus';

@Component({
  selector: 'app-users-page',
  imports: [],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {
  messageStatus: typeof MessageStatus = MessageStatus;
  messageService: MessageService = inject(MessageService);
}